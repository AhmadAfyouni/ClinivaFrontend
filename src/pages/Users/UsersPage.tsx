import { useEffect, useState } from "react";
import TableHead from "../../Components/Table/TableHead";
import { Box, Center, Flex, Table, Text } from "@mantine/core";
import TableBody from "../../Components/Table/TableBody";
import { SearchInput } from "../../Components/SearchInput";
import AddButton from "../../Components/AddButton";
import useSortStore from "../../hooks/useSortStore ";
import CustomPagination from "../../Components/Pagination/Pagination";
import { useNavigate } from "react-router";
import usePaginationtStore from "../../store/Pagination/usePaginationtStore";
import useUsersList from "../../hooks/users/useUsersList";
import CustomFilters from "../../Components/filters/CustomFilters";
import useDropDownStore from "../../store/Dropdown/useDropDownStore ";
import useDeleteById from "../../hooks/delete/useDeleteById";
import { useHasPermission } from "../../hooks/permission/useHasPermission";
import { useDeleteDialogStore } from "../../store/useDeleteDialogStore";
import DeleteConfirmationDialog from "../DeleteWithDialog";
import { useQueryClient } from "@tanstack/react-query";

const UsersPage = () => {
  const queryClient = useQueryClient();
  const canCreateUser = useHasPermission(["admin", "user_create"]);
  console.log("canCreateUser " + canCreateUser);
  const [selection, setSelection] = useState<string[]>([]);
  const { sortBy, order } = useSortStore();
  const pagination = usePaginationtStore();
  const { setSelectedOption } = useDropDownStore();
  const { isOpen, openDialog, closeDialog } = useDeleteDialogStore();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const { data, isFetched } = useUsersList(false, sortBy, order);
  const navigate = useNavigate();
  const deleteUser = useDeleteById({
    endpoint: "users",
    mutationKey: "delete-user",
    navigationUrl: "/users",
  });
  useEffect(() => {
    return () => {
      closeDialog();
      setSelectedId(null);
    };
  }, []);
  if (!data) return null;
  const handleSearchChange = (event: string) => {
    pagination.setSearchKey(event);
  };

  const statusOptionsboolean = [true, false];
  const statusOptions = statusOptionsboolean.map((item) =>
    item
      ? { label: "ACTIVE", value: true }
      : { label: "INACTIVE", value: false }
  );
  const handlStatusChange = (e: string | null) => {
    setSelectedOption("useStatus", e);
    const value = statusOptions.find((item) => item.label === e)?.value ?? null;
    pagination.setFilter(value);
  };
  const handleDateChange = (e: Date | null) => {
    const date = e;
    if (date && !isNaN(date.getTime())) {
      const month = String(date.getDate()).padStart(2, "0");
      const day = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();
      const formattedDate = `${day}-${month}-${year}`;
      pagination.setDate(formattedDate);
    } else {
      pagination.setDate(undefined);
    }
  };

  const toggleAll = () => {
    setSelection((current) =>
      current.length === data.length
        ? []
        : data.map((item) => {
            return item._id;
          })
    );
  };

  const handleDeleteItem = (id: string) => {
    deleteUser.mutate(id, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["users"] });
        setSelectedId(null);
        closeDialog();
      },
    });
  };
  const rows = data.map((item, index) => (
    <TableBody
      onClick={() => navigate(`/users/details/${item._id}`)}
      selection={selection}
      setSelection={setSelection}
      key={item._id}
      th0={(pagination.current_page * (index + 1)).toString().padStart(3, "0")}
      th1={item.publicId}
      th2={{ value: item.name }}
      th3={{ value: item.roleIds.map((item) => item.name).toString() }}
      th4={item.isActive.toString()}
      onDeleteClick={() => {
        setSelectedId(item._id);
        openDialog();
      }}
      // onEditClick={() => navigate(`/users/edit/${item._id}`)}
      onEditClick={() => console.log("edit")}
    />
  ));

  if (!isFetched || !data)
    return (
      <Center>
        <Text>No User Found</Text>
      </Center>
    );
  else
    return (
      <Flex direction="column">
        <Flex w="97%" justify="space-between">
          <Flex>
            <SearchInput
              text="Search"
              searchValue={pagination.paramKey}
              setSearchValue={handleSearchChange}
            />
            <CustomFilters
              IsDropDown1={true}
              IsDateInput={true}
              dropdownName1="useStatus"
              OptionsDropDown1={statusOptions.map((item) => item.label)}
              handlDropDownChange1={handlStatusChange}
              placeHolderDropDown1="Status"
              vlaueDateInput={
                pagination.date ? new Date(pagination.date) : null
              }
              handleDateChange={handleDateChange}
            />
          </Flex>
          {canCreateUser && (
            <Flex justify="end">
              <AddButton
                text="Add User"
                handleOnClick={() => navigate(`/users/add`)}
              />
            </Flex>
          )}
        </Flex>
        <Box style={{ height: "80vh", overflow: "auto" }} w="100%">
          <Table>
            <TableHead
              labels={[
                "No",
                "UserID",
                "UserName",
                "Role",
                "Status",
                "Actions",
                "user",
              ]}
              sortedBy={[
                "_id",
                "name",
                "name",
                "roleIds",
                "isActive",
                "email",
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
        <DeleteConfirmationDialog
          opened={isOpen}
          onClose={() => {
            setSelectedId(null);
            closeDialog();
          }}
          onConfirm={(id) => handleDeleteItem(id!)}
          itemId={selectedId!}
        />
      </Flex>
    );
};

export default UsersPage;
