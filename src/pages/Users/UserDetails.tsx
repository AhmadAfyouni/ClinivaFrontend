import { Flex, Text, useMantineTheme } from "@mantine/core";
import InfoCard from "../../Components/UserDetails/InfoCard";
import GroupText from "../../Components/UserDetails/GroupText";
import { useMediaQuery } from "@mantine/hooks";
import WorkingSchedule from "../../Components/UserDetails/WorkingSchedule";
import { Mail, Phone } from "lucide-react";

// Your new working hours format
const workingHours = [
  { day: "Monday", startTime: "09:00 AM", endTime: "05:00 PM" },
  { day: "Monday", startTime: "07:00 PM", endTime: "09:00 PM" },
  { day: "Tuesday", startTime: "09:00 AM", endTime: "05:00 PM" },
  { day: "Wednesday", startTime: "09:00 AM", endTime: "05:00 PM" },
  { day: "Thursday", startTime: "09:00 AM", endTime: "05:00 PM" },
  { day: "Friday", startTime: "09:00 AM", endTime: "02:00 PM" },
];
const UserDetails = () => {
  const theme = useMantineTheme();
  const isMobile = useMediaQuery("(max-width: 576px)");
  const isComputer = useMediaQuery("(min-width: 993px)");
  const icons = [
    {
      icon: <Phone size={24} />,
      onClick: () => console.log("Clicked on Email"),
    },
    {
      icon: <Mail size={24} />,
      onClick: () => console.log("Clicked on Email"),
    },
    // {
    //   icon: <MapPin size={24} />,
    //   onClick: () => console.log("Clicked on Email"),
    // },
    // {
    //   icon: <Globe size={24} />,
    //   onClick: () => console.log("Clicked on Email"),
    // },
  ];
  return (
    <Flex direction={isComputer ? "row" : "column"}>
      <Flex w={isComputer ? "25%" : "100%"}>
        <InfoCard
          iconsMaxWidth="200px"
          contactInfoIcons={icons}
          isActive={true}
          name="Maurice Galley"
          id="46"
          birthday="20/3/2024"
          gender="Male"
          address="23,Damas,Syria"
          nationalId="344353645"
        />
      </Flex>
      <Flex direction="column">
        <Flex direction="column">
          <Text
            fz={18}
            fw={600}
            c={theme.other.onSurfacePrimary}
            ml={isComputer ? 40 : 0}
          >
            Working Schedule
          </Text>
          <WorkingSchedule workingHours={workingHours} />
        </Flex>
        <Flex
          direction={isMobile ? "column" : "row"}
          align={isMobile ? "center" : ""}
        >
          <Flex
            w="50%"
            direction="column"
            pl={isMobile ? "0px" : "50px"}
            mb={30}
          >
            <Text fw={600} mb={20} fz={18} c={theme.other.onSurfacePrimary}>
              Employment Details
            </Text>
            <GroupText
              titlewidth={130}
              titles={["Date of Hire", "Employment type", "Employment End"]}
              values={["20/2/2025", "Doctor", "20/2/2027"]}
            />
          </Flex>
          <Flex w="50%" direction="column" mb={60}>
            <Text fw={600} mb={20} fz={18} c={theme.other.onSurfacePrimary}>
              Work assignment
            </Text>
            <GroupText
              titlewidth={120}
              titles={["assigned Department", "assigned Clinic", "Supervisor"]}
              values={["dental", "dental", "supervisor"]}
            />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default UserDetails;
