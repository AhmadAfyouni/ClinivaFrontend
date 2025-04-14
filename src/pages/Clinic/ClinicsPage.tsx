import { Center, Flex, ScrollArea, Table, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import { SearchInput } from "../../Components/SearchInput";
import AddButton from "../../Components/AddButton";
import TableHead from "../../Components/Table/TableHead";
import TableBody from "../../Components/Table/TableBody";
import useClinicsList from "../../hooks/clinic/useClinicsList";
import useSortStore from "../../hooks/useSortStore ";

const ClinicsPage = () => {
  const { data, isFetched } = useClinicsList();
  const [search, setSearch] = useState("");
  const { sortBy, order, setSortBy, setOrder } = useSortStore();
  const [selection, setSelection] = useState<string[]>([]);
  const handleSearchChange = (event: string) => {
    setSearch(event);
  };

  useEffect(() => {
    setOrder(order);
    setSortBy(sortBy);

    // if (role) {
    //   result = result.filter((p) => p.role === role);
    // }
    // setRole(role);
  }, [order, sortBy]);

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

  const rows = data.map((item) => (
    <TableBody
      onClick={() => void "clinics"}
      selection={selection}
      setSelection={setSelection}
      key={item._id}
      th0={item._id}
      th1={item.name}
      th2={item.WorkingHours.map((item) => `${item.endTime} - ${item.endTime}`)}
      th3={item.specializations.join(",")}
      th4={item.departmentId}
      th5={item.isActive.toString()}
      // th2={item.workingHours}
      // th3={item.specialty}
      // th4={item.numberoFPatientsTreated}
      // th5={item.status}
    />
  ));
  if (!isFetched)
    return (
      <Center>
        <Text>No Clinics Found</Text>
      </Center>
    );
  else
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
              sortedBy={[
                "_id",
                "name",
                "",
                "specializations",
                "departmentId",
                "isActive",
              ]}
              toggleAll={toggleAll}
              data={data}
              selection={selection}
            />
            {rows}
          </Table>
        </ScrollArea>
      </>
    );
};

export default ClinicsPage;
