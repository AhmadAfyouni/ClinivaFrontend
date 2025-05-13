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

/**
 * UserDetails component displays detailed information of a user.
 * It fetches user details based on userId from the URL parameters.
 * It also provides functionality to delete a user.
 */

/**/
function formatDateToCustom(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}


const UserDetails = () => {
  const theme = useMantineTheme();
  const { id: userId } = useParams();

  // Hook to delete user by ID
  const deleteUser = useDeleteById({
    endpoint: "users",
    mutationKey: "delete-user",
    navigationUrl: "/users",
  });

  // Fetch user details
  const { data, isFetched } = useUserDetails(userId!);

  // Media query hooks
  const isMobile = useMediaQuery("(max-width: 576px)");
  const isComputer = useMediaQuery("(min-width: 993px)");

  // Return early if data is not yet fetched or not available
  // if (!isFetched || !data)
  //   return (
  //     <Center>
  //       <Text>No User Details Found</Text>
  //     </Center>
  //   );
  if (!isFetched) {
  return (
    <Center h="100vh">
      {/* <Text>Loading...</Text> يمكنك استبدالها بـ Loader من Mantine أو أي Spinner */}
    </Center>
  );
}

if (!data) {
  return (
    <Center h="100vh">
      <Text>No User Details Found</Text>
    </Center>
  );
}

  // Mapping contact information to icons
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

  // Handle deleting the user
  const handleDeleteEvent = () => {
    deleteUser.mutate(userId!);
  };

  return (
    <ScrollArea h="100vh">
      <Flex direction={isComputer ? "row" : "column"}>
        <Flex w={isComputer ? "20%" : "100%"}>
          <InfoCard
            imgUrl=""
            iconsMaxWidth="150px"
            contactInfoIcons={icons}
            isActive={data.isActive}
            name={data.name}
            id={data.publicId}
            birthday={data?.employeeId?.dateOfBirth
                ? formatDateToCustom(data?.employeeId?.dateOfBirth)
                : ""
              }
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
                formatDateToCustom(data.updatedAt),
                data.lastLoginAt ? formatDateToCustom(data.lastLoginAt) : "",
                "No Data",
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
                  data.employeeId?.clinicCollectionId?.name || "",
                  data.employeeId?.departmentId?.name || "",
                  data.employeeId?.hireDate
                    ? formatDateToCustom(data.employeeId?.hireDate)
                    : "",
                  data.employeeId?.isActive ? "Acitve" : "In Active",
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
