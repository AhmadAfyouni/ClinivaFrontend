import { Flex, ScrollArea, useMantineTheme } from "@mantine/core";
import DoctorProfileCard from "../../Components/DoctorsDetails/DoctorProfileCard ";
import PatientStatisticsChart from "../../Components/DoctorsDetails/PatientStatisticsChart ";
import AppointmentSchedule from "../../Components/DoctorsDetails/AppointmentSchedule";
import Workplaces from "../../Components/DoctorsDetails/WorkplacesBreakTime";
import PercentageTable from "../../Components/DoctorsDetails/PercentageTable";
import Cards from "../../Components/DoctorsDetails/Cards";
import { useMediaQuery } from "@mantine/hooks";
import { PiIdentificationCardThin } from "react-icons/pi";
import { CiFlag1 } from "react-icons/ci";
import { IconUsers } from "@tabler/icons-react";
const DoctorDetails = () => {
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
      day: "Mon",
      start: "8:00 AM",
      end: "11:00 PM",
    },
    {
      day: "Wed",
      start: "9:00 AM",
      end: "12:00 PM",
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
      leavestartdate: "Sarah Miller",
      leaveenddate: "2028-09-12, 9:00 AM",
      leavetype: "Vic",
      status: "Pending",
    },
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
      leavestartdate: "31/3/2025",
      leaveenddate: "2/4/2025",
      leavetype: "Vic",
      status: "active",
    },
    {
      leavestartdate: "Sarah Miller",
      leaveenddate: "2/4/2025",
      leavetype: "Vic",
      status: "active",
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
  const theme = useMantineTheme();
  const titleCards = ["Identity", "Nationality", "Total Patients"];
  const valueCards = ["3543654", "Syrian", "1245"];
  const icons = [
    <PiIdentificationCardThin size={32} color={theme.other.onSurfacePrimary} />,
    <CiFlag1 size={32} color={theme.other.onSurfacePrimary} />,
    <IconUsers stroke={1.3} color={theme.other.onSurfacePrimary} />,
  ];
  return (
    <ScrollArea>
      <Flex direction="column">
        <Flex direction={isMobile || isTablet ? "column" : "row"}>
          <Flex
            direction="column"
            h={{ sm: 300 }}
            w={isMobile || isTablet ? "100%" : "25%"}
          >
            <DoctorProfileCard
              birthday={new Date()}
              childrenNum={0}
              gender="Male"
              languages={["english", "arabic"]}
              name="Mohammed"
              specialty={["deter", "ch"]}
              status="single"
              about="A highly skilled dermatologist with over 15 years of experience in"
              hireDate={new Date()}
              certification="10 years of experience in emergency medicine ."
              experience="emergency medicine and consultation."
              phone="(253) 346542"
              email="olivia.grant@clinic.com"
              socialMedia="olivia.grant@clinic.com"
              address="78 Beauty Boulevard, Suite 4 New York"
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
              <Flex w={isMobile || isTablet ? "100%" : "35%"} justify="center">
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
