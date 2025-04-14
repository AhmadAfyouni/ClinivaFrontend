import { useState } from "react";
import TableHead from "../../Components/Table/TableHead";
import { Center, Flex, ScrollArea, Table, Text } from "@mantine/core";
import TableBody from "../../Components/Table/TableBody";
import { SearchInput } from "../../Components/SearchInput";
import AddButton from "../../Components/AddButton";
import useMedicalComplexList from "../../hooks/medicalcomplex/useMedicalComplexList";

const MedicalComplexPage = () => {
  const { data, isFetched } = useMedicalComplexList(1, 1, true);
  // console.log(data);

  const [search, setSearch] = useState("");
  const [selection, setSelection] = useState<string[]>([]);

  const handleSearchChange = (event: string) => {
    setSearch(event);
  };
  const rows = data?.map((item) => (
    <TableBody
      onClick={() => console.log("mediacl")}
      selection={selection}
      setSelection={setSelection}
      key={item._id}
      th0={item.name}
      th1={item.goals}
      th2={item.address}
      th3={item.address}
      th4={item.address}
      th5={item.address}
    />
  ));
  const toggleAll = () => {
    if (data) {
      setSelection((current) =>
        current.length === data.length
          ? []
          : data.map((item) => {
              return item.companyId.toString();
            })
      );
    }
  };
  if (!isFetched || !data)
    return (
      <Center>
        <Text>No Specialization Found</Text>
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

export default MedicalComplexPage;
