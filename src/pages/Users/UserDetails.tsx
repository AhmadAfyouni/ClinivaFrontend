import {
  Button,
  Center,
  Flex,
  ScrollArea,
  Text,
  useMantineTheme,
} from "@mantine/core";
import InfoCard from "../../Components/UserDetails/InfoCard";
import GroupText from "../../Components/UserDetails/GroupText";
import { useMediaQuery } from "@mantine/hooks";
import { Mail, PhoneCall } from "lucide-react";
import { useParams } from "react-router";
import useUserDetails from "../../hooks/users/useUserDetails";
import useDeleteById from "../../hooks/delete/useDeleteById";

const UserDetails = () => {
  const theme = useMantineTheme();
  const { id: userId } = useParams();
  const deleteUser = useDeleteById({
    endpoint: "users",
    mutationKey: "delete-user",
    navigationUrl: "/users",
  });
  const { data, isFetched } = useUserDetails(userId!);
  const isMobile = useMediaQuery("(max-width: 576px)");
  const isComputer = useMediaQuery("(min-width: 993px)");
  if (!isFetched || !data)
    return (
      <Center>
        <Text>No User Details Found</Text>
      </Center>
    );
  const icons =
    data.employeeId?.contactInfos.map((item) => {
      if (item.type === "email")
        return {
          icon: <Mail size={24} />,
          href: `mailto:${item.value}`,
        };
      else if (item.type === "phone")
        return {
          icon: <PhoneCall size={24} />,
          href: `tel:${item.value}`,
        };
      else return {};
    }) || [];
  const handleDeleteEvent = () => {
    deleteUser.mutate(userId!);
  };
  return (
    <ScrollArea h="100vh">
      <Flex direction={isComputer ? "row" : "column"}>
        <Flex w={isComputer ? "25%" : "100%"}>
          <InfoCard
            imgUrl=""
            iconsMaxWidth="150px"
            contactInfoIcons={icons}
            isActive={true}
            name={data.name}
            id={data._id}
            birthday={data?.employeeId?.dateOfBirth || ""}
            gender={data.employeeId?.gender || ""}
            address={data.employeeId?.address || ""}
            nationalId={data.employeeId?.identity || ""}
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
                data.loginHistory[
                  data.loginHistory.length - 1
                ]?.loginDate.toString(),
                data.updatedAt,
                data.lastLoginAt?.toString() || "",
                "Yes",
              ]}
            />
          </Flex>
          <Flex
            direction={isMobile ? "column" : "row"}
            align={isMobile ? "center" : ""}
          >
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
                values={[
                  data.employeeId ? data.employeeId.jobType : "",
                  // data.employeeId.clinicCollectionId !== null
                  //   ? data.employeeId.clinicCollectionId.name
                  //   : "",
                  data.employeeId?.clinicCollectionId?.name || "",
                  data.employeeId?.departmentId?.name || "",
                  data.employeeId?.hireDate || "",
                  "super",
                ]}
              />
            </Flex>
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
                    .map((item) => item.permissions.map((item) => item))
                    .join(","),
                  data.roleIds.map((item) => item.name).join(","),
                ]}
              />
            </Flex>
          </Flex>
        </Flex>
      </Flex>
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

export default UserDetails;
