import { useEffect, useState } from "react";
import TableHead from "../../Components/Table/TableHead";
import { Center, Flex, ScrollArea, Table, Text } from "@mantine/core";
import TableBody from "../../Components/Table/TableBody";
// import Dropdown from "../../Components/Dropdown";
import { SearchInput } from "../../Components/SearchInput";
import AddButton from "../../Components/AddButton";
import MobileFilters from "../../Components/mobliefilters";
import useUsersList from "../../hooks/users/useUsersList";
import useSortStore from "../../hooks/useSortStore ";

const UsersPage = () => {
  const { data, isFetched } = useUsersList();
  const [search, setSearch] = useState("");
  const [selection, setSelection] = useState<string[]>([]);
  const { sortBy, order, setSortBy, setOrder } = useSortStore();

  useEffect(() => {
    setOrder(order);
    setSortBy(sortBy);

    // if (role) {
    //   result = result.filter((p) => p.role === role);
    // }
    // setRole(role);
  }, [order, sortBy]);

  // const [role, setRole] = useState<string | null>(null);
  // const [status, setStatus] = useState<string | null>(null);

  if (!data) return null;
  const handleSearchChange = (event: string) => {
    const value = event;
    setSearch(value);
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

  // const statusOptions = [...new Set(data.map((p) => p.status))]
  //   .map((d) => ({ value: d, label: d }))
  //   .map((option) => option.value);

  // const roleOptions = [...new Set(data.map((p) => p.role))]
  //   .map((t) => ({ value: t, label: t }))
  //   .map((option) => option.value);
  // const handleChangDropDownRole = (e: string | null) => {
  //   setRole(e);
  // };
  // const handleChangDropDownStatus = (e: string | null) => {
  //   setStatus(e);
  // };

  // useEffect(() => {
  //   let result = [...data];
  //   if (status) {
  //     result = result.filter((p) => p.status === status);
  //   }

  //   if (role) {
  //     result = result.filter((p) => p.role === role);
  //   }
  //   setStatus(status);
  //   setRole(role);
  //   setSortedData(result);
  // }, [status, role]);

  const rows = data.map((item) => (
    <TableBody
      onClick={() => console.log("userpage")}
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
        <Text>No Userd Found</Text>
      </Center>
    );
  else
    return (
      <>
        <Flex w="90%" justify="space-between">
          <Flex justify="start" visibleFrom="sm">
            {/* <Dropdown
            onChange={handleChangDropDownRole}
            options={roleOptions}
            placeHolder="Role"
          />
          <Dropdown
            onChange={handleChangDropDownStatus}
            options={statusOptions}
            placeHolder="Status"
          /> */}
          </Flex>
          <SearchInput
            text="Search User"
            searchValue={search}
            setSearchValue={handleSearchChange}
          />
          <Flex justify="end" hiddenFrom="sm">
            <AddButton text="Add User" />
            <MobileFilters />
          </Flex>
        </Flex>
        <ScrollArea>
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
              sortedBy={["_id", "name", "lastLoginAt", "", ""]}
              data={data}
              selection={selection}
              toggleAll={toggleAll}
            />
            {rows}
          </Table>
        </ScrollArea>
      </>
    );
};

export default UsersPage;
