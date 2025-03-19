import { Box, Checkbox, Flex, Table, useMantineTheme } from "@mantine/core";
import Patient from "../../types/Patient";
import sortData from "../../utilities/SortData";
interface Props {
  sortBy: string | null;
  setSortBy: (sort: keyof Patient | null) => void;
  reverseSortDirection: boolean;
  setReverseSortDirection: (reverse: boolean) => void;
  selection: string[];
  setSelection: (updater: (current: string[]) => string[]) => void;
  data: Patient[];
  search: string;
  setSortedData: (data: Patient[]) => void;
}
const TableHead = ({
  sortBy,
  setSortBy,
  reverseSortDirection,
  setReverseSortDirection,
  selection,
  setSelection,
  data,
  search,
  setSortedData,
}: Props) => {
  const theme = useMantineTheme();
  const setSorting = (field: keyof Patient) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
    setSortedData(sortData(data, { sortBy: field, reversed, search }));
  };

  const toggleAll = () =>
    setSelection((current) =>
      current.length === data.length ? [] : data.map((item) => item.id)
    );

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
            <Flex visibleFrom="md" w="30%" justify="space-between">
              <Box w="70px">
                <Box style={styles} onClick={() => setSorting("id")}>
                  Patient ID
                  {sortBy === "id" && (
                    <Box ml={4}>{reverseSortDirection ? "▲" : "▼"}</Box>
                  )}
                </Box>
              </Box>
              <Box w="130px">
                <Box style={styles} onClick={() => setSorting("name")}>
                  Name
                  {sortBy === "name" && (
                    <Box ml={4}>{reverseSortDirection ? "▲" : "▼"}</Box>
                  )}
                </Box>
              </Box>
            </Flex>

            {/* Mobile Screen */}
            <Flex w="120px" align="start" hiddenFrom="md">
              <Box w="120px">
                <Box style={styles} onClick={() => setSorting("id")}>
                  Patient
                  {sortBy === "id" && (
                    <Box ml={4}>{reverseSortDirection ? "▲" : "▼"}</Box>
                  )}
                </Box>
              </Box>
            </Flex>

            <Flex w={{ base: "90px", md: "148px" }}>
              <Box w="148px">
                <Box onClick={() => setSorting("date")} style={styles}>
                  Last Visit
                  {sortBy === "date" && (
                    <Box ml={4}>{reverseSortDirection ? "▲" : "▼"}</Box>
                  )}
                </Box>
              </Box>
            </Flex>

            <Box w="96px">
              <Box onClick={() => setSorting("doctor")} style={styles}>
                Doctors
                {sortBy === "doctor" && (
                  <Box ml={4}>{reverseSortDirection ? "▲" : "▼"}</Box>
                )}
              </Box>
            </Box>

            <Box w="106px">
              <Box onClick={() => setSorting("treatment")} style={styles}>
                Treatment
                {sortBy === "treatment" && (
                  <Box ml={4}>{reverseSortDirection ? "▲" : "▼"}</Box>
                )}
              </Box>
            </Box>

            {/* Status column */}
            <Box w="110px">
              <Box onClick={() => setSorting("status")} style={styles}>
                Status
                {sortBy === "status" && (
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
