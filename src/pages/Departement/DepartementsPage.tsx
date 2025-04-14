import { useEffect, useState } from "react";
import TableHead from "../../Components/Table/TableHead";
import { Center, Flex, ScrollArea, Table, Text } from "@mantine/core";
import TableBody from "../../Components/Table/TableBody";
import { SearchInput } from "../../Components/SearchInput";
import AddButton from "../../Components/AddButton";
import useSortStore from "../../hooks/useSortStore ";
import usePatientsList from "../../hooks/patient/usePatientsList";

const DepartementsPage = () => {
  const { sortBy, order, setSortBy, setOrder } = useSortStore();
  const { data, isFetched } = usePatientsList(1, 10, false, sortBy, order);

  const [search, setSearch] = useState("");
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
      onClick={() => console.log("department")}
      selection={selection}
      setSelection={setSelection}
      key={item._id}
      th0={item._id}
      th1={item.name}
      th2={item.address}
      th3={item.name}
      th4={item.address}
      th5={item.address}
      // th1={item.ComplexName}
      // th2={item.PIC}
      // th3={item.Address}
      // th4={item.DepartmentsCount.toString()}
      // th5={item.StaffCount.toString()}
    />
  ));

  if (!isFetched)
    return (
      <Center>
        <Text>No Patients Found</Text>
      </Center>
    );
  else
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
              sortedBy={["_id", "name"]}
              labels={[
                "Medical Id",
                "Medical Name",
                "PIC",
                "Address",
                "DepartmentsCount",
                "StaffCount",
                "Medical",
              ]}
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

export default DepartementsPage;
