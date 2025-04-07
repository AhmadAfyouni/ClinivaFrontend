import { useState } from "react";
import TableHead from "../../Components/Table/TableHead";
import data from "../../data/medical.json";
import { Flex, ScrollArea, Table } from "@mantine/core";
import TableBody from "../../Components/Table/TableBody";
import { SearchInput } from "../../Components/SearchInput";
import sortData from "../../utilities/SortData";
import PaginationRow from "../../Components/PaginationRow";
import AddButton from "../../Components/AddButton";
import MedicalComplex from "../../types/MedicalComplex";

const MedicalComplexPage = () => {
  const [search, setSearch] = useState("");
  const [sortedData, setSortedData] = useState<MedicalComplex[]>(data);
  const [sortBy, setSortBy] = useState<keyof MedicalComplex | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);
  const [selection, setSelection] = useState<string[]>([]);
  const [itemsPerPage, setItemsPerPage] = useState<string | null>("10");
  const [activePage, setActivePage] = useState(1);

  const itemsPerPageNumber = parseInt(itemsPerPage ?? "0");
  const totalPages = Math.ceil(sortedData.length / itemsPerPageNumber);
  const startIndex = (activePage - 1) * itemsPerPageNumber;
  const endIndex = startIndex + itemsPerPageNumber;
  const totalItems = sortedData.slice(startIndex, endIndex).length;

  const convertedData = data.map((item) => ({
    ...item,
    DepartmentsCount: String(item.DepartmentsCount),
    StaffCount: String(item.StaffCount),
  }));

  const handleSearchChange = (event: string) => {
    const value = event;
    setSearch(value);
    setSortedData(
      sortData(convertedData, {
        sortBy,
        reversed: reverseSortDirection,
        search: value,
      })
    );
  };

  const toggleAll = () => {
    setSelection((current) =>
      current.length === data.length
        ? []
        : data.map((item) => {
            return item.MedicalId.toString();
          })
    );
  };

  const currentItems = sortedData.slice(
    (activePage - 1) * parseInt(itemsPerPage ?? "0"),
    activePage * parseInt(itemsPerPage ?? "0")
  );

  const rows = currentItems.map((item) => (
    <TableBody
      selection={selection}
      setSelection={setSelection}
      key={item.MedicalId}
      th0={item.MedicalId}
      th1={item.ComplexName}
      th2={item.PIC}
      th3={item.Address}
      th4={item.DepartmentsCount.toString()}
      th5={item.StaffCount.toString()}
    />
  ));

  return (
    <>
      <Flex w="90%" justify="space-between">
        <SearchInput
          text="Search MedicalComplex"
          searchValue={search}
          setSearchValue={handleSearchChange}
        />
        <AddButton text="Add MedicalComplex" />
      </Flex>
      <ScrollArea>
        <Table>
          <TableHead
            labels={[
              "Medical Id",
              "Medical Name",
              "PIC",
              "Address",
              "DepartmentsCount",
              "StaffCount",
              "Medical",
            ]}
            data={convertedData}
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
      <PaginationRow
        activePage={activePage}
        setActivePage={setActivePage}
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
        totalItems={totalItems}
        totalPages={totalPages}
      />
    </>
  );
};

export default MedicalComplexPage;
