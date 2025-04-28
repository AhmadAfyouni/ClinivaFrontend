import { Center, Flex, Text, useMantineTheme } from "@mantine/core";
import InfoCard from "../../Components/UserDetails/InfoCard";
import GroupText from "../../Components/UserDetails/GroupText";
import { useMediaQuery } from "@mantine/hooks";
import { Mail, PhoneCall } from "lucide-react";
import { useParams } from "react-router";
import useUserDetails from "../../hooks/users/useUserDetails";

const UserDetails = () => {
  const theme = useMantineTheme();
  const { id: userId } = useParams();
  const { data, isFetched } = useUserDetails(userId!);
  const isMobile = useMediaQuery("(max-width: 576px)");
  const isComputer = useMediaQuery("(min-width: 993px)");
  if (!isFetched || !data)
    return (
      <Center>
        <Text>No User Details Found</Text>
      </Center>
    );

  // const icons = [
  //   {
  //     icon: <Phone size={24} />,
  //     onClick: () => console.log("Clicked on Email"),
  //   },
  //   {
  //     icon: <Mail size={24} />,
  //     onClick: () => console.log("Clicked on Email"),
  //   },
  //   {
  //     icon: <MapPin size={24} />,
  //     onClick: () => console.log("Clicked on Email"),
  //   },
  //   {
  //     icon: <Globe size={24} />,
  //     onClick: () => console.log("Clicked on Email"),
  //   },
  // ];
  const icons = data.contactInfos.map((item) => {
    if (item.type === "email")
      return {
        icon: <Mail size={24} />,
        href: `mailto:${item.value}`,
      };
    else
      return {
        icon: <PhoneCall size={24} />,
        href: `tel:${item.value}`,
      };
  });
  return (
    <Flex direction={isComputer ? "row" : "column"}>
      <Flex w={isComputer ? "25%" : "100%"}>
        <InfoCard
          imgUrl=""
          iconsMaxWidth="150px"
          contactInfoIcons={icons}
          isActive={true}
          name={data.name}
          id={data._id}
          birthday="2/3/2004"
          gender="male"
          address="address"
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
            direction="row"
            titlewidth={300}
            titles={[
              "User Name",
              "Account Creation ",
              "Last Modied ",
              "Last Login",
              "Two-factor Authentication Enabled",
            ]}
            values={[
              data.name,
              data.loginHistory[0].loginDate.toString(),
              "20/2/2027",
              data.lastLoginAt,
              "Yes",
            ]}
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
              Role and Permissions
            </Text>
            <GroupText
              direction="row"
              titlewidth={130}
              titles={["assigned Role", "Assigned permissions"]}
              values={[
                data.roleIds
                  .map((item) => item.permissionGroups.map((item) => item))
                  .join(","),
                data.roleIds.map((item) => item.name).join(","),
              ]}
            />
          </Flex>
          <Flex w="50%" direction="column" mb={60}>
            <Text fw={600} mb={20} fz={18} c={theme.other.onSurfacePrimary}>
              Employment Details
            </Text>
            <GroupText
              direction="row"
              titlewidth={120}
              titles={[
                "Job title",
                "Complex",
                "Department",
                "Empolyment date",
                "Empolyment status",
              ]}
              values={["dental", "dental", "supervisor"]}
            />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default UserDetails;
