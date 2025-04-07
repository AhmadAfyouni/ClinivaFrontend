import {
  Table,
  Text,
  Button,
  useMantineTheme,
  Box,
  ScrollArea,
  Flex,
} from "@mantine/core";
interface Props<T> {
  th: string[];
  tb: T[];
  tableTitle: string;
  visibleButton: boolean;
  buttonValue: string;
  mah: string;
}
const PercentageTable = <T extends Record<string, string>>({
  th,
  tb,
  tableTitle,
  buttonValue,
  visibleButton,
  mah,
}: Props<T>) => {
  const theme = useMantineTheme();
  return (
    <ScrollArea h={mah} w="100%">
      <Box w="95%">
        <Flex justify="space-between" w="100%">
          <Text fw={600} size="lg" c={theme.other.onSurfacePrimary}>
            {tableTitle}
          </Text>
          {visibleButton && (
            <Button
              variant="subtle"
              w="fit-content"
              h="25px"
              fz={15}
              c={theme.other.onSurfacePrimary}
              bg={theme.other.secondaryColor}
              radius="25px"
              fw={500}
            >
              {buttonValue}
            </Button>
          )}
        </Flex>
        <Table>
          <Table.Thead>
            <Table.Tr>
              {th.map((item, index) => (
                <Table.Th key={index} c={theme.other.onSurfaceTertiary}>
                  {item}
                </Table.Th>
              ))}
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {tb.map((it, rowIndex) => (
              <Table.Tr key={rowIndex}>
                {th.map((item, columnIndex) => (
                  <Table.Td key={columnIndex} c={theme.other.onSurfacePrimary}>
                    {it[item.toLocaleLowerCase()]}
                  </Table.Td>
                ))}
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Box>
    </ScrollArea>
  );
};

export default PercentageTable;
