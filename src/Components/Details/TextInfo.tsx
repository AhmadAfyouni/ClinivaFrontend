import { Flex, Text, Tooltip, useMantineTheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useTranslation } from "react-i18next";

interface Props {
  titles: string[];
  contents: string[];
  width: number;
}
const TextInfo = ({ titles, contents, width }: Props) => {
  const { t } = useTranslation();
  const theme = useMantineTheme();
  const isTablet = useMediaQuery("(min-width: 577px) and (max-width: 992px)");
  return (
    <Flex direction="column" gap={isTablet ? "sm" : "xs"}>
      {titles.map((item, index) => (
        <Flex justify="start" key={index}>
          <Text w={width} c={theme.other.onSurfaceTertiary}>
            {t(item)}
          </Text>
          <Tooltip label={contents[index]}>
            <Text c={theme.other.onSurfacePrimary} truncate>
              {contents[index]}
            </Text>
          </Tooltip>
        </Flex>
      ))}
    </Flex>
  );
};

export default TextInfo;
