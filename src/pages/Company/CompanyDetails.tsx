import { Globe, Mail, MapPin, Phone, Sparkles } from "lucide-react";
import InfoSide from "../../Components/CompanyDetails/InfoSide";
import { Flex, Text, ThemeIcon, useMantineTheme } from "@mantine/core";
import TextList from "../../Components/CompanyDetails/TextList";
import TextTitle from "../../Components/CompanyDetails/TextTitle";
import GroupText from "../../Components/UserDetails/GroupText";
import { useMediaQuery } from "@mantine/hooks";

const CompanyDetails = () => {
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
  const content =
    "transform your data into actionable insights. Our platform helps you make informed decisions faster and with greater confidence.";
  const theme = useMantineTheme();
  const isTablet = useMediaQuery("(min-width: 577px) and (max-width: 992px)");
  const isComputer = useMediaQuery("(min-width: 993px)");
  return (
    <Flex
      w="100%"
      justify="space-between"
      direction={isComputer ? "row" : "column"}
    >
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
      <Flex w={isComputer ? "46%" : "100%"} direction="column" gap="xl">
        <TextList
          title="Bank Accunts"
          title1="banl name"
          content1={["Al-Noor Medical Center", "yula"]}
          title2="bank number"
          content2={["1234567890", "9876543210"]}
        />
        <TextList
          title="Cash Box"
          title1="banl name"
          content1={["Al-Noor Medical Center", "yula"]}
          title2="bank number"
          content2={["1234567890", "9876543210"]}
        />
        <TextList
          title="Online Payment Method"
          title1="banl name"
          content1={["Al-Noor Medical Center", "yula"]}
          title2="bank number"
          content2={["1234567890", "9876543210"]}
        />
        <TextList
          title="Insurance company"
          title1="banl name"
          content1={["Al-Noor Medical Center", "yula"]}
          title2="bank number"
          content2={["1234567890", "9876543210"]}
        />
      </Flex>
      <Flex
        w={isComputer ? "23%" : "100%"}
        direction={isTablet ? "row" : "column"}
        gap="xl"
      >
        <Flex direction="column" w={isTablet ? "35%" : "100%"}>
          <Flex>
            <ThemeIcon
              size={18}
              radius="md"
              variant="light"
              c={theme.colors.myPrimary[5]}
            >
              <Sparkles size={24} />
            </ThemeIcon>
            <Text fw={600} fz={18} ml={10} mb={10}>
              Commercial Record
            </Text>
          </Flex>
          <GroupText
            direction="column"
            titles={["recordNumber", "taxNumber"]}
            values={["34365465478", "45756875"]}
          />
        </Flex>
        <Flex direction="column" gap="xl">
          <TextTitle title={"Terms & Condition"} content={content} />
          <TextTitle title={"Privacy policy"} content={content} />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default CompanyDetails;
