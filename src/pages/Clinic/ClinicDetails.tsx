import { Center, Flex, Text } from "@mantine/core";
import InfoSide from "../../Components/CompanyDetails/InfoSide";
import { Mail, MapPin, PhoneCall } from "lucide-react";
import { useMediaQuery } from "@mantine/hooks";
import CardsInfo from "../../Components/CompanyDetails/CardsInfo";
import GridList from "../../Components/CompanyDetails/GridList";
import WorkingSchedule from "../../Components/UserDetails/WorkingSchedule";
import useClinicDetails from "../../hooks/clinic/useClinicDetails";
import { useParams } from "react-router";
import usePatientCount from "../../hooks/clinic/usePatientCount";

const items = ["Item 1", "Item 2", "Item 3", "Item 4", "Item 5"];
const ClinicDetails = () => {
  const isTablet = useMediaQuery("(min-width: 577px) and (max-width: 992px)");
  const isComputer = useMediaQuery("(min-width: 993px)");
  const { id: ClinicId } = useParams();
  const { data, isFetched } = useClinicDetails(ClinicId!);
  const { data: patientCount } = usePatientCount(ClinicId!);
  console.log(ClinicId);
  if (!isFetched || !data)
    return (
      <Center>
        <Text>No Clinic Details Found</Text>
      </Center>
    );
  const titles = ["specialty", "Working Hours", "Goals"];
  const values = [
    data.specializations?.map((item) => item).join(","),
    "30 min",
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
  return (
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
              data.employeeCounts.total.toString(),
              patientCount?.patientCount.toString() || "0",
              data.employeeCounts.doctors.toString(),
            ]}
          />
        </Flex>
        <Flex w="100%" direction={isComputer ? "row" : "column"}>
          <Flex w={isComputer ? "66%" : "100%"} direction="column">
            <WorkingSchedule workingHours={data.WorkingHours} />
            <Text>Services</Text>
          </Flex>
          <Flex
            w={isComputer ? "33%" : "100%"}
            direction={isTablet ? "row" : "column"}
          >
            <GridList girdItems={items} title="Doctors" />
            <GridList girdItems={items} title="Staff" />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ClinicDetails;
