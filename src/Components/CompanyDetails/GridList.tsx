import {
  Box,
  Card,
  ScrollArea,
  SimpleGrid,
  Text,
  useMantineTheme,
} from "@mantine/core";

interface Props {
  girdItems: string[];
  title: string;
}
function GridList({ title, girdItems }: Props) {
  const theme = useMantineTheme();
  return (
    <Box>
      <Box c={theme.other.onSurfaceTertiary}>
        <Text>{title}</Text>
      </Box>
      <ScrollArea p="md" h={250}>
        <SimpleGrid cols={3} spacing="md">
          {girdItems.map((item, index) => (
            <Card
              key={index}
              shadow="sm"
              padding="lg"
              radius="md"
              withBorder
              bg={
                index % 2 === 0
                  ? theme.colors.myPrimary[3]
                  : theme.other.secondaryColor
              }
            >
              <Text c={theme.other.onSurfacePrimary}>{item}</Text>
            </Card>
          ))}
        </SimpleGrid>
      </ScrollArea>
    </Box>
  );
}

export default GridList;
