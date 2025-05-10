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
import WorkingSchedule from "../../Components/UserDetails/WorkingSchedule";
import { Mail, PhoneCall } from "lucide-react";
import { useNavigate, useParams } from "react-router";
import useStaffDetails from "../../hooks/staff/useStaffDetails";
import { useTranslation } from "react-i18next";
import useDeleteById from "../../hooks/delete/useDeleteById";

const StaffDetails = () => {
  const { t } = useTranslation();
  const theme = useMantineTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width: 576px)");
  const isComputer = useMediaQuery("(min-width: 993px)");
  const { id: staffId } = useParams();
  const { data, isFetched } = useStaffDetails(staffId!);
  const deleteStaff = useDeleteById({
    endpoint: "employees",
    mutationKey: "delete-employee",
    navigationUrl: "/employees",
  });
  if (!isFetched || !data)
    return (
      <Center>
        <Text>{t("No Clinic Details Found")}</Text>
      </Center>
    );

  const icons = data.contactInfos.map((item) => {
    if (item.type === "email") {
      return {
        icon: <Mail size={24} />,
        href: `mailto:${item.value}`,
      };
    } else {
      return {
        icon: <PhoneCall size={24} />,
        href: `tel:${item.value}`,
      };
    }
  });
  const handleDeleteEvent = () => {
    deleteStaff.mutate(staffId!);
  };
  const handleEditEvent = () => {
    navigate(`/employees/edit/${staffId}`);
  };

  return (
    <ScrollArea h="100vh">
      <Flex direction={isComputer ? "row" : "column"} w="100%">
        <Flex w={isComputer ? "20%" : "100%"} m="0 10px">
          <InfoCard
            iconsMaxWidth="200px"
            contactInfoIcons={icons}
            isActive={data.isActive}
            name={data.name}
            id={data.publicId}
            birthday={data.dateOfBirth.slice(0, 10)}
            gender={data.gender}
            address={data.address}
            imgUrl={data.image}
            nationalId={data.identity}
          />
        </Flex>
        <Flex direction="column" w={isComputer ? "80%" : "100%"}>
          <Flex direction="column">
            <Text
              fz={18}
              fw={600}
              c={theme.other.onSurfacePrimary}
              ml={isComputer ? 40 : 0}
            >
              {t("workingSchedule")}
            </Text>
            <WorkingSchedule workingHours={data.workingHours} />
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
                {t("employmentDetails")}
              </Text>
              <GroupText
                direction="row"
                titlewidth={130}
                titles={[
                  t("dateOfHire"),
                  t("employmenttype"),
                  t("employmentEnd"),
                ]}
                values={["20/2/2025", "Doctor", "20/2/2027"]}
              />
            </Flex>
            <Flex w="50%" direction="column" mb={60}>
              <Text fw={600} mb={20} fz={18} c={theme.other.onSurfacePrimary}>
                {t("workAssignment")}
              </Text>
              <GroupText
                direction="row"
                titlewidth={120}
                titles={[
                  t("assignedDepartment"),
                  t("assignedClinic"),
                  t("supervisor"),
                ]}
                values={[
                  data.departmentId?.name ?? "",
                  data?.clinics?.map((item) => item.name).join(",") ?? "",
                  "supervisor",
                ]}
              />
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      <Flex>
        <Button
          variant="filled"
          color="red"
          radius="xl"
          mb="110px"
          onClick={handleDeleteEvent}
        >
          Delete
        </Button>
        <Button
          variant="filled"
          color="green"
          radius="xl"
          mb="110px"
          ml="30px"
          onClick={handleEditEvent}
        >
          Edit
        </Button>
      </Flex>
    </ScrollArea>
  );
};

export default StaffDetails;
