import {
  Box,
  Button,
  Center,
  Flex,
  Grid,
  ScrollArea,
  Text,
  useMantineTheme,
} from "@mantine/core";
import PatientInfoCard from "../../Components/Details/PatientInfoCard";
import InsuranceCard from "../../Components/Details/InsuranceCard";
import MedicalInfo from "../../Components/Details/MedicalInfo";
import ContactPersonInfo from "../../Components/Details/ContactPersonInfo";
import HealthReportList from "../../Components/Details/HealthReportList";
import AllergyMedicationCard from "../../Components/Details/AllergyMedicationCard ";
import { useMediaQuery } from "@mantine/hooks";
import usePatientDetails from "../../hooks/patient/usePatientDetails";
import MedicalTreatment from "../../Components/Details/MedicalTreatmentUI";
import { useParams } from "react-router";
import TextInfo from "../../Components/Details/TextInfo";
import dataAppointment from "../../data/paitientAppointment.json";
import { useTranslation } from "react-i18next";
import useDeleteById from "../../hooks/delete/useDeleteById";
const PatientDetails = () => {
  const { t } = useTranslation();
  const { mutate } = useDeleteById({
    endpoint: "patients",
    mutationKey: "delete-patient",
    navigationUrl: "/patients",
  });
  // const [day, month, year] = data?.insurances[0]?.expiryDate?.split("-").map(Number) ||'';

  const theme = useMantineTheme();
  const isMobile = useMediaQuery("(max-width: 576px)");
  const isTablet = useMediaQuery("(min-width: 577px) and (max-width: 992px)");
  const { id: PatientId } = useParams();
  const { data, isFetched } = usePatientDetails(PatientId!);
  console.log(new Date("2020-2-3"));
  const handleDeleteEvent = () => {
    mutate(PatientId!);
  };
  const insuranceDate = data?.insurances[0]?.expiryDate?.slice(0, 10) || "";
  if (!isFetched || !data)
    return (
      <Center>
        <Text>No Patient Datails Found</Text>
      </Center>
    );
  else
    return (
      <ScrollArea h="90vh">
        <Grid columns={8}>
          <Grid.Col span={isMobile || isTablet ? 8 : 2}>
            <Flex
              direction={isMobile ? "column" : isTablet ? "row" : "column"}
              p={10}
            >
              <Box
                pt={isTablet ? 30 : 0}
                maw={320}
                mx="auto"
                w="100%"
                mb={10}
                bg={theme.other.bg}
              >
                <Flex direction="column" p="0 10px" mb={20} w="100%">
                  <Flex direction="column" mb={20} w="100%">
                    <Text
                      fw={500}
                      mb={20}
                      size="lg"
                      c={theme.other.onSurfacePrimary}
                    >
                      {t("patient_info")}
                    </Text>
                    <TextInfo
                      gap="1px"
                      titles={[
                        t("patient_name"),
                        t("patient_id"),
                        t("family_medical_history"),
                        t("lifestyle_factors"),
                        t("preferred_language"),
                        t("Sigrical history"),
                        t("Current medications "),
                        t("Smoking"),
                        t("Age"),
                      ]}
                      contents={[
                        data.name,
                        data.publicId,
                        data.familyMedicalHistory
                          ? data.familyMedicalHistory.join(",")
                          : "",
                        data.lifestyleFactors ? data.lifestyleFactors : "",
                        data.preferredLanguage ? data.preferredLanguage : "",
                        data.Surgical_History
                          ? data.Surgical_History.slice(0, 10)
                          : "",
                        data.Current_Medications
                          ? data.Current_Medications
                          : "",
                        data.Smoking ? "Smoker " : "Non Smoker",
                        data.age?.toString() || "0",
                      ]}
                      width={160}
                    />
                  </Flex>
                  <InsuranceCard
                    expiryDate={new Date(insuranceDate)}
                    insuranceType={data.insurances[0]?.insuranceType || ""}
                    isActive={data.isActive}
                    personName={data.name}
                    ID={data.identity}
                    familyMedicalHistory={data.familyMedicalHistory}
                    lifestyleFactors={data.lifestyleFactors}
                    preferredLanguage={data.preferredLanguage}
                  />
                </Flex>
              </Box>
              <PatientInfoCard
                aboutPatient={"A regular patient at the clinic"}
                maritalStatus={data.marital_status}
                birthday={data.dateOfBirth}
                gender={data.gender}
                patientId={data._id}
              />
            </Flex>
          </Grid.Col>

          <Grid.Col span={isMobile || isTablet ? 8 : 4}>
            <MedicalInfo
              bloodType={data.blood_type}
              hieght={data.height}
              weight={data.weight}
              nationality={data.nationality}
            />
            <AllergyMedicationCard
              allergies={data.allergies}
              chronicDiseases={data.ChronicDiseases.map(
                (item) => item.disease_name
              )}
            />
            <Grid columns={2} mt={2}>
              <Grid.Col span={isMobile ? 2 : 1}>
                <ContactPersonInfo
                  email={
                    data.contactInfos.find((item) => item.type === "email")
                      ?.value || ""
                  }
                  phoneNumber={
                    data.contactInfos.find((item) => item.type === "phone")
                      ?.value || ""
                  }
                  adress={data.address}
                  emergencyContact={`${data?.emergencyContact?.phone || ""} - ${
                    data?.emergencyContact?.name || ""
                  } - ${data?.emergencyContact?.relationToPatient || ""}`}
                />
              </Grid.Col>
              <Grid.Col span={isMobile ? 2 : 1}>
                <HealthReportList />
              </Grid.Col>
            </Grid>
          </Grid.Col>

          <Grid.Col span={isMobile || isTablet ? 8 : 2}>
            <MedicalTreatment
              upcomingAndHistorySchedule={dataAppointment}
              noteText={data.notes}
            />
          </Grid.Col>
        </Grid>
        <Button
          variant="filled"
          color="red"
          radius="xl"
          mb="110px"
          onClick={handleDeleteEvent}
        >
          Delete
        </Button>
      </ScrollArea>
    );
};
export default PatientDetails;
