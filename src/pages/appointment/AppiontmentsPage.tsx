import { useState } from "react";
import { Table, Flex, Center, Text, Box } from "@mantine/core";
import TableBody from "../../Components/Table/TableBody";
import TableHead from "../../Components/Table/TableHead";
import useSortStore from "../../hooks/useSortStore ";
import CustomPagination from "../../Components/Pagination/Pagination";
import usePaginationtStore from "../../store/Pagination/usePaginationtStore";
import { SearchInput } from "../../Components/SearchInput";
import useAppointmentsList from "../../hooks/appointment/useAppointmentsList";

const AppointmentsPage = () => {
  const { sortBy, order } = useSortStore();
  const pagination = usePaginationtStore();
  const { data, isFetched } = useAppointmentsList(false, sortBy, order);
  // console.log(data);
  const [selection, setSelection] = useState<string[]>([]);
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
      // onClick={() => navigate(`/appointments/details/${item._id}`)}
      onClick={() => console.log("appointmentDetails")}
      key={item._id}
      th0={item._id}
      th1={item.patient.name}
      th2={`${item.datetime.slice(0, 10)} - ${item.datetime.slice(11, 16)} `}
      th3={item.clinic?.name || ""}
      th4={item.doctor?.name || ""}
      th5={item.status}
      selection={selection}
      setSelection={setSelection}
    />
  ));
  if (!isFetched)
    return (
      <Center>
        <Text>No Appointments Found</Text>
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
                "Appointment Id",
                "patient Name",
                "Last Visist ",
                "Clinic",
                "Doctor",
                "status",
                "Appointment",
              ]}
              data={data}
              selection={selection}
              toggleAll={toggleAll}
              sortedBy={["_id", "datetime"]}
            />
            {rows}
          </Table>
          <CustomPagination store={pagination} />
        </Box>
      </Flex>
    );
};

export default AppointmentsPage;
