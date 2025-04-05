import { useState } from "react";
import TableHead from "../../Components/Table/TableHead";
import data from "../../data/specialities.json";
import { Flex, ScrollArea, Table } from "@mantine/core";
import TableBody from "../../Components/Table/TableBody";
import { SearchInput } from "../../Components/SearchInput";
import sortData from "../../utilities/SortData";
import PaginationRow from "../../Components/PaginationRow";
import AddButton from "../../Components/AddButton";
import Speciality from "../../types/SpecialityTyps";

const SpecialitiesPage = () => {
  const [search, setSearch] = useState("");
  const [sortedData, setSortedData] = useState<Speciality[]>(data);
  const [sortBy, setSortBy] = useState<keyof Speciality | null>(null);
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
    DoctorsNumber: String(item.DoctorsNumber),
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
            return item.SpecialityId.toString();
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
      key={item.SpecialityId}
      th0={item.SpecialityId}
      th1={item.Name}
      th2={item.AssignedClinics}
      th3={item.LastUpdate}
      th4={item.DoctorsNumber.toString()}
      th5={item.Status.toString()}
    />
  ));

  return (
    <>
      <Flex w="90%" justify="space-between">
        <SearchInput
          text="Search Speciality"
          searchValue={search}
          setSearchValue={handleSearchChange}
        />
        <AddButton text="Add Speciality" />
      </Flex>
      <ScrollArea>
        <Table>
          <TableHead
            labels={[
              "Speciality Id",
              "Speciality Name",
              "AssignedClinics",
              "LastUpdate",
              "DoctorsNumber",
              "Status",
              "Speciality",
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

export default SpecialitiesPage;
