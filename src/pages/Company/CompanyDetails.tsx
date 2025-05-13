import { Mail, MapPin, PhoneCall, Sparkles } from "lucide-react";
import InfoSide from "../../Components/CompanyDetails/InfoSide";
import {
  Button,
  Center,
  Flex,
  ScrollArea,
  Text,
  ThemeIcon,
  useMantineTheme,
} from "@mantine/core";
import TextList from "../../Components/CompanyDetails/TextList";
import TextTitle from "../../Components/CompanyDetails/TextTitle";
import GroupText from "../../Components/UserDetails/GroupText";
import { useMediaQuery } from "@mantine/hooks";
import useCompanyDetails from "../../hooks/company/useCompanyDetails";
import { useLocation, useNavigate } from "react-router";
import { useEffect } from "react";

const CompanyDetails = () => {
  const theme = useMantineTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width: 576px)");
  const isTablet = useMediaQuery("(min-width: 577px) and (max-width: 992px)");
  const isComputer = useMediaQuery("(min-width: 993px)");
  // const { data: companies, isFetched } = useCompanyDetails();
  //   const { data: companies, isFetched } = useCompanyDetails({
  //   refetchOnMount: true,
  // });

  
const location = useLocation();
const { data: companies, isFetched, refetch } = useCompanyDetails({
  refetchOnMount: true,
});

useEffect(() => {
  if (location.state?.updated) {
    refetch();
  }
}, [location.state, refetch]);
  if (!isFetched)
    return (
      <Center>
        {/* <Text>No Company Details Found</Text> */}
      </Center>
    );
  const titles = [
    "Establichment Year",
    "Vission",
    "Goals",
    "OverView",
    "Location",
    "Key member",
    "Founder",
    "Excutines",
  ];
  if(!companies){
    return <Center>
        <Text>No Company Details Found</Text>
      </Center>
  }
  const values = [
    companies[0].yearOfEstablishment?.slice(0, 10) || "",
    companies[0].vision || "",
    companies[0].goals || "",
    companies[0].overview || "",
    companies[0]?.location?.x != null
      ? `${companies[0].location.x} - ${companies[0].location.y}`
      : "",
    companies[0]?.Key_member || "",
    companies[0]?.Founder || "",
    companies[0]?.Executives || "",
  ];
  const icons = companies[0].contactInfos.map((item) => {
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
  const handleEditEvent = () => {
    navigate(`/company/edit`);
  };
  return (
    <ScrollArea h="100vh">
      <Flex
        w="100%"
        justify="space-between"
        direction={isComputer ? "row" : "column"}
      >
        <Flex w={isComputer ? "23%" : "100%"} direction="column">
          <InfoSide
            name={companies[0].name}
            contactInfoIcons={icons}
            iconsMaxWidth=""
            values={values}
            titles={titles}
            url={companies[0].logo}
            titlesWidth="90"
            hasSocialMedia={true}
            socialMediaIcons={icons}
            hasActivation={false}
          />
          <Button
            variant="filled"
            color="green"
            radius="xl"
            mb={isComputer ? "110px" : "20px"}
            ml="30px"
            w="30%"
            onClick={handleEditEvent}
          >
            Edit
          </Button>
        </Flex>
        <Flex w={isComputer ? "46%" : "100%"} direction="column" gap="xl">
          <TextList
            heightOneList={isMobile ? 50 : 100}
            heightLists={200}
            title="Bank Accunts"
            title1="bank name"
            content1={companies[0].bankAccount.map((item) => item.bankName)}
            title2="Account Number"
            content2={companies[0].bankAccount.map(
              (item) => item.accountNumber
            )}
          />
          <TextList
            heightOneList={isMobile ? 50 : 100}
            heightLists={200}
            title="Cash Box"
            title1="Cash Box name"
            content1={companies[0].cashBoxes.map((item) => item.name)}
            title2="Cash Box PIC"
            content2={companies[0].cashBoxes.map((item) => item.pic)}
          />
          <TextList
            heightOneList={isMobile ? 50 : 100}
            heightLists={200}
            title="Online Payment Method"
            title1="Company Name"
            content1={companies[0].onlinePaymentMethods.map(
              (item) => item.companyName
            )}
            title2="Processing Fees"
            content2={companies[0].onlinePaymentMethods.map((item) =>
              item.processingFees.toString()
            )}
          />
          <TextList
            heightOneList={isMobile ? 50 : 100}
            heightLists={200}
            title="Insurance company"
            title1="Company Name"
            content1={companies[0].insuranceCompany.map(
              (item) => item.companyName
            )}
            title2="Company Phone"
            content2={companies[0].insuranceCompany.map(
              (item) => item.companyPhone
            )}
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
                companies[0].commercialRecord?.recordNumber || "",
                companies[0].commercialRecord?.taxNumber || "",
              ]}
            />
          </Flex>
          <Flex direction="column" gap="xl">
            <TextTitle title={"Terms & Condition"} content={content} />
            <TextTitle title={"Privacy policy"} content={content} />
          </Flex>
        </Flex>
      </Flex>
    </ScrollArea>
  );
};

export default CompanyDetails;
