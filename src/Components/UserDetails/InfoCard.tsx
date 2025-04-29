import {
  Image,
  Text,
  useMantineTheme,
  Flex,
  Divider,
  Badge,
  ActionIcon,
  ScrollArea,
  Skeleton,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { ReactElement, useState } from "react";
import { useTranslation } from "react-i18next";
import { BsPersonCircle } from "react-icons/bs";

interface IconItem {
  icon?: ReactElement;
  href?: string;
}
interface Props {
  name: string;
  id: string;
  birthday: string;
  gender: string;
  address?: string;
  nationalId: string;
  isActive: boolean;
  contactInfoIcons: IconItem[];
  iconsMaxWidth: string;
  imgUrl: string;
}

const InfoCard = ({
  id,
  name,
  birthday,
  gender,
  address,
  nationalId,
  isActive,
  contactInfoIcons,
  iconsMaxWidth,
  imgUrl,
}: Props) => {
  const isTablet = useMediaQuery("(min-width: 577px) and (max-width: 992px)");
  const isComputer = useMediaQuery("(min-width: 993px)");
  const generalInfoTitle = [
    "id",
    "birthday",
    "gender",
    "address",
    "nationalId",
  ];
  const { t } = useTranslation();
  const theme = useMantineTheme();
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const generalInfovalue = [id, birthday, gender, address || "", nationalId];
  return (
    <ScrollArea h="100vh">
      <Flex
        direction={isTablet ? "row" : "column"}
        justify="space-around"
        w="97%"
      >
        <Flex direction="column" gap="md" w={isTablet ? "50%" : "100%"} h={370}>
          <Flex justify="center" mt="10px" direction="column" align="center">
            {!loaded && !error && <Skeleton w={150} h={150} radius="xl" />}
            {!error && imgUrl ? (
              <Image
                content="cover"
                src={imgUrl}
                alt="Uploaded Image"
                w={150}
                h={150}
                mb={12}
                radius={8}
                onLoad={() => setLoaded(true)}
                onError={() => {
                  setLoaded(false);
                  setError(true);
                }}
                style={{ display: loaded ? "block" : "none" }}
              />
            ) : error ? (
              // <Box w={150} h={150} mb={12}>
              <BsPersonCircle
                size={150}
                color={theme.other.onSurfaceSecondary}
              />
            ) : (
              // </Box>
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
          </Flex>
          <Flex justify="center" direction="column" gap="xs">
            <Text ta="center" c={theme.other.onSurfaceSecondary}>
              {name}
            </Text>
            <Badge
              m="0 auto"
              fz={16}
              p={15}
              radioGroup="40px"
              c={theme.other?.onSurfacePrimary}
              w="fit-content"
              bg={
                isActive
                  ? theme.other.secondaryDarkColor
                  : theme.colors.myPrimary[3]
              }
            >
              {isActive ? t("active") : t("unActive")}
            </Badge>
          </Flex>
          <Text
            m="10px auto 0"
            fw={600}
            fz={18}
            c={theme.other.onSurfacePrimary}
          >
            {t("contactInfo")}
          </Text>
          <Flex m="0 auto" justify="space-between" maw={iconsMaxWidth}>
            {contactInfoIcons.map((item, index) => (
              <ActionIcon
                m="0 5px"
                onClick={() => window.open(item.href, "_blank")}
                key={index}
                size="xl"
                radius="xl"
                variant="light"
              >
                {item.icon}
              </ActionIcon>
            ))}
          </Flex>
        </Flex>
        {isComputer && (
          <Divider
            w="90%"
            h="1px"
            bg={theme.other.onSurfaceSecondary}
            m="10px auto"
          />
        )}
        <Flex direction="column" gap="sm" w={isComputer ? "100%" : "50%"}>
          <Text fw={600} fz={18} mb={20} c={theme.other.onSurfacePrimary}>
            {t("generalInfo")}
          </Text>
          <Flex direction="column" gap="md" ml={10}>
            {generalInfoTitle.map((item, index) => (
              <Flex gap="md" ml={10} key={index}>
                <Text fz={15} w={70} c={theme.other.onSurfaceSecondary}>
                  {t(item)}
                </Text>
                <Text fz={15} w="95%" c={theme.other.onSurfacePrimary}>
                  {generalInfovalue[index]}
                </Text>
              </Flex>
            ))}
          </Flex>
        </Flex>
      </Flex>
    </ScrollArea>
  );
};

export default InfoCard;
