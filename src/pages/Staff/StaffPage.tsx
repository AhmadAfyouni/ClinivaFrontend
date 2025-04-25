import { useState } from "react";
import TableHead from "../../Components/Table/TableHead";
import { Box, Center, Flex, Table, Text } from "@mantine/core";
import TableBody from "../../Components/Table/TableBody";
import { SearchInput } from "../../Components/SearchInput";
import AddButton from "../../Components/AddButton";
import useStaffList from "../../hooks/staff/useStaffList";
import useSortStore from "../../hooks/useSortStore ";
import { useNavigate } from "react-router";
import usePaginationtStore from "../../store/Pagination/usePaginationtStore";
import CustomPagination from "../../Components/Pagination/Pagination";
import CustomFilters from "../../Components/filters/CustomFilters";
import useDepatementsList from "../../hooks/departement/useDepartementsList";
import useDropDownStore from "../../store/Dropdown/useDropDownStore ";

const StaffPage = () => {
  const { sortBy, order } = useSortStore();
  const pagination = usePaginationtStore();
  const { data: departments } = useDepatementsList(true);
  const deps = Array.from(new Set(departments?.map((item) => item.name)));
  const { data, isFetched } = useStaffList(false, sortBy, order);
  const navigate = useNavigate();
  // console.log(data);
  const { setSelectedOption } = useDropDownStore();
  const [selection, setSelection] = useState<string[]>([]);
  console.log(deps);
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

  const rows = data?.map((item) => (
    <TableBody
      onClick={() => navigate(`/employees/details/${item._id}`)}
      selection={selection}
      setSelection={setSelection}
      key={item._id}
      th0={item._id}
      th1={item.name}
      th2={item.employeeType}
      th3={item.clinicCollectionId !== null ? item.clinicCollectionId.name : ""}
      th4={item.departmentId !== null ? item.departmentId.name : ""}
      th5={item.isActive.toString()}
    />
  ));

  const statusOptionsboolean = [true, false];
  const statusOptions = statusOptionsboolean.map((item) =>
    item
      ? { label: "ACTIVE", value: true }
      : { label: "INACTIVE", value: false }
  );

  const handleSearchChange = (e: string) => {
    pagination.setSearchKey(e);
  };
  const handlStatusChange = (e: string | null) => {
    const value = statusOptions.find((item) => item.label === e)?.value ?? null;
    pagination.setFilter(value);
    setSelectedOption("StaStatus", e);
  };

  if (!isFetched || !data)
    return (
      <Center>
        <Text>No Staff Found</Text>
      </Center>
    );
  else
    return (
      <Flex w="100%" direction="column">
        <Flex w="100%" justify="space-between">
          <Flex>
            <SearchInput
              searchValue={pagination.paramKey}
              setSearchValue={handleSearchChange}
              text="Search "
            />
            <CustomFilters
              IsDropDown1={true}
              placeHolderDropDown1="Status"
              dropdownName1="StaStatus"
              OptionsDropDown1={statusOptions.map((item) => item.label)}
              handlDropDownChange1={handlStatusChange}
              IsDropDown2={true}
              placeHolderDropDown2={"department"}
              OptionsDropDown2={deps}
              handlDropDownChange2={handlStatusChange}
            />
          </Flex>
          <AddButton
            text="Add Staff"
            handleOnClick={() => navigate(`/employee/add`)}
          />
        </Flex>
        <Box style={{ height: "80vh", overflow: "auto" }}>
          <Table>
            <TableHead
              labels={[
                "Staff Id",
                "Staff Name",
                "Job Title",
                "MedicalComplex",
                "Departement",
                "Status",
                "Staff",
              ]}
              sortedBy={[
                "_id",
                "name",
                "employeeType",
                "clinicCollectionId.name",
                "departmentId.name",
                "isActive",
                "_id",
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

export default StaffPage;
