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

const StaffPage = () => {
  const { sortBy, order } = useSortStore();
  const pagination = usePaginationtStore();
  const { data, isFetched } = useStaffList(false, sortBy, order);
  const navigate = useNavigate();
  // console.log(data);
  const [selection, setSelection] = useState<string[]>([]);

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
  const handleSearchChange = (e: string) => {
    pagination.setSearchKey(e);
  };

  const rows = data?.map((item) => (
    <TableBody
      onClick={() => navigate(`/employee/details/${item._id}`)}
      selection={selection}
      setSelection={setSelection}
      key={item._id}
      th0={item._id.toString()}
      th1={item.name}
      th2={item.contactInfos.map((item) =>
        item.type === "email" ? item.value : ""
      )}
      th3={item.departmentId}
      th4={item.employeeType}
      th5={item.isActive.toString()}
      // th2={item.contact}
      // th3={item.department}
      // th4={item.role}
      // th5={item.status}
    />
  ));

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
          <SearchInput
            searchValue={pagination.paramKey}
            setSearchValue={handleSearchChange}
            text="Search "
          />
          <Flex justify="end" hiddenFrom="sm">
            <AddButton
              text="Add Staff"
              handleOnClick={() => navigate(`/employee/add`)}
            />
          </Flex>
        </Flex>
        <Box style={{ height: "80vh", overflow: "auto" }}>
          <Table>
            <TableHead
              labels={[
                "Staff Id",
                "Staff Name",
                "Contact Info",
                "department",
                "Role",
                "Status",
                "User",
              ]}
              sortedBy={[
                "_id",
                "name",
                "contactInfos",
                "departmentId",
                "employeeType",
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
