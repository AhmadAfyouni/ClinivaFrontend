import {
  Image,
  Text,
  useMantineTheme,
  Flex,
  Divider,
  ActionIcon,
  Skeleton,
  Badge,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { ReactElement, useState } from "react";
import { useTranslation } from "react-i18next";

interface IconItem {
  icon: ReactElement;
  href: string;
}
interface Props {
  titles: string[];
  values: string[];
  titlesWidth: string;
  url: string;
  name: string;
  contactInfoIcons: IconItem[];
  iconsMaxWidth: string;
  hasSocialMedia: boolean;
  socialMediaIcons: IconItem[];
  hasActivation: boolean;
  isActive?: boolean;
}

const InfoSide = ({
  name,
  url,
  contactInfoIcons,
  iconsMaxWidth,
  titles,
  values,
  titlesWidth,
  hasSocialMedia,
  socialMediaIcons,
  hasActivation,
  isActive,
}: Props) => {
  const { t } = useTranslation();
  const isTablet = useMediaQuery("(min-width: 577px) and (max-width: 992px)");
  const isComputer = useMediaQuery("(min-width: 993px)");
  const theme = useMantineTheme();
  const [loaded, setLoaded] = useState(false);
  const [imgSrc, setImgSrc] = useState(url || "/fallback.png");
  return (
    <Flex direction={isTablet ? "row" : "column"} w="90%" p={10}>
      <Flex
        direction="column"
        gap="md"
        w={isTablet ? "50%" : "100%"}
        h={hasActivation ? 350 : 300}
      >
        <div
          style={{
            width: 150,
            height: 150,
            margin: "0 auto",
            position: "relative",
          }}
        >
          {!loaded && <Skeleton width={150} height={150} radius="xl" />}
          <Image
            w={150}
            h={150}
            radius="xl"
            alt=""
            src={imgSrc}
            onLoad={() => setLoaded(true)}
            onError={() => {
              setImgSrc("/fallback.png");
              setLoaded(true);
            }}
            style={{ display: loaded ? "block" : "none" }}
          />
        </div>
        <Flex justify="center" direction="column" gap="xs" align="center">
          <Text ta="center" c={theme.other.onSurfaceSecondary}>
            {name}
          </Text>
          {hasActivation && (
            <Badge
              ta="center"
              size="lg"
              bg={
                isActive
                  ? theme.other.secondaryDarkColor
                  : theme.colors.myPrimary[3]
              }
            >
              {isActive ? "Active" : "InActive"}
            </Badge>
          )}
        </Flex>
        <Text m="10px auto 0" fw={600} fz={18} c={theme.other.onSurfacePrimary}>
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
          {titles.map((item, index) => (
            <Flex gap="md" ml={10} key={index}>
              <Text fz={15} w={titlesWidth} c={theme.other.onSurfaceSecondary}>
                {item}
              </Text>
              <Text fz={15} c={theme.other.onSurfacePrimary}>
                {values[index]}
              </Text>
            </Flex>
          ))}

          {hasSocialMedia && (
            <>
              <Text fw={500} fz={16} mb={10} c={theme.other.onSurfacePrimary}>
                {t("socialMediaAccocunts:")}
              </Text>
              <Flex m="0 auto" justify="space-between" maw={iconsMaxWidth}>
                {socialMediaIcons.map((item, index) => (
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
            </>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default InfoSide;
