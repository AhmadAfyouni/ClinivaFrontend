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
  console.log(data);
  
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
    const formattedDate = new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);

    pagination.setDate(formattedDate);
  } else {
    pagination.setDate("");
  }
};

  const rows = data?.map((item, index) => (
    <TableBody
      // imgUrl={"https://thisurldoesnotexist.example/image.jpg"}
      onClick={() => navigate(`/patients/details/${item._id}`)}
      key={item._id}
      th0={(pagination.current_page * (index + 1)).toString().padStart(3, "0")}
      th1={item.publicId}
      // th2={item.dateOfBirth.slice(0, 10)}
      th2={{ value: item.name }}
        th3={{
    value: item.lastVisit
      ? new Intl.DateTimeFormat('en-US', {
          year: 'numeric',
          month: 'short',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        }).format(new Date(item.lastVisit))
      : "no date"
  }}
      //  th4={item.lastVisit ? new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: 'numeric' }).format(new Date(item.lastVisit)) : "no date"} // Last visit formatted
       th4={item.isActive.toString()} // Last visit formatted
      // th5={item.isActive.toString()}
      onDeleteClick={() => {
        console.log("delete");
      }}
      onEditClick={() => console.log("edit")}
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
      <Flex w="97%" h="85vh" direction="column">
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
                "No",
                "Patients ID",
                "Name",
                "Last Visit ",
                "Status",
                "Actions",
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
