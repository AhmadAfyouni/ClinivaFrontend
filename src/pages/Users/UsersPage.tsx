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

const UsersPage = () => {
  const [selection, setSelection] = useState<string[]>([]);
  const { sortBy, order } = useSortStore();
  const pagination = usePaginationtStore();

  const { data, isFetched } = useUsersList(false, sortBy, order);
  const navigate = useNavigate();

  if (!data) return null;
  const handleSearchChange = (event: string) => {
    pagination.setSearchKey(event);
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
      th4={item.roleIds.toString()}
      th5={item.isActive.toString()}
      // th2={new Date(item.createdDate).toLocaleString("en-US", {
      //   year: "numeric",
      //   month: "numeric",
      //   day: "numeric",
      //   hour: "2-digit",
      //   minute: "2-digit",
      //   hour12: true,
      // })}
      // th3={item.email}
      // th4={item.role}
      // th5={item.status}
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
          <SearchInput
            text="Search User"
            searchValue={pagination.paramKey}
            setSearchValue={handleSearchChange}
          />
          <Flex justify="end">
            <AddButton
              text="Add User"
              handleOnClick={() => navigate(`/users/add`)}
            />
            {/* <MobileFilters /> */}
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
                "roleIds",
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
