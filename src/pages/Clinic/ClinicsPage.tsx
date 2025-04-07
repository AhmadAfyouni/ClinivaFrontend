import { Flex, ScrollArea, Table } from "@mantine/core";
import { useState } from "react";
import PaginationRow from "../../Components/PaginationRow";
import { SearchInput } from "../../Components/SearchInput";
import AddButton from "../../Components/AddButton";
import TableHead from "../../Components/Table/TableHead";
import TableBody from "../../Components/Table/TableBody";
import Clinic from "../../types/Clinic";
import data from "../../data/clinics.json";
import sortData from "../../utilities/SortData";

const ClinicsPage = () => {
  const [search, setSearch] = useState("");
  const [sortedData, setSortedData] = useState<Clinic[]>(data);
  const [sortBy, setSortBy] = useState<keyof Clinic | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);
  const [selection, setSelection] = useState<string[]>([]);
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
      current.length === data.length
        ? []
        : data.map((item) => {
            return item.clinicId.toString();
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
      key={item.clinicId}
      th0={item.clinicId.toString()}
      th1={item.clinicName}
      th2={item.workingHours}
      th3={item.specialty}
      th4={item.numberoFPatientsTreated}
      th5={item.status}
    />
  ));

  return (
    <>
      <Flex w="90%" justify="space-between">
        <SearchInput
          searchValue={search}
          setSearchValue={handleSearchChange}
          text="Search Clinic"
        />
        <AddButton text="Add Clinic" />
      </Flex>
      <ScrollArea>
        <Table>
          <TableHead
            labels={[
              "Clinic Id",
              "Clinic Name",
              "workingHours",
              "Speciality",
              "NumberOfPatients",
              "Status",
              "Clinic",
            ]}
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

export default ClinicsPage;
