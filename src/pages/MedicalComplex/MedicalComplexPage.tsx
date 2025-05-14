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
import useDeleteById from "../../hooks/delete/useDeleteById";

const MedicalComplexPage = () => {
  const pagination = usePaginationtStore();
  const { sortBy, order } = useSortStore();
  const { data } = useMedicalComplexList(false, sortBy, order);
  const deleteMedcalComplex = useDeleteById({
    endpoint: "cliniccollections",
    mutationKey: "delete-cliniccollection",
    navigationUrl: "/medicalComplexes",
  });
  const navigate = useNavigate();
  const [selection, setSelection] = useState<string[]>([]);

  const handleSearchChange = (e: string) => {
    pagination.setSearchKey(e);
  };
  const rows = data?.map((item, index) => (
    <TableBody
      // imgUrl={item.logo !== null ? item.logo : ""}
      onClick={() => navigate(`/medicalComplexes/details/${item._id}`)}
      selection={selection}
      setSelection={setSelection}
      key={item._id}
      th0={(pagination.current_page * (index + 1)).toString().padStart(3, "0")}
      th1={item.publicId}
      th2={{ value: item.name }}
      th3={{ value: item.PIC.name}}
      th4={item.employeeCount.toString()}
      onDeleteClick={() => {
        deleteMedcalComplex.mutate(item._id);
        // navigate(`/medicalComplexes`);
      }}
      onEditClick={() => {
        navigate(`/medicalComplexes/edit/${item._id}`);
      }}
    />
  ));

  const toggleAll = () => {
    if (data) {
      setSelection((current) =>
        current.length === data.length
          ? []
          : data.map((item) => {
              return item._id.toString();
            })
      );
    }
  };
  
  if (data?.length === 0)
    return (
      <Center>
        <Text>No MedicalComplex Found</Text>
      </Center>
    );
  else
    return (
      <Flex direction="column">
        <Flex w="97%" justify="space-between">
          <SearchInput
            text="Search"
            searchValue={pagination.paramKey}
            setSearchValue={handleSearchChange}
          />

          <AddButton
            text="addMedicalComplex"
            handleOnClick={() => navigate(`/medicalComplexes/add`)}
          />
        </Flex>
        <Box style={{ height: "80vh", overflow: "auto" }}>
          <Table>
            <TableHead
              sortedBy={[
                "_id",
                "name",
                "PIC",
                "departmentCount",
                "employeeCount",
                "_id",
              ]}
              labels={[
                "No",
                "MedicalComplex Id",
                "MedicalComplex name",
                "PIC",
                "departmentsCount",
                "Actions",
                "medicalcomplex",
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
