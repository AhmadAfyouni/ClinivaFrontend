import { useEffect, useState } from "react";
import {
  Table,
  ScrollArea,
  Flex,
} from "@mantine/core";
import data from "../data/patients.json";
import sortData from "../utilities/SortData";
import TableBody from "../Components/Table/TableBody";
import useSelectionStore from "../store/useSelectionStore";
import PaginationPage from "../Components/PaginationPage";
import Patient from "../types/Patient";
import TableHead from "../Components/Table/TableHead";
import MultiFilters from "../Components/multiFilters";

const PatientsPage = () => {
  const [activePage, setActivePage] = useState(1);
  const [treatment, setTreatment] = useState<string | null>(null);
  const [doctor, setDoctor] = useState<string | null>(null);
  const { selection, setSelection } = useSelectionStore();
  const [itemsPerPage, setItemsPerPage] = useState<string | null>("10");
  const [search, setSearch] = useState("");
  const [sortedData, setSortedData] = useState(data);
  const [sortBy, setSortBy] = useState<keyof Patient | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);
  const [dateRange, setDateRange] = useState<[Date | null, Date | null] | null>(
    [null, null]
  );

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

  const doctorOptions = [...new Set(data.map((p) => p.doctor))]
    .map((d) => ({ value: d, label: d }))
    .map((option) => option.value);
  const treatmentOptions = [...new Set(data.map((p) => p.treatment))]
    .map((t) => ({ value: t, label: t }))
    .map((option) => option.value);

  const handleChangDropDownDoctor = (e: string | null) => {
    setDoctor(e);
  };
  const handleChangeDropDownTreatment = (e: string | null) => {
    setTreatment(e);
  };
  useEffect(() => {
    let result = [...data];
    if (treatment) {
      result = result.filter((p) => p.treatment === treatment);
    }

    if (doctor) {
      result = result.filter((p) => p.doctor === doctor);
    }
    if (dateRange && dateRange[0] && dateRange[1]) {
      result = result.filter((p) => {
        if (!dateRange || !dateRange[0] || !dateRange[1]) return false;
        const [startDate, endDate] = dateRange;
        const pDate = new Date(p.date);
        return pDate >= startDate && pDate <= endDate;
      });
    }
    setDoctor(doctor);
    setTreatment(treatment);
    setDateRange(dateRange);
    setSortedData(result);
  }, [doctor, treatment, dateRange]);

  const currentItems = sortedData.slice(
    (activePage - 1) * parseInt(itemsPerPage ?? "0"),
    activePage * parseInt(itemsPerPage ?? "0")
  );
  const rows = currentItems.map((item) => (
    <TableBody
      key={item.id}
      id={item.id}
      name={item.name}
      date={item.date}
      time={item.time}
      doctor={item.doctor}
      treatment={item.treatment}
      status={item.status}
    />
  ));
  

  return (
    <Flex w="95%" h="85vh" direction="column">
      <MultiFilters search={search} handleSearchChange={handleSearchChange} doctorOptions={doctorOptions} treatmentOptions={treatmentOptions}
      dateRange={dateRange} handleChangDropDownDoctor={handleChangDropDownDoctor} handleChangeDropDownTreatment={handleChangeDropDownTreatment}
      setDateRange={setDateRange}/>
      <ScrollArea>
        <Table>
          <TableHead
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
      {
        <PaginationPage
          activePage={activePage}
          setActivePage={setActivePage}
          itemsPerPage={itemsPerPage}
          setItemsPerPage={setItemsPerPage}
          totalItems={totalItems}
          totalPages={totalPages}
        />
      }
    </Flex>
  );
};

export default PatientsPage;
