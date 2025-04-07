import { Flex, Text, useMantineTheme } from "@mantine/core";
interface Props {
  titles: string[];
  values: string[];
  titlewidth?: number;
  direction: "row" | "column";
}
const GroupText = ({ titles, values, titlewidth, direction }: Props) => {
  const theme = useMantineTheme();

  return (
    <Flex direction="column" gap="lg" pl={30}>
      {titles.map((title, index) => (
        <Flex key={index} direction={direction}>
          <Text w={titlewidth} c={theme.other.onSurfaceSecondary}>
            {title}
          </Text>
          <Text c={theme.other.onSurfacePrimary}>{values[index]}</Text>
        </Flex>
      ))}
    </Flex>
  );
};

export default GroupText;
