import { Center, Flex, Text } from "@mantine/core";
import InfoSide from "../../Components/CompanyDetails/InfoSide";
import { Mail, MapPin, PhoneCall } from "lucide-react";
import { useMediaQuery } from "@mantine/hooks";
import CardsInfo from "../../Components/CompanyDetails/CardsInfo";
import GridList from "../../Components/CompanyDetails/GridList";
import WorkingSchedule from "../../Components/UserDetails/WorkingSchedule";
import useClinicDetails from "../../hooks/clinic/useClinicDetails";

const titles = ["specialty", "Working Hours", "Description"];
const values = ["dedsaf", "30 min ", "bla bla bla"];

const items = ["Item 1", "Item 2", "Item 3", "Item 4", "Item 5"];
const workingHours = [
  { day: "Monday", startTime: "09:00 AM", endTime: "05:00 PM" },
  { day: "Monday", startTime: "07:00 PM", endTime: "09:00 PM" },
  { day: "Tuesday", startTime: "09:00 AM", endTime: "05:00 PM" },
  { day: "Wednesday", startTime: "09:00 AM", endTime: "02:00 PM" },
  { day: "Wednesday", startTime: "03:00 PM", endTime: "05:00 PM" },
  { day: "Friday", startTime: "09:00 AM", endTime: "02:00 PM" },
];
const ClinicDetails = () => {
  const isTablet = useMediaQuery("(min-width: 577px) and (max-width: 992px)");
  const isComputer = useMediaQuery("(min-width: 993px)");
  const { data, isFetched } = useClinicDetails("661f2a1b8d3c4b001c4f7a5e");
  if (!isFetched || !data)
    return (
      <Center>
        <Text>No Specialization Found</Text>
      </Center>
    );
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
          isActive={true}
        />
      </Flex>
      <Flex w={isComputer ? "73%" : "100%"} direction="column">
        <Flex w="100%">
          <CardsInfo
            titles={["Clinics Number", "Patient Number", "Doctors Number"]}
            values={["235", "32", "435"]}
          />
        </Flex>
        <Flex w="100%" direction={isComputer ? "row" : "column"}>
          <Flex w={isComputer ? "66%" : "100%"} direction="column">
            <WorkingSchedule workingHours={workingHours} />
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
