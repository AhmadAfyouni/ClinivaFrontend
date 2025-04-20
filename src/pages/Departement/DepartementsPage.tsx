import { useState } from "react";
import TableHead from "../../Components/Table/TableHead";
import { Box, Center, Flex, Table, Text } from "@mantine/core";
import TableBody from "../../Components/Table/TableBody";
import { SearchInput } from "../../Components/SearchInput";
import AddButton from "../../Components/AddButton";
import useSortStore from "../../hooks/useSortStore ";
import { useNavigate } from "react-router";
import CustomPagination from "../../Components/Pagination/Pagination";
import usePaginationtStore from "../../store/Pagination/usePaginationtStore";
import useDepatementsList from "../../hooks/departement/useDepartementsList";
import CustomFilters from "../../Components/filters/CustomFilters";

const DepartementsPage = () => {
  const pagination = usePaginationtStore();
  const { sortBy, order } = useSortStore();
  const { data, isFetched } = useDepatementsList(false, sortBy, order);

  const navigate = useNavigate();
  const [selection, setSelection] = useState<string[]>([]);

  const handleSearchChange = (event: string) => {
    pagination.setSearchKey(event);
  };

  if (!data) return null;

  const toggleAll = () => {
    setSelection((current) =>
      current.length === data.length
        ? []
        : data.map((item) => {
            return item._id.toString();
          })
    );
  };

  const PICOptions = [""];
  const handlPICChange = (e: string | null) => {
    console.log(e);
  };
  const rows = data.map((item) => (
    <TableBody
      onClick={() => navigate(`/departement/details/${item._id}`)}
      selection={selection}
      setSelection={setSelection}
      key={item._id}
      th0={item._id}
      th1={item.name}
      th2={item.address}
      th3={item.address}
      th4={item.clinicCount.toString()}
      th5={item.requiredStaff.toString()}
      // th1={item.ComplexName}
      // th2={item.PIC}
      // th3={item.Address}
      // th4={item.DepartmentsCount.toString()}
      // th5={item.StaffCount.toString()}
    />
  ));

  if (!isFetched)
    return (
      <Center>
        <Text>No Departements Found</Text>
      </Center>
    );
  else
    return (
      <Flex direction="column">
        <Flex w="90%" justify="space-between">
          <Flex>
            <SearchInput
              text="Search MedicalComplex"
              searchValue={pagination.paramKey}
              setSearchValue={handleSearchChange}
            />
            <CustomFilters
              IsDropDown1={true}
              placeHolderDropDown1="PIC"
              OptionsDropDown1={PICOptions}
              handlDropDownChange1={handlPICChange}
            />
          </Flex>
          <AddButton
            text="Add MedicalComplex"
            handleOnClick={() => navigate(`/departement/add`)}
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
                "clinicCount",
                "patientCount",
                "_id",
              ]}
              labels={[
                "Medical Id",
                "Medical Name",
                "PIC",
                "Address",
                "DepartmentsCount",
                "PatientCount",
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

export default DepartementsPage;
