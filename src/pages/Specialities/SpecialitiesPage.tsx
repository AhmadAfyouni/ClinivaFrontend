import { useState } from "react";
import TableHead from "../../Components/Table/TableHead";
import { Box, Center, Flex, Table, Text } from "@mantine/core";
import TableBody from "../../Components/Table/TableBody";
import { SearchInput } from "../../Components/SearchInput";
import AddButton from "../../Components/AddButton";
import useSpecialization from "../../hooks/Specialization/useSpecializations";
import usePaginationtStore from "../../store/Pagination/usePaginationtStore";
import useSortStore from "../../hooks/useSortStore ";
import CustomPagination from "../../Components/Pagination/Pagination";

const SpecialitiesPage = () => {
  const pagination = usePaginationtStore();
  const { sortBy, order } = useSortStore();
  const { data, isFetched } = useSpecialization(false, sortBy, order);
  console.log(data);
  const [selection, setSelection] = useState<string[]>([]);
  if (!data) return null;
  const handleSearchChange = (event: string) => {
    pagination.setSearchKey(event);
  };

  const toggleAll = () => {
    setSelection((current) =>
      current.length === data.length
        ? []
        : data.map((item) => {
            return item._id.toString();
          })
    );
  };

  const rows = data.map((item) => (
    <TableBody
      onClick={() => console.log("there is no speciality details page")}
      selection={selection}
      setSelection={setSelection}
      key={item._id}
      th0={item._id}
      th1={item.name}
      th2={item.createdAt}
      th3={item.updatedAt.slice(0, 10)}
      th4={item.statistics.doctors.toString()}
      th5={item.isActive.toString()}
    />
  ));

  if (!isFetched || !data)
    return (
      <Center>
        <Text>No Specialties Found</Text>
      </Center>
    );
  else
    return (
      <>
        <Flex w="90%" justify="space-between">
          <SearchInput
            text="Search Speciality"
            searchValue={pagination.paramKey}
            setSearchValue={handleSearchChange}
          />
          <AddButton
            text="Add Speciality"
            handleOnClick={() => console.log("speciality")}
          />
        </Flex>
        <Box style={{ height: "80vh", overflow: "auto" }}>
          <Table>
            <TableHead
              sortedBy={[
                "_id",
                "name",
                "createdAt",
                "updatedAt",
                "doctors",
                "isActive",
                "_id",
              ]}
              labels={[
                "Speciality Id",
                "Speciality Name",
                "AssignedClinics",
                "LastUpdate",
                "DoctorsNumber",
                "Status",
                "Speciality",
              ]}
              data={data}
              selection={selection}
              toggleAll={toggleAll}
            />
            {rows}
          </Table>
          <CustomPagination store={pagination} />
        </Box>
      </>
    );
};

export default SpecialitiesPage;
