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
import AddButton from "../../Components/AddButton";
import CustomFilters from "../../Components/filters/CustomFilters";
import useDropDownStore from "../../store/Dropdown/useDropDownStore ";

const PatientsPage = () => {
  const { sortBy, order } = useSortStore();
  const pagination = usePaginationtStore();
  const { data, isFetched } = usePatientsList(false, sortBy, order);
  const { setSelectedOption } = useDropDownStore();
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
  const statusOptionsboolean = [true, false];
  const statusOptions = statusOptionsboolean.map((item) =>
    item
      ? { label: "ACTIVE", value: true }
      : { label: "INACTIVE", value: false }
  );
  const handlStatusChange = (e: string | null) => {
    const value = statusOptions.find((item) => item.label === e)?.value ?? null;
    setSelectedOption("PatStatus", e);
    pagination.setFilter(value);
  };
  const handleSearchChange = (e: string) => {
    pagination.setSearchKey(e);
  };

  const handleDateChange = (e: Date | null) => {
    const date = e;
    if (date && !isNaN(date.getTime())) {
      console.log(date.getMonth());
      const month = String(date.getDate()).padStart(2, "0");
      const day = String(date.getMonth() + 1).padStart(2, "0"); // month (0-indexed, so add +1) (month)
      const year = date.getFullYear();
      const formattedDate = `${day}-${month}-${year}`;

      pagination.setDate(formattedDate);
    } else {
      pagination.setDate("");
    }
  };
  const rows = data?.map((item) => (
    <TableBody
      onClick={() => navigate(`/patients/details/${item._id}`)}
      key={item._id}
      th0={item._id}
      th1={item.name}
      th2={item.dateOfBirth.slice(0, 10)}
      th3={item.gender}
      th4={item.lastVisit ? item.lastVisit.slice(0, 10) : "no date"} //Last visit
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
        <Flex justify="space-between">
          <Flex>
            <SearchInput
              text="Search"
              searchValue={pagination.paramKey}
              setSearchValue={handleSearchChange}
            />
            <CustomFilters
              IsDateInput={true}
              IsDropDown1={true}
              dropdownName1="PatStatus"
              OptionsDropDown1={statusOptions.map((item) => item.label)}
              handlDropDownChange1={handlStatusChange}
              placeHolderDropDown1="Status"
              handleDateChange={handleDateChange}
              vlaueDateInput={
                pagination.date ? new Date(pagination.date) : null
              }
            />
          </Flex>
          <AddButton
            text="Add Patient"
            handleOnClick={() => navigate(`/patients/add`)}
          />
        </Flex>
        <Box style={{ height: "80vh", overflow: "auto" }}>
          <Table>
            <TableHead
              labels={[
                "Patint Id",
                "Name",
                "Birthday",
                "Gender",
                "Last Visist ",
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
                "lastVisit",
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
