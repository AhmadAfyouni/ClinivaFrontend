import { Box, Checkbox, Flex, Table, useMantineTheme } from "@mantine/core";
import sortData from "../../utilities/SortData";
interface Props<T> {
  sortBy: string | null;
  setSortBy: (sort: keyof T | null) => void;
  reverseSortDirection: boolean;
  setReverseSortDirection: (reverse: boolean) => void;
  selection: string[];
  setSelection: (updater: (current: string[]) => string[]) => void;
  data: T[];
  search: string;
  setSortedData: (data: T[]) => void;
  labels:string[]
}
const TableHead = <T extends Record<string, string>>({
  sortBy,
  setSortBy,
  reverseSortDirection,
  setReverseSortDirection,
  selection,
  setSelection,
  data,
  search,
  setSortedData,
  labels,
}: Props<T>) => {
  const theme = useMantineTheme();
  const setSorting = (field: keyof T) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
    setSortedData(sortData(data, { sortBy: field, reversed, search }));
  };

  const toggleAll = () =>
    setSelection((current) =>
      current.length === data.length ? [] : data.map((item) => item.id)
    );

  const sortingLable = Object.keys(data[0])
  const styles: React.CSSProperties = {
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    fontWeight: "bold",
    fontSize: "12px",
  };
  return (
    <Table.Thead>
      <Table.Tr>
        <Table.Th>
          <Checkbox
            iconColor={theme.other.onSurfacePrimary}
            color={selection ? theme.other.secondaryColor : theme.other.bg}
            w="12px"
            h="12px"
            size="12px"
            onChange={toggleAll}
            checked={selection.length === data.length}
            indeterminate={
              selection.length > 0 && selection.length !== data.length
            }
          />
        </Table.Th>
        <Table.Th p={0} colSpan={6} w="100%">
          <Flex w="97%" justify="space-between">
            <Flex visibleFrom="md" w="25%" justify="space-between">
              <Box w="70px">
                <Box style={styles} onClick={() => setSorting(sortingLable[0])}>
                  {labels[0]}
                  {sortBy === sortingLable[0] && (
                    <Box ml={4}>{reverseSortDirection ? "▲" : "▼"}</Box>
                  )}
                </Box>
              </Box>
              <Box w="130px">
                <Box style={styles} onClick={() => setSorting(sortingLable[1])}>
                {labels[1]}
                  {sortBy ===sortingLable[1] && (
                    <Box ml={4}>{reverseSortDirection ? "▲" : "▼"}</Box>
                  )}
                </Box>
              </Box>
            </Flex>

            {/* Mobile Screen */}
            <Flex w="120px" align="start" hiddenFrom="md">
              <Box w="120px">
                <Box style={styles} onClick={() => setSorting(sortingLable[0])}>
                  Patient
                  {sortBy === sortingLable[0] && (
                    <Box ml={4}>{reverseSortDirection ? "▲" : "▼"}</Box>
                  )}
                </Box>
              </Box>
            </Flex>

            <Flex w={{ base: "90px", md: "148px" }}>
              <Box w="148px">
                <Box onClick={() => setSorting(sortingLable[2])} style={styles} >
                  {labels[2]}
                  {sortBy === sortingLable[2] && (
                    <Box ml={4}>{reverseSortDirection ? "▲" : "▼"}</Box>
                  )}
                </Box>
              </Box>
            </Flex>

            <Box w="96px">
              <Box onClick={() => setSorting(sortingLable[3])} style={styles}>
              {labels[3]}
                {sortBy === sortingLable[3] && (
                  <Box ml={4}>{reverseSortDirection ? "▲" : "▼"}</Box>
                )}
              </Box>
            </Box>

            <Box w="106px">
              <Box onClick={() => setSorting(sortingLable[4])} style={styles}>
                {labels[4]}
                {sortBy === sortingLable[4] && (
                  <Box ml={4}>{reverseSortDirection ? "▲" : "▼"}</Box>
                )}
              </Box>
            </Box>

            <Box w="110px">
              <Box onClick={() => setSorting(sortingLable[5])} style={styles}>
                {labels[5]}
                {sortBy === sortingLable[5] && (
                  <Box ml={4}>{reverseSortDirection ? "▲" : "▼"}</Box>
                )}
              </Box>
            </Box>
          </Flex>
        </Table.Th>
      </Table.Tr>
    </Table.Thead>
  );
};

export default TableHead;
