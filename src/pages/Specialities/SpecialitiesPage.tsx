import { useState } from "react";
import TableHead from "../../Components/Table/TableHead";
import { Box, Center, Flex, Table, Text } from "@mantine/core";
import TableBody from "../../Components/Table/TableBody";
import { SearchInput } from "../../Components/SearchInput";
import AddButton from "../../Components/AddButton";
import useSpecialization from "../../hooks/Specialization/useSpecializations";
import usePaginationtStore from "../../store/Pagination/usePaginationtStore";
import useSortStore from "../../hooks/useSortStore ";
import CustomPagination from "../../Components/Pagination/Pagination";
import useDropDownStore from "../../store/Dropdown/useDropDownStore ";
import CustomFilters from "../../Components/filters/CustomFilters";
import { useNavigate } from "react-router";

const SpecialitiesPage = () => {
  const pagination = usePaginationtStore();
  const { sortBy, order } = useSortStore();
  const navigate = useNavigate();
  const { data, isFetched } = useSpecialization(false, sortBy, order);
  console.log(data);
  const [selection, setSelection] = useState<string[]>([]);
  const { setSelectedOption } = useDropDownStore();
  if (!data) return null;
  const handleSearchChange = (event: string) => {
    pagination.setSearchKey(event);
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
  const statusOptionsboolean = [true, false];
  const statusOptions = statusOptionsboolean.map((item) =>
    item
      ? { label: "ACTIVE", value: true }
      : { label: "INACTIVE", value: false }
  );
  const handlStatusChange = (e: string | null) => {
    const value = statusOptions.find((item) => item.label === e)?.value ?? null;
    setSelectedOption("SpeStatus", e);
    pagination.setFilter(value);
  };
  const rows = data.map((item) => (
    <TableBody
      onClick={() => console.log("there is no speciality details page")}
      selection={selection}
      setSelection={setSelection}
      key={item._id}
      th0={item.publicId}
      th1={item.name}
      th2={item.statistics.clinics.toString()}
      th3={item.updatedAt.slice(0, 10)}
      th4={item.statistics.doctors.toString()}
      th5={item.isActive.toString()}
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
        <Flex w="97%" justify="space-between">
          <Flex>
            <SearchInput
              text="Search"
              searchValue={pagination.paramKey}
              setSearchValue={handleSearchChange}
            />
            <CustomFilters
              IsDropDown1={true}
              dropdownName1="SpeStatus"
              placeHolderDropDown1="Status"
              OptionsDropDown1={statusOptions.map((item) => item.label)}
              handlDropDownChange1={handlStatusChange}
            />
          </Flex>
          <AddButton
            text="addSpeciality"
            handleOnClick={() => navigate(`/specialities/add`)}
          />
        </Flex>
        <Box style={{ height: "80vh", overflow: "auto" }}>
          <Table>
            <TableHead
              sortedBy={[
                "_id",
                "name",
                "createdAt",
                "updatedAt",
                "doctors",
                "isActive",
                "_id",
              ]}
              labels={[
                "specialityId",
                "specialityName",
                "assignedClinics",
                "lastUpdate",
                "doctorsNumber",
                "status",
                "speciality",
              ]}
              data={data}
              selection={selection}
              toggleAll={toggleAll}
            />
            {rows}
          </Table>
          <CustomPagination store={pagination} />
        </Box>
      </>
    );
};

export default SpecialitiesPage;
