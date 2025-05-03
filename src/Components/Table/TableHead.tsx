import { Box, Flex, Table, useMantineTheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import useSortStore from "../../hooks/useSortStore ";
import { useTranslation } from "react-i18next";
interface Props<T> {
  selection: string[];
  data: T[];
  labels: string[];
  toggleAll: () => void;
  sortedBy: string[];
}
const TableHead = <T,>({
  labels,
  sortedBy,
}: // selection,
// toggleAll,
// data,
Props<T>) => {
  const theme = useMantineTheme();
  const isMobile = useMediaQuery("(max-width: 576px)");
  const isTablet = useMediaQuery("(min-width: 577px) and (max-width: 992px)");
  const isComputer = useMediaQuery("(min-width: 993px)");
  const { t } = useTranslation();
  const { sortBy, order, setSortBy, toggleOrder, setOrder } = useSortStore();

  const handleSort = (field: string) => {
    if (field === sortBy) {
      toggleOrder();
    } else {
      setSortBy(field);
      setOrder("asc");
    }
  };

  const styles: React.CSSProperties = {
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    fontWeight: "bold",
    fontSize: "12px",
  };
  return (
    <Table.Thead
      bg={theme.other.bg}
      style={{
        position: "sticky",
        top: 0,
        backgroundColor: "white",
        zIndex: 1,
      }}
    >
      <Table.Tr>
        {/* <Table.Th>
          <Checkbox
            iconColor={theme.other.onSurfacePrimary}
            color={
              selection.length === data.length
                ? theme.other.secondaryColor
                : theme.other.bg
            }
            w="12px"
            h="12px"
            size="12px"
            onChange={toggleAll}
            checked={selection.length === data.length}
            indeterminate={
              selection.length > 0 && selection.length !== data.length
            }
          />
        </Table.Th> */}
        <Table.Th p={0} colSpan={6} w="100%">
          <Flex w="97%" justify="space-between">
            {isComputer && (
              <Flex visibleFrom="md" w="25%" justify="space-between">
                <Box w="70px">
                  <Box style={styles} onClick={() => handleSort(sortedBy[0])}>
                    {t(labels[0])}
                    {sortBy === sortedBy[0] && (order === "asc" ? "▲" : "▼")}
                  </Box>
                </Box>
                <Box w="160px" onClick={() => handleSort(sortedBy[1])}>
                  <Box style={styles}>
                    {t(labels[1])}
                    {sortBy === sortedBy[1] && (order === "asc" ? "▲" : "▼")}
                  </Box>
                </Box>
              </Flex>
            )}

            {/* Mobile Screen */}
            {(isMobile || isTablet) && (
              <Flex w="150px" align="start" hiddenFrom="md">
                <Box w="120px" onClick={() => handleSort(sortedBy[6])}>
                  <Box style={styles}>
                    {t(labels[6])}
                    {sortBy === sortedBy[6] && (order === "asc" ? "▲" : "▼")}
                  </Box>
                </Box>
              </Flex>
            )}

            <Flex w={{ base: "90px", md: "148px" }}>
              <Box w="148px">
                <Box style={styles} onClick={() => handleSort(sortedBy[2])}>
                  {t(labels[2])}
                  {sortBy === sortedBy[2] && (order === "asc" ? "▲" : "▼")}
                </Box>
              </Box>
            </Flex>

            <Box w="96px" onClick={() => handleSort(sortedBy[3])}>
              <Box style={styles}>
                {t(labels[3])}
                {sortBy === sortedBy[3] && (order === "asc" ? "▲" : "▼")}
              </Box>
            </Box>

            <Box w="106px" onClick={() => handleSort(sortedBy[4])}>
              <Box style={styles}>
                {t(labels[4])}
                {sortBy === sortedBy[4] && (order === "asc" ? "▲" : "▼")}
              </Box>
            </Box>

            <Box w="110px" onClick={() => handleSort(sortedBy[5])}>
              <Box style={styles}>
                {t(labels[5])}
                {sortBy === sortedBy[5] && (order === "asc" ? "▲" : "▼")}
              </Box>
            </Box>
          </Flex>
        </Table.Th>
      </Table.Tr>
    </Table.Thead>
  );
};

export default TableHead;
