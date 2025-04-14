import { useEffect, useState } from "react";
import TableHead from "../../Components/Table/TableHead";
import { Center, Flex, ScrollArea, Table, Text } from "@mantine/core";
import TableBody from "../../Components/Table/TableBody";
// import Dropdown from "../../Components/Dropdown";
import { SearchInput } from "../../Components/SearchInput";
import AddButton from "../../Components/AddButton";
import MobileFilters from "../../Components/mobliefilters";
import useStaffList from "../../hooks/staff/useStaffList";
import useSortStore from "../../hooks/useSortStore ";

const StaffPage = () => {
  const { data, isFetched } = useStaffList();
  // console.log(data);
  const [search, setSearch] = useState("");
  const [selection, setSelection] = useState<string[]>([]);
  console.log(search);

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

  // const [role, setRole] = useState<string | null>(null);
  // const [department, setDepartment] = useState<string | null>(null);

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

  // const statusOptions = [...new Set(data.map((p) => p.department))]
  //   .map((d) => ({ value: d, label: d }))
  //   .map((option) => option.value);

  // const roleOptions = [...new Set(data.map((p) => p.role))]
  //   .map((t) => ({ value: t, label: t }))
  //   .map((option) => option.value);

  // const handleChangDropDownRole = (e: string | null) => {
  //   setRole(e);
  // };
  // const handleChangDropDownDepartment = (e: string | null) => {
  //   setDepartment(e);
  // };

  const rows = data?.map((item) => (
    <TableBody
      onClick={() => console.log("hee")}
      selection={selection}
      setSelection={setSelection}
      key={item._id}
      th0={item._id.toString()}
      // th0={item.staffId.toString()}
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
      <>
        <Flex w="90%" justify="space-between">
          <Flex justify="start" visibleFrom="sm">
            {/* <Dropdown
            onChange={handleChangDropDownRole}
            options={roleOptions}
            placeHolder="Role"
          />
          <Dropdown
            onChange={handleChangDropDownDepartment}
            options={statusOptions}
            placeHolder="Department"
          /> */}
          </Flex>
          <SearchInput
            text="Search Staff"
            searchValue={search}
            setSearchValue={setSearch}
          />
          <Flex justify="end" hiddenFrom="sm">
            <AddButton text="Add Staff" />
            <MobileFilters />
          </Flex>
        </Flex>
        <ScrollArea>
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
              sortedBy={["_id", "name", "contactInfos", "", ""]}
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

export default StaffPage;
