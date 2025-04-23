import { Center, Flex, ScrollArea, Text } from "@mantine/core";
import DoctorProfileCard from "../../Components/DoctorsDetails/DoctorProfileCard ";
import PatientStatisticsChart from "../../Components/DoctorsDetails/PatientStatisticsChart ";
import AppointmentSchedule from "../../Components/DoctorsDetails/AppointmentSchedule";
import Workplaces from "../../Components/DoctorsDetails/WorkplacesBreakTime";
import PercentageTable from "../../Components/DoctorsDetails/PercentageTable";
import Cards from "../../Components/DoctorsDetails/Cards";
import { useMediaQuery } from "@mantine/hooks";
import useDoctorDetails from "../../hooks/doctor/useDoctorDetails";
import { useParams } from "react-router";
const DoctorDetails = () => {
  const { id: DoctorId } = useParams();
  const { data, isFetched } = useDoctorDetails(DoctorId!);
  console.log(data);
  const thPatient = ["Name", "Date", "Treatment"];
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
    {
      name: "Ethan Hughes",
      date: "2028-09-15, 2:00 PM",
      treatment: "Removal",
    },
    {
      name: "Hannah Lee",
      date: "2028-09-16, 11:00 AM",
      treatment: "Treatment",
    },
  ];
  const day = ["Day", "Start", "End"];
  const times = [
    {
      day: "Sun",
      start: "9:00 AM",
      end: "01:00 PM",
    },
    {
      day: "Sun",
      start: "9:00 AM",
      end: "01:00 PM",
    },
    {
      day: "Mon",
      start: "8:00 AM",
      end: "11:00 PM",
    },
    {
      day: "Wed",
      start: "9:00 AM",
      end: "12:00 PM",
    },
  ];
  const thVication = ["leaveStartDate", "leaveEndDate", "leaveType", "status"];
  const vication = [
    {
      leavestartdate: "Sarah Miller",
      leaveenddate: "2028-09-12, 9:00 AM",
      leavetype: "Vic",
      status: "Pending",
    },
    {
      leavestartdate: "31/3/2025",
      leaveenddate: "2/4/2025",
      leavetype: "Vic",
      status: "Pending",
    },
    {
      leavestartdate: "31/3/2025",
      leaveenddate: "2/4/2025",
      leavetype: "Vic",
      status: "Pending",
    },
    {
      leavestartdate: "31/3/2025",
      leaveenddate: "2/4/2025",
      leavetype: "Vic",
      status: "Pending",
    },
    {
      leavestartdate: "Sarah Miller",
      leaveenddate: "2/4/2025",
      leavetype: "Vic",
      status: "active",
    },
  ];
  const isMobile = useMediaQuery("(max-width: 576px)");
  const isTablet = useMediaQuery("(min-width: 577px) and (max-width: 992px)");
  // const theme = useMantineTheme();
  const titleCards = ["Identity", "Nationality", "Total Patients"];
  const valueCards = ["3543654", "Syrian", "1245"];
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
                birthday={new Date(data.dateOfBirth)}
                childrenNum={data.number_children}
                gender={data.gender}
                languages={data.Languages.map((item) => item)}
                name={data.name}
                specialty={data.specialties}
                status={data.marital_status}
                about="A highly skilled  Doctor..."
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
                    buttonValue="View All "
                    tableTitle="All Patients"
                    th={thPatient}
                    tb={patients}
                  />
                </Flex>
                <Workplaces
                  companyName="hadi fsnvoafv"
                  medicalComplexName="adjaovd fsegbtrs"
                  deptName="gvbdsg segbvrsf"
                  clinicName="grsbtfr fesgr"
                  startTime={new Date()}
                  endTime={new Date()}
                />
              </Flex>
            </Flex>
          </Flex>
          <Flex w="100%" h="100%" direction={isMobile ? "column" : "row"}>
            <Flex w={isMobile ? "95%" : "50%"} gap={isMobile ? "5px" : 0}>
              <PercentageTable
                mah="250px"
                visibleButton={false}
                buttonValue="View All "
                tableTitle="Working Hours"
                th={day}
                tb={times}
              />
            </Flex>
            <Flex w={isMobile ? "95%" : "50%"}>
              <PercentageTable
                mah="250px"
                visibleButton={true}
                buttonValue="Add Vication "
                tableTitle="Vications"
                th={thVication}
                tb={vication}
              />
            </Flex>
          </Flex>
        </Flex>
      </ScrollArea>
    );
};
export default DoctorDetails;
