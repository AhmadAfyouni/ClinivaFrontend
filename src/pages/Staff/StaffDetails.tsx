import { Center, Flex, Text, useMantineTheme } from "@mantine/core";
import InfoCard from "../../Components/UserDetails/InfoCard";
import GroupText from "../../Components/UserDetails/GroupText";
import { useMediaQuery } from "@mantine/hooks";
import WorkingSchedule from "../../Components/UserDetails/WorkingSchedule";
import { Mail, PhoneCall } from "lucide-react";
import { useParams } from "react-router";
import useStaffDetails from "../../hooks/staff/useStaffDetails";

const StaffDetails = () => {
  const theme = useMantineTheme();
  const isMobile = useMediaQuery("(max-width: 576px)");
  const isComputer = useMediaQuery("(min-width: 993px)");
  const { id: staffId } = useParams();
  const { data, isFetched } = useStaffDetails(staffId!);
  if (!isFetched || !data)
    return (
      <Center>
        <Text>No Clinic Details Found</Text>
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
  return (
    <Flex direction={isComputer ? "row" : "column"}>
      <Flex w={isComputer ? "25%" : "100%"}>
        <InfoCard
          iconsMaxWidth="200px"
          contactInfoIcons={icons}
          isActive={data.isActive}
          name={data.name}
          id={data._id}
          birthday={data.dateOfBirth}
          gender={data.gender}
          address={data.address}
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
              Employment Details
            </Text>
            <GroupText
              direction="row"
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
              direction="row"
              titlewidth={120}
              titles={["assigned Department", "assigned Clinic", "Supervisor"]}
              values={[
                data.departmentId?.name ?? "",
                data.clinics.map((item) => item).join(",") ?? "",
                "supervisor",
              ]}
            />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default StaffDetails;
