import { useEffect, useState } from "react";
import TableHead from "../../Components/Table/TableHead";
import data from "../../data/users.json";
import useSelectionStore from "../../store/useSelectionStore";
import User from "../../types/User";
import { Button, Flex, ScrollArea, Table,Text, useMantineTheme } from "@mantine/core";
import TableBody from "../../Components/Table/TableBody";
import Dropdown from "../../Components/Dropdown";
import { SearchInput } from "../../Components/SearchInput";
import sortData from "../../utilities/SortData";
import PaginationRow from "../../Components/PaginationRow";

const UsersPage = () => {
  const theme = useMantineTheme()
  const [search,setSearch] = useState(""); 
  const [sortedData, setSortedData] = useState<User[]>(data); 
  const [sortBy, setSortBy] = useState<keyof User | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);
  const { selection, setSelection } = useSelectionStore();
  const [role, setRole] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [itemsPerPage, setItemsPerPage] = useState<string | null>("10");
  const [activePage, setActivePage] = useState(1);


  const itemsPerPageNumber = parseInt(itemsPerPage ?? "0");
  const totalPages = Math.ceil(sortedData.length / itemsPerPageNumber);
  const startIndex = (activePage - 1) * itemsPerPageNumber;
  const endIndex = startIndex + itemsPerPageNumber;
  const totalItems = sortedData.slice(startIndex, endIndex).length;


  const handleSearchChange = (event: string) => {
    const value = event;
    setSearch(value);
    setSortedData(
      sortData(data, {
        sortBy,
        reversed: reverseSortDirection,
        search: value,
      })
    );
  };

  const statusOptions = [...new Set(data.map((p) => p.status))]
    .map((d) => ({ value: d, label: d }))
    .map((option) => option.value);

  const roleOptions = [...new Set(data.map((p) => p.role))]
    .map((t) => ({ value: t, label: t }))
    .map((option) => option.value);
  const handleChangDropDownRole = (e: string | null) => {
    setRole(e);
  };
  const handleChangDropDownStatus = (e: string | null) => {
    setStatus(e);
  };
  useEffect(() => {
    let result = [...data];
    if (status) {
      result = result.filter((p) => p.status === status);
    }

    if (role) {
      result = result.filter((p) => p.role === role);
    }
    setStatus(status);
    setRole(role);;
    setSortedData(result);
  }, [status, role]);

  const currentItems = sortedData.slice(
    (activePage - 1) * parseInt(itemsPerPage ?? "0"),
    activePage * parseInt(itemsPerPage ?? "0")
  );

  const rows = currentItems.map((item) => (
    <TableBody
      key={item.userId}
      th0={item.userId}
      th1={item.username}
      th2={new Date(item.createdDate).toLocaleString('en-US', {
        year: 'numeric', month: 'numeric', day: 'numeric',
        hour: '2-digit', minute: '2-digit', hour12: true
      })}
      th3={item.email}
      th4={item.role}
      th5={item.status}
    />
))
    
  return (
    <>
    <Flex justify='space-between'>
      <Flex justify='start'>
        <Dropdown onChange={handleChangDropDownRole} options={roleOptions} placeHolder="Role"/>
        <Dropdown onChange={handleChangDropDownStatus} options={statusOptions} placeHolder="Status"/>
      </Flex>
      <SearchInput searchValue={search} setSearchValue={handleSearchChange} />
      <Button
        variant="filled"
        color={theme.other.secondaryDarkColor}
        radius="xl"
        w="100px"
        ml="5px"
        >
        <Text fw="normal" fz="11px" c={theme.other.onSurfacePrimary}>
          + add User
        </Text>
        </Button>    
    </Flex>
    <ScrollArea>
        <Table>
          <TableHead
          labels={["User Id", "User Name", "Created Date", "Email", "Role", "Status", "User"]}
          data={data}  
          reverseSortDirection={reverseSortDirection}
          setReverseSortDirection={setReverseSortDirection}
          search={search}
          selection={selection}
          setSelection={setSelection}
          sortBy={sortBy}
          setSortBy={setSortBy}
          setSortedData={setSortedData} 
          />
          {rows}
        </Table>
      </ScrollArea>
      <PaginationRow activePage={activePage} setActivePage={setActivePage} itemsPerPage={itemsPerPage} 
      setItemsPerPage={setItemsPerPage} totalItems={totalItems} totalPages={totalPages}/>
    </>
  );
};

export default UsersPage;
