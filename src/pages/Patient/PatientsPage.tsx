import { useState } from "react";
import { Table, Flex, Center, Text, Box } from "@mantine/core";
import TableBody from "../../Components/Table/TableBody";
import TableHead from "../../Components/Table/TableHead";
import { useNavigate } from "react-router";
import usePatientsList from "../../hooks/patient/usePatientsList";
import useSortStore from "../../hooks/useSortStore ";
import CustomPagination from "../../Components/Pagination/Pagination";
import usePaginationtStore from "../../store/Pagination/usePaginationtStore";
import { SearchInput } from "../../Components/SearchInput";

const PatientsPage = () => {
  const { sortBy, order } = useSortStore();
  const pagination = usePaginationtStore();
  const { data, isFetched } = usePatientsList(false, sortBy, order);
  console.log(data);
  const [selection, setSelection] = useState<string[]>([]);
  const navigate = useNavigate();

  if (!data) return null;

  const toggleAll = () => {
    setSelection((current) =>
      current.length === data?.length
        ? []
        : data.map((item) => {
            return item._id;
          })
    );
  };
  const handleSearchChange = (e: string) => {
    pagination.setSearchKey(e);
  };
  const rows = data?.map((item) => (
    <TableBody
      onClick={() => navigate(`/patients/details/${item._id}`)}
      key={item._id}
      th0={item._id}
      th1={item.name}
      // th2={item.date}
      // th3={item.doctor}
      // th4={item.treatment}
      // th5={item.status}
      th2={item.dateOfBirth.slice(0, 10)}
      th3={item.gender}
      th4={item.dateOfBirth.slice(0, 10)}
      th5={item.isActive.toString()}
      selection={selection}
      setSelection={setSelection}
    />
  ));

  if (!isFetched)
    return (
      <Center>
        <Text>No Patients Found</Text>
      </Center>
    );
  else
    return (
      <Flex w="95%" h="85vh" direction="column">
        <SearchInput
          text="Search"
          searchValue={pagination.paramKey}
          setSearchValue={handleSearchChange}
        />
        <Box style={{ height: "80vh", overflow: "auto" }}>
          <Table>
            <TableHead
              labels={[
                "Patint Id",
                "Name",
                "Last Visist ",
                "Doctors",
                "Treatment",
                "status",
                "Patient",
              ]}
              data={data}
              selection={selection}
              toggleAll={toggleAll}
              sortedBy={[
                "_id",
                "name",
                "dateOfBirth",
                "gender",
                "address",
                "dateOfBirth",
                "isActive",
                "_id",
              ]}
            />
            {rows}
          </Table>
          <CustomPagination store={pagination} />
        </Box>
      </Flex>
    );
};

export default PatientsPage;
