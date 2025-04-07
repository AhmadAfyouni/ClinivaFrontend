import {
  Image,
  Text,
  useMantineTheme,
  Flex,
  Divider,
  ActionIcon,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { ReactElement } from "react";

interface IconItem {
  icon: ReactElement;
  onClick: () => void;
}
interface Props {
  titles: string[];
  values: string[];
  titlesWidth: string;
  name: string;
  contactInfoIcons: IconItem[];
  iconsMaxWidth: string;
  hasSocialMedia: boolean;
  socialMediaIcons: IconItem[];
}

const InfoSide = ({
  name,
  contactInfoIcons,
  iconsMaxWidth,
  titles,
  values,
  titlesWidth,
  hasSocialMedia,
  socialMediaIcons,
}: Props) => {
  const isTablet = useMediaQuery("(min-width: 577px) and (max-width: 992px)");
  const isComputer = useMediaQuery("(min-width: 993px)");
  const theme = useMantineTheme();
  return (
    <Flex direction={isTablet ? "row" : "column"} w="90%" p={10}>
      <Flex direction="column" gap="md" w={isTablet ? "50%" : "100%"} h={300}>
        <Image
          w="150px"
          h="150px"
          m="0 auto"
          alt="Profile Picture"
          radius="xl"
          src="https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=87&q=80"
        />
        <Flex justify="center" direction="column" gap="xs">
          <Text ta="center" c={theme.other.onSurfaceSecondary}>
            {name}
          </Text>
        </Flex>
        <Text m="10px auto 0" fw={600} fz={18} c={theme.other.onSurfacePrimary}>
          Contact Info
        </Text>
        <Flex m="0 auto" justify="space-between" maw={iconsMaxWidth}>
          {contactInfoIcons.map((item, index) => (
            <ActionIcon
              m="0 5px"
              onClick={item.onClick}
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
          General Info
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
                Social Media Accocunts :
              </Text>
              <Flex m="0 auto" justify="space-between" maw={iconsMaxWidth}>
                {socialMediaIcons.map((item, index) => (
                  <ActionIcon
                    m="0 5px"
                    onClick={item.onClick}
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
