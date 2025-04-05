import { Flex, Text, useMantineTheme } from "@mantine/core";
interface Props {
  titles: string[];
  values: string[];
  titlewidth: number;
}
const GroupText = ({ titles, values, titlewidth }: Props) => {
  // const titles = ["Date of Hire", "Employment type", "Employment End"];
  // const values = ["20/2/2025", "Doctor", "20/2/2027"];
  const theme = useMantineTheme();

  return (
    <Flex direction="column" gap="lg" pl={30}>
      {titles.map((title, index) => (
        <Flex key={index}>
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
