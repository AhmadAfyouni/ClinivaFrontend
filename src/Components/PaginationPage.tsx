import {
  Select,
  Text,
  Group as MantineGroup,
  Grid,
  Pagination,
  ComboboxItem,
  useMantineTheme,
} from "@mantine/core";
interface Props {
  itemsPerPage: string | null;
  totalItems: number;
  setItemsPerPage: (value: string | null, option: ComboboxItem) => void;
  totalPages: number;
  activePage: number;
  setActivePage: (item: number) => void;
}
const PaginationPage = ({
    itemsPerPage,
    setItemsPerPage,
    totalItems,
    totalPages,
    activePage,
    setActivePage,
}: Props) => {
    const theme = useMantineTheme()
    return(
  <Grid gutter="lg">
    <Grid.Col span={{ base: 6, xs: 0, md: 6 }}>
      <MantineGroup align="center" justify="flex-start" mb="md">
        <Text size="sm" c={theme.other.onSurfaceSecondary}>
          Showing
        </Text>
        <Select
          placeholder="10"
          w="70px"
          c={theme.other.onSurfaceTertiary}
          size="xs"
          value={itemsPerPage?.toString()}
          onChange={setItemsPerPage}
          data={[
            { value: "5", label: "5" },
            { value: "10", label: "10" },
            { value: "20", label: "20" },
            { value: "25", label: "25" },
            { value: "30", label: "30" },
          ]}
          styles={{
            input: {
              backgroundColor: theme.colors.myPrimary[2],
              border: "none",
              borderRadius: "999px",
              fontWeight: 500,
              textAlign: "center",
            },
          }}
        />
        <Text size="sm" c={theme.other.onSurfaceSecondary}>out of {totalItems}</Text>
      </MantineGroup>
    </Grid.Col>

    <Grid.Col span={{ base: 12, xs: 6, md: 6 }}>
      <MantineGroup align="center" justify="flex-end" mb="md">
      <Pagination
        total={totalPages}
        value={activePage}
        onChange={setActivePage}
        size="sm"
        radius="xl"
        styles={{
          root: {
            gap: "4px",
          },
          control: {
            border: "none",
            fontWeight: 400,
            
          },
        }}
      />
      </MantineGroup>
    </Grid.Col>
  </Grid>)
};

export default PaginationPage;
