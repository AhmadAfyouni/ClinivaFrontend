import { Box, Flex, Table, useMantineTheme } from "@mantine/core";
import useSortStore from "../../hooks/useSortStore ";
import { useTranslation } from "react-i18next";
interface Props<T> {
  selection: string[];
  data?: T[];
  labels: string[];
  toggleAll: () => void;
  sortedBy: string[];
}
const TableHead = <T,>({
  labels,
  sortedBy,
}: 
Props<T>) => {
  const theme = useMantineTheme();
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
    color: theme.other.onSurfacePrimary,
  };
  return (
    <Table.Thead
      bg={theme.other.bg}
      m="0 10px"
      style={{
        position: "sticky",
        top: 0,
        backgroundColor: "white",
        zIndex: 1,
      }}
    >
      <Table.Tr>
        <Table.Th p={0} colSpan={6} w="100%" h={14}>
          <Flex w="100%" justify="space-between" p="15px 20px">
            <Box w="70px">
              <Box style={styles}>
                {t(labels[0])}
              </Box>
            </Box>
            <Box w="160px">
              <Box style={styles}>
                {t(labels[1])}
              </Box>
            </Box>
           

            <Flex w={{ base: "90px", md: "148px" }}>
              <Box w="148px">
                <Box style={styles} onClick={() => handleSort(sortedBy[2])}>
                  {t(labels[2])}
                  {sortBy === sortedBy[2] && (order === "asc" ? "▲" : "▼")}
                </Box>
              </Box>
            </Flex>

            <Box w="110px" onClick={() => handleSort(sortedBy[3])}>
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

            <Box w="110px">
              <Box style={styles}>{t(labels[5])}</Box>
            </Box>
          </Flex>
        </Table.Th>
      </Table.Tr>
    </Table.Thead>
  );
};

export default TableHead;
