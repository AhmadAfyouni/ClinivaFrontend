import { useState } from "react";
import { Table, Flex, Center, Text, Box } from "@mantine/core";
import TableBody from "../../Components/Table/TableBody";
import TableHead from "../../Components/Table/TableHead";
import useSortStore from "../../hooks/useSortStore ";
import CustomPagination from "../../Components/Pagination/Pagination";
import usePaginationtStore from "../../store/Pagination/usePaginationtStore";
import { SearchInput } from "../../Components/SearchInput";
import useAppointmentsList from "../../hooks/appointment/useAppointmentsList";
import CustomFilters from "../../Components/filters/CustomFilters";
import AddButton from "../../Components/AddButton";
import { useNavigate } from "react-router";
import useDropDownStore from "../../store/Dropdown/useDropDownStore ";
import { useDeleteDialogStore } from "../../store/useDeleteDialogStore";
import DeleteConfirmationDialog from "../DeleteWithDialog";
import useDeleteById from "../../hooks/delete/useDeleteById";
import { useQueryClient } from "@tanstack/react-query";
/**/
function formatDateToCustom(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}
const AppointmentsPage = () => {
  
  const { sortBy, order } = useSortStore();
  const pagination = usePaginationtStore();
  const { data, isFetched } = useAppointmentsList(false, sortBy, order);
  const [selection, setSelection] = useState<string[]>([]);
  const navigate = useNavigate();

  const { setSelectedOption } = useDropDownStore();
  const queryClient = useQueryClient();
  const [selectedId, setSelectedId] = useState<string | null>(null);
    const { isOpen, openDialog, closeDialog } = useDeleteDialogStore();

    const deleteRow = useDeleteById({
    endpoint: "appointments",
    mutationKey: "delete-appointment",
    navigationUrl: "/appointments",
  });

  const handleDeleteItem = (id: string) => {
    console.log('sss');
    
    deleteRow.mutate(id, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["users"] });
        setSelectedId(null);
        closeDialog();
      },
    });
  };
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

  const statusOptions = ["scheduled", "cancelled", "completed"];

  const handlStatusChange = (e: string | null) => {
    // console.log(pagination.filter);
    setSelectedOption("AppStatus", e);
    pagination.setFilter(e);
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

  
  const rows = data?.map((item, index) => (
    
    <TableBody
      // imgUrl={item.logo !== null ? item.logo : ""}
      // onClick={() => navigate(`/appointments/details/${item._id}`)}
      onClick={() => console.log("appointmentDetails")}
      key={item._id}
      th0={(pagination.current_page * (index + 1)).toString().padStart(3, "0")}
      // th1={item.patient?.name || ""}
      th1={item?.publicId || ""}
      th2={{
        value: `${formatDateToCustom(item.datetime)} - ${item.datetime.slice(11, 16)}`,
      }}
      th3={{ value: item.clinic?.name || "" }}
      // th4={item.doctor?.name || ""}
      th4={item?.status || ""}
      // th5={item.status || ""}
      // selection={selection}
      // setSelection={setSelection}
     onDeleteClick={() => {
        setSelectedId(item._id);
        openDialog();
      }}
      onEditClick={() => console.log("edit")}
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
        <Flex justify="space-between">
          <Flex>
            <SearchInput
              text="Search"
              searchValue={pagination.paramKey}
              setSearchValue={handleSearchChange}
            />
            <CustomFilters
              IsDropDown1={true}
              IsDateInput={true}
              dropdownName1="AppStatus"
              OptionsDropDown1={statusOptions}
              handlDropDownChange1={handlStatusChange}
              placeHolderDropDown1="Status"
              vlaueDateInput={
                pagination.date ? new Date(pagination.date) : null
              }
              handleDateChange={handleDateChange}
            />
          </Flex>
          <AddButton
            handleOnClick={() => navigate(`/appointments/add`)}
            text="add appointment"
          />
        </Flex>
        <Box style={{ height: "80vh", overflow: "auto" }}>
          <Table>
            <TableHead
              labels={[
                "No",
                "Appointment ID",
                "Date and Time ",
                "Clinic",
                "Status",
                "Actions",
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
        <DeleteConfirmationDialog
          opened={isOpen}
          onClose={() => {
            setSelectedId(null);
            closeDialog();
          }}
          onConfirm={(id) => {
            console.log(id);
            handleDeleteItem(id!)
            
          }}
          itemId={selectedId!}
        />
      </Flex>
    );
};

export default AppointmentsPage;
