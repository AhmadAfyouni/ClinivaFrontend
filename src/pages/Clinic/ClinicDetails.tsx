import { Button, Center, Flex, ScrollArea, Text } from "@mantine/core";
import InfoSide from "../../Components/CompanyDetails/InfoSide";
import { Mail, MapPin, PhoneCall } from "lucide-react";
import { useMediaQuery } from "@mantine/hooks";
import CardsInfo from "../../Components/CompanyDetails/CardsInfo";
import GridList from "../../Components/CompanyDetails/GridList";
import WorkingSchedule from "../../Components/UserDetails/WorkingSchedule";
import useClinicDetails from "../../hooks/clinic/useClinicDetails";
import { useParams } from "react-router";
import usePatientCount from "../../hooks/clinic/usePatientCount";
import useDeleteById from "../../hooks/delete/useDeleteById";

// const items = ["Item 1", "Item 2", "Item 3", "Item 4", "Item 5"];
const ClinicDetails = () => {
  const isTablet = useMediaQuery("(min-width: 577px) and (max-width: 992px)");
  const isComputer = useMediaQuery("(min-width: 993px)");
  const deleteClinic = useDeleteById({
    endpoint: "clinics",
    mutationKey: "delete-clinic",
    navigationUrl: "/clinics",
  });
  const { id: ClinicId } = useParams();
  const { data, isFetched } = useClinicDetails(ClinicId!);
  const { data: patientCount } = usePatientCount(ClinicId!);
  console.log(ClinicId);
  console.log(data);
  if (!isFetched || !data)
    return (
      <Center>
        <Text>No Clinic Details Found</Text>
      </Center>
    );
  const titles = ["specialty", "Working Hours", "Goals"];
  const values = [
    data.specializations?.map((item) => item).join(","),
    data.AverageDurationOfVisit.toString(),
    data.goals ?? "",
  ];
  const icons = data.contactInfos.map((item) => {
    if (item.type === "email") {
      return {
        icon: <Mail size={24} />,
        href: `mailto:${item.value}`,
      };
    } else if (item.type === "phone") {
      return {
        icon: <PhoneCall size={24} />,
        href: `tel:${item.value}`,
      };
    } else {
      return {
        icon: <MapPin size={24} />,
        href: `https://www.google.com/maps?q=${encodeURIComponent(item.value)}`,
      };
    }
  });
  const handleDeleteEvent = () => {
    deleteClinic.mutate(ClinicId!);
  };
  return (
    <ScrollArea h="100vh">
      <Flex direction={isComputer ? "row" : "column"}>
        <Flex w={isComputer ? "23%" : "100%"}>
          <InfoSide
            name={data.name}
            url={data.logo}
            contactInfoIcons={icons}
            iconsMaxWidth=""
            values={values}
            titles={titles}
            titlesWidth="90"
            hasSocialMedia={false}
            socialMediaIcons={icons}
            hasActivation={true}
            isActive={data.isActive}
          />
        </Flex>
        <Flex w={isComputer ? "73%" : "100%"} direction="column">
          <Flex w="100%">
            <CardsInfo
              titles={["Staff Number", "Patient Number", "Doctors Number"]}
              values={[
                data.employeeCounts.total.toString() || "0",
                patientCount?.patientCount.toString() || "0",
                data.employeeCounts.doctors.toString() || "0",
              ]}
            />
          </Flex>
          <Flex w="100%" direction={isComputer ? "row" : "column"}>
            <Flex w={isComputer ? "66%" : "100%"} direction="column">
              <WorkingSchedule workingHours={data.WorkingHours} />
              <GridList
                girdItems={data.services.map((item) => item.name)}
                title="Services"
              />
            </Flex>
            <Flex
              w={isComputer ? "33%" : "100%"}
              direction={isTablet ? "row" : "column"}
            >
              <GridList
                girdItems={data.doctors.map((item) => item.name)}
                title="Doctors"
              />
              <GridList
                girdItems={data.employees.map((item) => item.name)}
                title="Staff"
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

export default ClinicDetails;
