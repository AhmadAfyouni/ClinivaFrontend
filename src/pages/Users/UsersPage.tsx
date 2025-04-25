import { useState } from "react";
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

const UsersPage = () => {
  const [selection, setSelection] = useState<string[]>([]);
  const { sortBy, order } = useSortStore();
  const pagination = usePaginationtStore();
  const { setSelectedOption } = useDropDownStore();
  const { data, isFetched } = useUsersList(false, sortBy, order);
  const navigate = useNavigate();

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
  const toggleAll = () => {
    setSelection((current) =>
      current.length === data.length
        ? []
        : data.map((item) => {
            return item._id;
          })
    );
  };

  const rows = data.map((item) => (
    <TableBody
      onClick={() => navigate(`/users/details/${item._id}`)}
      selection={selection}
      setSelection={setSelection}
      key={item._id}
      th0={item._id}
      th1={item.name}
      th2={new Date(item.lastLoginAt).toLocaleString("en-US", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })}
      th3={item.email}
      th4={item.roleIds.map((item) => item.name).toString()}
      th5={item.isActive.toString()}
      // th4={item.role}
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
        <Flex w="90%" justify="space-between">
          <Flex>
            <SearchInput
              text="Search User"
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
          <Flex justify="end">
            <AddButton
              text="Add User"
              handleOnClick={() => navigate(`/users/add`)}
            />
          </Flex>
        </Flex>
        <Box style={{ height: "80vh", overflow: "auto" }}>
          <Table>
            <TableHead
              labels={[
                "User Id",
                "User Name",
                "Created Date",
                "Email",
                "Role",
                "Status",
                "User",
              ]}
              sortedBy={[
                "_id",
                "name",
                "lastLoginAt",
                "email",
                "roleIds.name",
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

export default UsersPage;
