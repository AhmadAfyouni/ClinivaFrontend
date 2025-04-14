import {
  Box,
  Card,
  ScrollArea,
  SimpleGrid,
  Text,
  Tooltip,
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
            <Tooltip label={item} key={index}>
              <Card
                h={55}
                shadow="sm"
                padding="xs"
                radius="md"
                withBorder
                bg={
                  index % 2 === 0
                    ? theme.colors.myPrimary[3]
                    : theme.other.secondaryColor
                }
              >
                <Text
                  c={theme.other.onSurfacePrimary}
                  ta="center"
                  truncate
                  w="90%"
                >
                  {item}
                </Text>
              </Card>
            </Tooltip>
          ))}
        </SimpleGrid>
      </ScrollArea>
    </Box>
  );
}

export default GridList;
