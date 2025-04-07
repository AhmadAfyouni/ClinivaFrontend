import { Card, Flex, Text, useMantineTheme } from "@mantine/core";
import { Calculator } from "lucide-react";
interface Props {
  titles: string[];
  values: string[];
}
const CardsInfo = ({ titles, values }: Props) => {
  const theme = useMantineTheme();
  return (
    <Card
      padding="md"
      radius="xl"
      w="100%"
      h={100}
      style={{
        justifyContent: "space-between",
      }}
    >
      <Flex justify="space-between" h="100%" w="100%">
        {titles.map((title, index) => (
          <Flex
            key={index}
            justify="space-around"
            w="30%"
            style={{ borderRadius: "10px" }}
            bg={theme.colors.myPrimary[3]}
          >
            <Flex align="center" justify="center" gap="sm">
              <Calculator size={20} color={theme.colors.myPrimary[5]} />
              <Text size="sm" c={theme.other.onSurfaceSecondary}>
                {title}
              </Text>
            </Flex>
            <Flex align="center" justify="center" gap="sm">
              <Text
                ta="start"
                size="sm"
                fw={600}
                c={theme.other.onSurfacePrimary}
              >
                {values[index]}
              </Text>
            </Flex>
          </Flex>
        ))}
      </Flex>
    </Card>
  );
};

export default CardsInfo;
