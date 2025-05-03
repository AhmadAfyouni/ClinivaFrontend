import {
  Card,
  Text,
  Flex,
  Divider,
  ScrollArea,
  useMantineTheme,
  Tooltip,
  Image,
  Box,
  Skeleton,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { BsPersonCircle } from "react-icons/bs";
interface Props {
  name: string;
  specialty: string[];
  birthday: Date;
  gender: string;
  status: string;
  childrenNum: number;
  languages: string[];
  about?: string;
  hireDate: Date;
  experience: string;
  certification: string;
  phone: string;
  email: string;
  socialMedia: string;
  address: string;
  imgUrl: string;
  licenseNumber: string;
  Qualifcations: string;
  conslutionfee: number;
  avalibilty: string;
  // age: number;
}
const DoctorProfileCard = ({
  name,
  // age,
  specialty,
  birthday,
  gender,
  status,
  childrenNum,
  languages,
  about,
  hireDate,
  experience,
  certification,
  phone,
  email,
  socialMedia,
  address,
  imgUrl,
  licenseNumber,
  conslutionfee,
  avalibilty,
}: Props) => {
  const { t } = useTranslation();
  const theme = useMantineTheme();
  const isMobile = useMediaQuery("(max-width: 576px)");
  const isTablet = useMediaQuery("(min-width: 577px) and (max-width: 992px)");
  const isDesktop = useMediaQuery("(min-width: 993px)");

  const specialtyStr = specialty.join();
  const languagesStr = languages.join();
  const bithdayStr = birthday.toLocaleDateString("en-US");
  const hireDateStr = hireDate.toLocaleDateString("en-US");
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const titleInfo = [
    t("name"),
    t("specialties"),
    t("birthday"),
    // t("age"),
    t("gender"),
    t("status"),
    t("childrenNum"),
    t("languages"),
    t("licenseNum"),
    t("conslutionfee"),
    t("on Call"),
  ];
  const textInfo = [
    name,
    specialtyStr,
    bithdayStr,
    // age,
    gender,
    status,
    childrenNum,
    languagesStr,
    licenseNumber,
    conslutionfee,
    avalibilty,
  ];
  const sectionTitle = [
    t("Qualifcations"),
    t("Hire Date"),
    t("Experience"),
    t("Certification"),
  ];
  const sectionText = [about, hireDateStr, experience, certification];
  const contactInfoTitle = [
    t("phone"),
    t("Email"),
    t("socialMedia"),
    t("Address"),
  ];
  const contactInfoText = [phone, email, socialMedia, address];

  return (
    <Flex
      bg={theme.other.bg}
      direction={isMobile ? "column" : isTablet ? "row" : "column"}
      justify="space-between"
    >
      <Flex
        align="flex-start"
        h="230px"
        direction="row"
        w={isMobile ? "100%" : isTablet ? "30%" : "100%"}
      >
        <Box w={30} h={30} pos="relative" display="inline-block">
          {!loaded && !error && <Skeleton w={30} h={30} radius="xl" />}
          {!error && imgUrl ? (
            <Image
              w={30}
              h={30}
              sizes="cover"
              src={imgUrl}
              onLoad={() => setLoaded(true)}
              onError={() => {
                setLoaded(false);
                setError(true);
              }}
              style={{
                borderRadius: "8px",
                transition: "transform 0.3s ease-in-out",
                position: "absolute",
                zIndex: 999,
                transformOrigin: "top left",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "scale(8)";
                e.currentTarget.style.zIndex = "1000";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.zIndex = "1000";
              }}
            />
          ) : error ? (
            <BsPersonCircle size={30} color={theme.other.onSurfaceSecondary} />
          ) : (
            <Flex
              justify="center"
              bg={theme.other.bg}
              mb={12}
              align="center"
              style={{
                borderRadius: "50%",
              }}
            />
          )}
        </Box>
        <Flex direction="column">
          {titleInfo.map((item, index) => (
            <Flex direction="row" align="end" mb="4px" key={index}>
              <Text
                w="90px"
                fw={500}
                fz="14px"
                c={theme.other.onSurfaceSecondary}
              >
                {item}
              </Text>
              <Tooltip label={textInfo[index]}>
                <Text key={index} fz="14px" c={theme.other.onSurfacePrimary}>
                  {textInfo[index]}
                </Text>
              </Tooltip>
            </Flex>
          ))}
        </Flex>
      </Flex>

      <Divider
        w="80%"
        h={2}
        m="30px 0 0 0 "
        visibleFrom="lg"
        c={theme.other.borderDefault}
      />
      <Card.Section
        p={isTablet ? 0 : "md"}
        h={isTablet ? "150" : "290"}
        w={isMobile ? "100%" : isTablet ? "30%" : "100%"}
        mb={isTablet || isMobile ? 0 : 20}
      >
        {sectionTitle.map((item, index) => (
          <Flex direction="column" key={index}>
            <Flex direction="column" h={50} mt={10}>
              <Text size="sm" fw={600} c={theme.other.onSurfacePrimary}>
                {item}
              </Text>
              <ScrollArea h={20}>
                <Text size="sm" c={theme.other.onSurfaceSecondary}>
                  {sectionText[index]}
                </Text>
              </ScrollArea>
            </Flex>
            {index !== sectionTitle.length - 1 && (
              <Divider
                w="80%"
                h={5}
                m="10px 0 10px"
                visibleFrom="lg"
                c={theme.other.borderDefault}
              />
            )}
          </Flex>
        ))}
      </Card.Section>

      <Card.Section
        p="md"
        pt={0}
        w={isMobile ? "100%" : isTablet ? "30%" : "100%"}
        mt={isDesktop ? 20 : 0}
      >
        <Text fw={600} mb="25px" mt="10px" c={theme.other.onSurfacePrimary}>
          {t("contactInfo")}
        </Text>
        <Flex direction="column" gap="sm">
          {contactInfoTitle.map((item, index) => (
            <Flex
              h={{ sm: 30, md: 20 }}
              justify="start"
              align="centers"
              key={index}
            >
              <Text
                size="sm"
                fw={500}
                miw="80px"
                c={theme.other.onSurfaceSecondary}
              >
                {item}
              </Text>
              <Text size="sm" c={theme.other.onSurfacePrimary}>
                {contactInfoText[index]}
              </Text>
            </Flex>
          ))}
        </Flex>
      </Card.Section>
    </Flex>
  );
};

export default DoctorProfileCard;
