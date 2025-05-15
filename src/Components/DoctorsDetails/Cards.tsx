import { Flex, Card, Group, Text, useMantineTheme } from "@mantine/core";
import { IconUsers } from "@tabler/icons-react";
import { PiIdentificationCardThin } from "react-icons/pi";
import { CiFlag1 } from "react-icons/ci";
interface Props {
  title: string[];
  value: string[];
}
export default function Cards({ title, value }: Props) {
  const theme = useMantineTheme();
  const colors = {
    firstAndLast: theme.other.secondaryColor,
    middle: theme.colors.myPrimary[3],
  };
  const icons = [
    <PiIdentificationCardThin size={32} color={theme.other.onSurfacePrimary} />,
    <CiFlag1 size={32} color={theme.other.onSurfacePrimary} />,
    <IconUsers stroke={1.3} color={theme.other.onSurfacePrimary} />,
  ];
  return (
    <Flex gap="md" justify="space-between" align="stretch">
      {title.map((item, index) => (
        <Card
          key={index}
          padding="lg"
          radius="10%"
          w="30%"
          h="30%"
          bg={index === 1 ? colors.middle : colors.firstAndLast}
          withBorder
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Group justify="start" mb="xs">
            {icons[index]}
            <Text fw={500} c={theme.other.onSurfacePrimary} fz={16}>
              {item}
            </Text>
          </Group>
          <Flex direction="row" gap="xs" justify="space-between">
            <Text fz="1.5rem" fw={600}>
              {value[index].toLocaleString()}
            </Text>
          </Flex>
        </Card>
      ))}
    </Flex>
  );
}
