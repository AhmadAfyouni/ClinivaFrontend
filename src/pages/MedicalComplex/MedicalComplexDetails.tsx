import { Center, Flex, Text } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import InfoSide from "../../Components/CompanyDetails/InfoSide";
import { BrainCog, Mail, MapPin, PhoneCall } from "lucide-react";
import CardsInfo from "../../Components/CompanyDetails/CardsInfo";
import ListComponent from "../../Components/CompanyDetails/ListComponent";
import GridList from "../../Components/CompanyDetails/GridList";
import { BiClinic } from "react-icons/bi";
import useMedicalComplexDetails from "../../hooks/medicalcomplex/useMedicalComplexDetails";
import { useParams } from "react-router";
import ContactInfo from "../../types/common/ContactInfo";
import { useTranslation } from "react-i18next";

const MedicalComplexDetails = () => {
  const { t } = useTranslation();
  const isTablet = useMediaQuery("(min-width: 577px) and (max-width: 992px)");
  const isComputer = useMediaQuery("(min-width: 993px)");
  const { id } = useParams();
  const { data, isFetched } = useMedicalComplexDetails(id!);

  if (!isFetched || !data)
    return (
      <Center>
        <Text>{t("noMedicalDetailsFound")}</Text>
      </Center>
    );

  const titles = [
    t("establishmentYear"),
    t("vision"),
    t("goals"),
    t("overview"),
  ];
  const values = [
    data.createdAt.slice(0, 10),
    data.vision,
    data.details,
    data.vision,
  ];
  const icons = data.contactInfos.map((item: ContactInfo) => {
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
  const items = ["item1", "item2", "item3", "item4", "item5"];
  const itemsList = [
    "cloneOrDownload",
    "installDependencies",
    "installDependencies",
    "installDependencies",
  ];
  return (
    <Flex direction={isComputer ? "row" : "column"}>
      <Flex w={isComputer ? "23%" : "100%"}>
        <InfoSide
          url={"nothing"}
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
            titles={[
              t("clinicsNumber"),
              t("patientsNumber"),
              t("doctorsNumber"),
            ]}
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
                  title={t("departments")}
                />
              </Flex>
              <Flex w="49%">
                <ListComponent
                  icon={<BiClinic size={16} />}
                  listItems={itemsList}
                  title={t("clinics")}
                />
              </Flex>
            </Flex>
            <Flex w={isComputer ? "66%" : "90%"}>
              <ListComponent
                icon={<BrainCog size={16} />}
                listItems={itemsList}
                title={t("specialties")}
              />
            </Flex>
          </Flex>
          <Flex
            w={isComputer ? "33%" : "100%"}
            direction={isTablet ? "row" : "column"}
          >
            <GridList girdItems={items} title={t("doctors")} />
            <GridList girdItems={items} title={t("staff")} />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default MedicalComplexDetails;
