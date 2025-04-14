import { Mail, MapPin, PhoneCall, Sparkles } from "lucide-react";
import InfoSide from "../../Components/CompanyDetails/InfoSide";
import { Center, Flex, Text, ThemeIcon, useMantineTheme } from "@mantine/core";
import TextList from "../../Components/CompanyDetails/TextList";
import TextTitle from "../../Components/CompanyDetails/TextTitle";
import GroupText from "../../Components/UserDetails/GroupText";
import { useMediaQuery } from "@mantine/hooks";
import useCompanyDetails from "../../hooks/company/useCompanyDetails";

const CompanyDetails = () => {
  const theme = useMantineTheme();
  const isMobile = useMediaQuery("(max-width: 576px)");
  const isTablet = useMediaQuery("(min-width: 577px) and (max-width: 992px)");
  const isComputer = useMediaQuery("(min-width: 993px)");
  const { data, isFetched } = useCompanyDetails("67dea53879003374d5318628");
  if (!isFetched || !data)
    return (
      <Center>
        <Text>No Specialization Found</Text>
      </Center>
    );
  const titles = ["Establichment Year", "Vission", "Goals", "OverView"];
  const values = [
    data.yearOfEstablishment.slice(0, 10),
    data.vision,
    data.goals,
    data.overview,
  ];
  const icons = data.ContactInfos.map((item) => {
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
  const content =
    "transform your data into actionable insights. Our platform helps you make informed decisions faster and with greater confidence.";

  return (
    <Flex
      w="100%"
      justify="space-between"
      direction={isComputer ? "row" : "column"}
    >
      <Flex w={isComputer ? "23%" : "100%"}>
        <InfoSide
          name={data.name}
          contactInfoIcons={icons}
          iconsMaxWidth=""
          values={values}
          titles={titles}
          url={data.logo}
          titlesWidth="90"
          hasSocialMedia={true}
          socialMediaIcons={icons}
          hasActivation={false}
        />
      </Flex>
      <Flex w={isComputer ? "46%" : "100%"} direction="column" gap="xl">
        <TextList
          heightOneList={isMobile ? 50 : 100}
          heightLists={200}
          title="Bank Accunts"
          title1="bank name"
          content1={data.bankAccount.map((item) => item.bankName)}
          title2="Account Number"
          content2={data.bankAccount.map((item) => item.accountNumber)}
        />
        <TextList
          heightOneList={isMobile ? 50 : 100}
          heightLists={200}
          title="Cash Box"
          title1="Cash Box name"
          content1={data.cashBoxes.map((item) => item.name)}
          title2="Cash Box PIC"
          content2={data.cashBoxes.map((item) => item.pic)}
        />
        <TextList
          heightOneList={isMobile ? 50 : 100}
          heightLists={200}
          title="Online Payment Method"
          title1="Company Name"
          content1={data.onlinePaymentMethods.map((item) => item.companyName)}
          title2="Processing Fees"
          content2={data.onlinePaymentMethods.map((item) =>
            item.processingFees.toString()
          )}
        />
        <TextList
          heightOneList={isMobile ? 50 : 100}
          heightLists={200}
          title="Insurance company"
          title1="Company Name"
          content1={data.insuranceCompany.map((item) => item.companyName)}
          title2="Company Phone"
          content2={data.insuranceCompany.map((item) => item.companyPhone)}
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
            values={[
              data.commercialRecord.recordNumber,
              data.commercialRecord.taxNumber,
            ]}
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
