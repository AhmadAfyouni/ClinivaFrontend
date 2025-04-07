import { Flex, Grid, ScrollArea } from "@mantine/core";
import PatientInfoCard from "../../Components/Details/PatientInfoCard";
import InsuranceCard from "../../Components/Details/InsuranceCard";
import MedicalInfo from "../../Components/Details/MedicalInfo";
import ContactPersonInfo from "../../Components/Details/ContactPersonInfo";
import HealthReportList from "../../Components/Details/HealthReportList";
import AllergyMedicationCard from "../../Components/Details/AllergyMedicationCard ";
import MedicalTreatment from "../../Components/Details/MedicalTreatmentUI";
import data from "../../data/schedule.json";
import { useMediaQuery } from "@mantine/hooks";
const PatientDetails = () => {
  const [day, month, year] = "2-4-2025".split("-").map(Number);
  const date = new Date(year, month - 1, day);
  const isMobile = useMediaQuery("(max-width: 576px)");
  const isTablet = useMediaQuery("(min-width: 577px) and (max-width: 992px)");
  return (
    <ScrollArea h="90vh">
      <Grid columns={8}>
        <Grid.Col span={isMobile || isTablet ? 8 : 2}>
          {/* <Flex direction={{ md: "column", sm: "row", xs: "column" }}> */}
          <Flex direction={isMobile ? "column" : isTablet ? "row" : "column"}>
            <InsuranceCard
              expiryDate={date}
              HPI="HPT-24325425"
              insuranceType="Health Plus"
              isActive={true}
              personName="Maril"
              ID="3257657567"
              familyMedicalHistory="Asthma , Arthritis"
              lifestyleFactors="sport , smoking"
              preferredLanguage="arabic"
            />
            <PatientInfoCard
              aboutPatient="A regular patient at the clinic, receiving treatments for skin health and cosmetic procedures."
              maritalStatus="single"
              birthday="28-3-1990"
              gender="Male"
              patientId="PB-002"
            />
          </Flex>
        </Grid.Col>
        <Grid.Col span={isMobile || isTablet ? 8 : 4}>
          <MedicalInfo
            bloodType="A+"
            hieght="170"
            weight="70"
            nationality="Syrian"
          />
          <AllergyMedicationCard />
          <Grid columns={2} mt={2}>
            {/* <Grid.Col span={{ xs: 2, sm: 1 }}> */}
            <Grid.Col span={isMobile ? 2 : 1}>
              <ContactPersonInfo
                email="maurice.galley@email.com"
                phoneNumber="(123) 456-7890"
                adress="45 Green Valley Road, Apt 12, New York, NY 10001"
                emergencyContact="(098) 765-4321 - Sarah Galley"
              />
            </Grid.Col>
            {/* <Grid.Col span={{ xs: 2, sm: 1 }}> */}
            <Grid.Col span={isMobile ? 2 : 1}>
              <HealthReportList />
            </Grid.Col>
          </Grid>
        </Grid.Col>
        <Grid.Col span={isMobile || isTablet ? 8 : 2}>
          <MedicalTreatment
            upcomingAndHistorySchedule={data}
            noteText=" Maurice is responding well to treatments and shows consistent
                            improvement. Regular follow-ups are advised. Maurice is
                            responding well to treatments and shows consistent improvement."
          />
        </Grid.Col>
      </Grid>
    </ScrollArea>
  );
};
export default PatientDetails;
