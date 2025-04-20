import { useState } from "react";
import TableHead from "../../Components/Table/TableHead";
import { Box, Center, Flex, Table, Text } from "@mantine/core";
import TableBody from "../../Components/Table/TableBody";
import { SearchInput } from "../../Components/SearchInput";
import AddButton from "../../Components/AddButton";
import useMedicalComplexList from "../../hooks/medicalcomplex/useMedicalComplexList";
import { useNavigate } from "react-router";
import usePaginationtStore from "../../store/Pagination/usePaginationtStore";
import useSortStore from "../../hooks/useSortStore ";
import CustomPagination from "../../Components/Pagination/Pagination";

const MedicalComplexPage = () => {
  const pagination = usePaginationtStore();
  const { sortBy, order } = useSortStore();
  const { data, isFetched } = useMedicalComplexList(false, sortBy, order);
  console.log(data);

  const navigate = useNavigate();
  const [selection, setSelection] = useState<string[]>([]);

  const handleSearchChange = (e: string) => {
    pagination.setSearchKey(e);
  };
  const rows = data?.map((item) => (
    <TableBody
      onClick={() => navigate(`/medicalComplex/details/${item._id}`)}
      selection={selection}
      setSelection={setSelection}
      key={item._id}
      th0={item._id}
      th1={item.name}
      th2={item.address}
      th3={item.address}
      th4={item.employeeCount.toString()}
      th5={item.departmentCount.toString()}
    />
  ));

  const toggleAll = () => {
    if (data) {
      setSelection((current) =>
        current.length === data.length
          ? []
          : data.map((item) => {
              return item.companyId.toString();
            })
      );
    }
  };
  if (!isFetched || !data)
    return (
      <Center>
        <Text>No MedicalComplex Found</Text>
      </Center>
    );
  else
    return (
      <Flex direction="column">
        <Flex w="90%" justify="space-between">
          <SearchInput
            text="Search "
            searchValue={pagination.paramKey}
            setSearchValue={handleSearchChange}
          />

          <AddButton
            text="Add MedicalComplex"
            handleOnClick={() => navigate(`/medicalComplex/add`)}
          />
        </Flex>
        <Box style={{ height: "80vh", overflow: "auto" }}>
          <Table>
            <TableHead
              sortedBy={[
                "_id",
                "name",
                "address",
                "address",
                "employeeCount",
                "departmentCount",
                "_id",
              ]}
              labels={[
                "MedicalId",
                "Medical Name",
                "PIC",
                "Address",
                "DepartmentsCount",
                "StaffCount",
                "Medical",
              ]}
              data={data}
              selection={selection}
              toggleAll={toggleAll}
            />
            {rows}
          </Table>
          <CustomPagination store={pagination} />
        </Box>
      </Flex>
    );
};

export default MedicalComplexPage;
