import { Flex } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import InfoSide from "../../Components/CompanyDetails/InfoSide";
import { BrainCog, Globe, Mail, MapPin, Phone } from "lucide-react";
import CardsInfo from "../../Components/CompanyDetails/CardsInfo";
import ListComponent from "../../Components/CompanyDetails/ListComponent";
import GridList from "../../Components/CompanyDetails/GridList";
import { BiClinic } from "react-icons/bi";
const MedicalComplexDetails = () => {
  const isTablet = useMediaQuery("(min-width: 577px) and (max-width: 992px)");
  const isComputer = useMediaQuery("(min-width: 993px)");
  const titles = ["Establichment Year", "Vission", "Goals", "OverView"];
  const values = ["2/4/2024", "there is no vission", "many goals", "OverView"];
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
  const items = ["Item 1", "Item 2", "Item 3", "Item 4", "Item 5"];
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
          name=""
          contactInfoIcons={icons}
          iconsMaxWidth=""
          values={values}
          titles={titles}
          titlesWidth="90"
          hasSocialMedia={true}
          socialMediaIcons={icons}
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
