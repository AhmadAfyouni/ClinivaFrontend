import { Center, Flex, Text } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import InfoSide from "../../Components/CompanyDetails/InfoSide";
import { BrainCog, Mail, MapPin, PhoneCall } from "lucide-react";
import CardsInfo from "../../Components/CompanyDetails/CardsInfo";
import ListComponent from "../../Components/CompanyDetails/ListComponent";
import GridList from "../../Components/CompanyDetails/GridList";
import { BiClinic } from "react-icons/bi";
import useMedicalComplexDetails from "../../hooks/medicalcomplex/useMedicalComplexDetails";
const MedicalComplexDetails = () => {
  const isTablet = useMediaQuery("(min-width: 577px) and (max-width: 992px)");
  const isComputer = useMediaQuery("(min-width: 993px)");
  const { data, isFetched } = useMedicalComplexDetails(
    "67e50d4e191e5b9428a74741"
  );
  console.log(data);
  if (!isFetched || !data)
    return (
      <Center>
        <Text>No Specialization Found</Text>
      </Center>
    );
  const titles = ["Establichment Year", "Vission", "Goals", "OverView"];
  const values = [
    data.yearOfEstablishment,
    data.vision,
    data.goals,
    data.overview,
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
  const items = ["Item 1 Item 1", "Item 2", "Item 3", "Item 4", "Item 5"];
  const itemsList = [
    "Clone or download Clone or download Clone or download Clone",
    "Install dependencies",
    "Install dependencies",
    "Install dependencies",
  ];
  return (
    <Flex direction={isComputer ? "row" : "column"}>
      <Flex w={isComputer ? "23%" : "100%"}>
        <InfoSide
          url={data.logo}
          name={data.name}
          contactInfoIcons={icons}
          iconsMaxWidth=""
          values={values}
          titles={titles}
          titlesWidth="90"
          hasSocialMedia={true}
          socialMediaIcons={icons}
          hasActivation={true}
          isActive={data.isActive}
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
            <Flex w="100%">
              <Flex w="49%">
                <ListComponent
                  icon={<BiClinic size={16} />}
                  listItems={itemsList}
                  title="Departments"
                />
              </Flex>
              <Flex w="49%">
                <ListComponent
                  icon={<BiClinic size={16} />}
                  listItems={itemsList}
                  title="Clinics"
                />
              </Flex>
            </Flex>
            <Flex w={isComputer ? "66%" : "90%"}>
              <ListComponent
                icon={<BrainCog size={16} />}
                listItems={itemsList}
                title="Specialities"
              />
            </Flex>
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

export default MedicalComplexDetails;
