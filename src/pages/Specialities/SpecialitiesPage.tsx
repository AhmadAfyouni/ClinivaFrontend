import { useState } from "react";
import TableHead from "../../Components/Table/TableHead";
import { Center, Flex, ScrollArea, Table, Text } from "@mantine/core";
import TableBody from "../../Components/Table/TableBody";
import { SearchInput } from "../../Components/SearchInput";
import AddButton from "../../Components/AddButton";
import useSpecialization from "../../hooks/Specialization/useSpecializations";

const SpecialitiesPage = () => {
  const { data, isFetched } = useSpecialization();
  console.log(data);
  const [search, setSearch] = useState("");
  const [selection, setSelection] = useState<string[]>([]);

  if (!data) return null;
  const handleSearchChange = (event: string) => {
    setSearch(event);
  };

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
      onClick={() => console.log("Specialties")}
      selection={selection}
      setSelection={setSelection}
      key={item._id}
      th0={item._id}
      th1={item.name}
      th2={item.createdAt}
      th3={item.updatedAt}
      th4={item.requiredStaff.toString()}
      th5={item.isActive.toString()}
      // key={item.SpecialityId}
      // th0={item.SpecialityId}
      // th1={item.Name}
      // th2={item.AssignedClinics}
      // th3={item.LastUpdate}
      // th4={item.DoctorsNumber.toString()}
      // th5={item.Status.toString()}
    />
  ));
  if (!isFetched || !data)
    return (
      <Center>
        <Text>No Specialties Found</Text>
      </Center>
    );
  else
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
              sortedBy={["_id", "name", "createdAt"]}
              labels={[
                "Speciality Id",
                "Speciality Name",
                "AssignedClinics",
                "LastUpdate",
                "DoctorsNumber",
                "Status",
                "Speciality",
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

export default SpecialitiesPage;
