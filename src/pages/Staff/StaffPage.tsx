import { useEffect, useState } from "react";
import TableHead from "../../Components/Table/TableHead";
import data from "../../data/staff.json";
import { Flex, ScrollArea, Table } from "@mantine/core";
import TableBody from "../../Components/Table/TableBody";
import Dropdown from "../../Components/Dropdown";
import { SearchInput } from "../../Components/SearchInput";
import sortData from "../../utilities/SortData";
import PaginationRow from "../../Components/PaginationRow";
import AddButton from "../../Components/AddButton";
import MobileFilters from "../../Components/mobliefilters";
import Staff from "../../types/Staff";

const StaffPage = () => {
  const [search,setSearch] = useState(""); 
  const [sortedData, setSortedData] = useState<Staff[]>(data); 
  const [sortBy, setSortBy] = useState<keyof Staff | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);
  const [ selection , setSelection ] = useState<string[]>([]);
  const [role, setRole] = useState<string | null>(null);
  const [department, setDepartment] = useState<string | null>(null);
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

  const toggleAll = () => {
    setSelection((current) =>
      current.length === data.length ? [] : data.map((item) =>  {return item.staffId.toString()})
    );
  };

  const statusOptions = [...new Set(data.map((p) => p.department))]
    .map((d) => ({ value: d, label: d }))
    .map((option) => option.value);

  const roleOptions = [...new Set(data.map((p) => p.role))]
    .map((t) => ({ value: t, label: t }))
    .map((option) => option.value);
  const handleChangDropDownRole = (e: string | null) => {
    setRole(e);
  };
  const handleChangDropDownDepartment = (e: string | null) => {
    setDepartment(e);
  };
  useEffect(() => {
    let result = [...data];
    if (department) {
      result = result.filter((p) => p.department === department);
    }

    if (role) {
      result = result.filter((p) => p.role === role);
    }
    setDepartment(department);
    setRole(role);;
    setSortedData(result);
  }, [department, role]);

  const currentItems = sortedData.slice(
    (activePage - 1) * parseInt(itemsPerPage ?? "0"),
    activePage * parseInt(itemsPerPage ?? "0")
  );

  const rows = currentItems.map((item) => (
    <TableBody
      selection={selection}
      setSelection={setSelection}
      key={item.staffId}
      th0={item.staffId.toString()}
      th1={item.name}
      th2={item.contact}
      th3={item.department}
      th4={item.role}
      th5={item.status}
    />
))
    
  return (
    <>
    <Flex w='90%' justify='space-between'>
      <Flex justify='start' visibleFrom="sm">
        <Dropdown onChange={handleChangDropDownRole} options={roleOptions} placeHolder="Role"/>
        <Dropdown onChange={handleChangDropDownDepartment} options={statusOptions} placeHolder="Department"/>
      </Flex>
      <SearchInput searchValue={search} setSearchValue={handleSearchChange} />
      <Flex justify='end' hiddenFrom="sm" >
        <AddButton/>   
        <MobileFilters/>
      </Flex>
    </Flex>
    <ScrollArea>
        <Table>
          <TableHead
          labels={["Staff Id", "Staff Name", "Contact Info", "department", "Role", "Status", "User"]}
          data={data}  
          reverseSortDirection={reverseSortDirection}
          setReverseSortDirection={setReverseSortDirection}
          search={search}
          selection={selection}
          sortBy={sortBy}
          toggleAll={toggleAll}
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

export default StaffPage;
