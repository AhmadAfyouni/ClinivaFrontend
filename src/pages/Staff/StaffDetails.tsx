import { Flex, Text, useMantineTheme } from "@mantine/core";
import InfoCard from "../../Components/UserDetails/InfoCard";
import GroupText from "../../Components/UserDetails/GroupText";
import { useMediaQuery } from "@mantine/hooks";
import { Globe, Mail, MapPin, Phone } from "lucide-react";

const StaffDetails = () => {
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
    {
      icon: <MapPin size={24} />,
      onClick: () => console.log("Clicked on Email"),
    },
    {
      icon: <Globe size={24} />,
      onClick: () => console.log("Clicked on Email"),
    },
  ];
  return (
    <Flex direction={isComputer ? "row" : "column"}>
      <Flex w={isComputer ? "25%" : "100%"}>
        <InfoCard
          iconsMaxWidth="150px"
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
      <Flex direction="column" w="100%">
        <Flex
          mb={isComputer ? "100px" : 30}
          w="100%"
          direction="column"
          pl={isMobile ? "0px" : "50px"}
        >
          <Text fw={600} mb={20} fz={18} c={theme.other.onSurfacePrimary}>
            Account Info
          </Text>
          <GroupText
            titlewidth={300}
            titles={[
              "User Name",
              "Account Creation ",
              "Last Modied ",
              "Last Login",
              "Two-factor Authentication Enabled",
            ]}
            values={["20/2/2025", "Doctor", "20/2/2027", "20/2/2025", "Yes"]}
          />
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

export default StaffDetails;
