import { Button, Center, Flex, ScrollArea, Text } from "@mantine/core";
import DoctorProfileCard from "../../Components/DoctorsDetails/DoctorProfileCard ";
import PatientStatisticsChart from "../../Components/DoctorsDetails/PatientStatisticsChart ";
import AppointmentSchedule from "../../Components/DoctorsDetails/AppointmentSchedule";
import Workplaces from "../../Components/DoctorsDetails/WorkplacesBreakTime";
import PercentageTable from "../../Components/DoctorsDetails/PercentageTable";
import Cards from "../../Components/DoctorsDetails/Cards";
import { useMediaQuery } from "@mantine/hooks";
import useDoctorDetails from "../../hooks/doctor/useDoctorDetails";
import { useParams } from "react-router";
import { useTranslation } from "react-i18next";
import useDeleteById from "../../hooks/delete/useDeleteById";
const DoctorDetails = () => {
  const { t } = useTranslation();
  const { id: DoctorId } = useParams();
  const deleteDoctor = useDeleteById({
    endpoint: "employees",
    mutationKey: "delete-doctor",
    navigationUrl: "/doctors",
  });
  const isMobile = useMediaQuery("(max-width: 576px)");
  const isTablet = useMediaQuery("(min-width: 577px) and (max-width: 992px)");
  const { data, isFetched } = useDoctorDetails(DoctorId!);
  if (!data) return null;
  console.log(data);
  const thPatient = [t("Name"), t("Date"), t("Treatment")];
  const patients = [
    {
      name: "Sarah Miller",
      date: "2028-09-12, 9:00 AM",
      treatment: "Vic",
    },
    {
      name: "Claire Thompson",
      date: "2028-09-14, 10:00 AM",
      treatment: "Fillers",
    },
  ];
  const day = [t("Day"), t("Start"), t("End")];
  const wh = data.workingHours.map((wh) => ({
    day: wh.day,
    start: wh.startTime,
    end: wh.endTime,
  }));
  const thVication = [
    t("leaveStartDate"),
    t("leaveEndDate"),
    t("leaveType"),
    t("status"),
  ];
  const vics = data.vacationRecords.map((vic) => ({
    "leave start date": vic.leaveStartDate.slice(0, 10),
    "leave end date": vic.leaveEndDate.slice(0, 10),
    "leave type": vic.leaveType,
    status: vic.status,
  }));

  const titleCards = [t("Identity"), t("Nationality"), t("Total Patients")];
  const valueCards = [data?.identity, data?.nationality, "1245"];
  const handleDeleteEvent = () => {
    deleteDoctor.mutate(DoctorId!);
  };
  if (!isFetched || !data)
    return (
      <Center>
        <Text>No Doctors Found</Text>
      </Center>
    );
  else
    return (
      <ScrollArea h="100vh">
        <Flex direction="column">
          <Flex direction={isMobile || isTablet ? "column" : "row"}>
            <Flex
              direction="column"
              h={{ sm: 300 }}
              w={isMobile || isTablet ? "100%" : "25%"}
            >
              <DoctorProfileCard
                // age={data.age}
                avalibilty={data.on_call ? "available" : "unavailable"}
                conslutionfee={data.consultation_fee}
                licenseNumber={data.medicalLicenseNumber}
                imgUrl={data.image}
                birthday={new Date(data.dateOfBirth)}
                childrenNum={data.number_children}
                gender={data.gender}
                languages={data.Languages.map((item) => item)}
                name={data.name}
                specialty={data.specialties}
                status={data.marital_status}
                // about="A highly skilled  Doctor..."
                hireDate={new Date(data.hireDate)}
                certification={data.certifications.join(",")}
                experience={data.professional_experience}
                phone={data.contactInfos
                  .map((item) => (item.type === "Phone" ? item.value : ""))
                  .join(",")}
                email={data.contactInfos
                  .map((item) => (item.type === "Email" ? item.value : ""))
                  .join(",")}
                socialMedia="olivia.grant@clinic.com"
                address={data.address}
                Qualifcations={data.Qualifications}
              />
            </Flex>
            <Flex direction="column" w={isMobile || isTablet ? "100%" : "75%"}>
              <Flex direction={isMobile || isTablet ? "column" : "row"}>
                <Flex
                  w={isMobile || isTablet ? "100%" : "65%"}
                  direction="column"
                >
                  <Cards title={titleCards} value={valueCards} />
                  <PatientStatisticsChart />
                </Flex>
                <Flex
                  w={isMobile || isTablet ? "100%" : "35%"}
                  justify="center"
                >
                  <AppointmentSchedule />
                </Flex>
              </Flex>
              <Flex
                w="100%"
                mb={30}
                direction={isMobile ? "column" : "row"}
                gap={isMobile ? "5px" : 0}
              >
                <Flex w={isMobile ? "100%" : "75%"}>
                  <PercentageTable
                    mah="250px"
                    visibleButton={true}
                    buttonValue={t("viewAll")}
                    tableTitle={t("allPatients")}
                    th={thPatient}
                    tb={patients}
                  />
                </Flex>
                <Workplaces
                  companyName={data.companyId?.name || ""}
                  medicalComplexName={data.clinicCollectionId?.name || ""}
                  deptName={data.departmentId?.name || ""}
                  clinicName={data.clinics.map((item) => item.name).join(",")}
                  startTime={new Date()}
                  endTime={new Date()}
                />
              </Flex>
            </Flex>
          </Flex>
          <Flex
            w="100%"
            h="fit-content"
            direction={isMobile ? "column" : "row"}
          >
            <Flex w={isMobile ? "95%" : "50%"} gap={isMobile ? "5px" : 0}>
              <PercentageTable
                mah="150px"
                visibleButton={false}
                buttonValue={t("viewAll")}
                tableTitle={t("WorkingHours")}
                th={day}
                tb={wh}
              />
            </Flex>
            <Flex w={isMobile ? "95%" : "50%"}>
              <PercentageTable
                mah="150px"
                visibleButton={true}
                buttonValue={t("addVication")}
                tableTitle={t("vacations")}
                th={thVication}
                tb={vics}
              />
            </Flex>
          </Flex>
        </Flex>
        <Button
          variant="filled"
          color="red"
          radius="xl"
          mt="50px"
          mb="110px"
          onClick={handleDeleteEvent}
        >
          Delete
        </Button>
      </ScrollArea>
    );
};
export default DoctorDetails;
