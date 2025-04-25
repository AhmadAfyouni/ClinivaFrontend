import { Box, Center, Flex, Table, Text } from "@mantine/core";
import { useState } from "react";
import { SearchInput } from "../../Components/SearchInput";
import AddButton from "../../Components/AddButton";
import TableHead from "../../Components/Table/TableHead";
import TableBody from "../../Components/Table/TableBody";
import useClinicsList from "../../hooks/clinic/useClinicsList";
import useSortStore from "../../hooks/useSortStore ";
import { useNavigate } from "react-router";
import usePaginationtStore from "../../store/Pagination/usePaginationtStore";
import CustomPagination from "../../Components/Pagination/Pagination";
import CustomFilters from "../../Components/filters/CustomFilters";
import useDropDownStore from "../../store/Dropdown/useDropDownStore ";

const ClinicsPage = () => {
  const pagination = usePaginationtStore();
  const { sortBy, order } = useSortStore();
  const { data, isFetched } = useClinicsList(false, sortBy, order);
  const navigate = useNavigate();
  const { setSelectedOption } = useDropDownStore();
  const [selection, setSelection] = useState<string[]>([]);
  const handleSearchChange = (event: string) => {
    pagination.setSearchKey(event);
  };
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
  const SpecialtiesOptions = [""];
  const handlSpecialtyChange = (e: string | null) => {
    setSelectedOption("CliSpeciality", e);
    console.log(e);
  };
  const rows = data.map((item) => (
    <TableBody
      onClick={() => navigate(`/clinics/details/${item._id}`)}
      selection={selection}
      setSelection={setSelection}
      key={item._id}
      th0={item._id}
      th1={item.name}
      th2={
        item?.WorkingHours?.[0]
          ? `${item.WorkingHours[0].startTime} - ${item.WorkingHours[0].endTime}`
          : ""
      }
      th3={item.specializations.map((item) => item.name).join(",")}
      th4={item.treatedPatientCount.toString() || "0"}
      th5={item.isActive.toString()}
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
          <Flex>
            <SearchInput
              searchValue={pagination.paramKey}
              setSearchValue={handleSearchChange}
              text="Search Clinic"
            />
            <CustomFilters
              IsDropDown1={true}
              dropdownName1="CliSpeciality"
              placeHolderDropDown1="Speciality"
              OptionsDropDown1={SpecialtiesOptions}
              handlDropDownChange1={handlSpecialtyChange}
            />
          </Flex>
          <AddButton
            text="Add Clinic"
            handleOnClick={() => navigate(`/clinics/add`)}
          />
        </Flex>
        <Box style={{ height: "80vh", overflow: "auto" }}>
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
                "timeSlots",
                "specializations",
                "total",
                "isActive",
                "_id",
              ]}
              toggleAll={toggleAll}
              data={data}
              selection={selection}
            />
            {rows}
          </Table>
          <CustomPagination store={pagination} />
        </Box>
      </>
    );
};

export default ClinicsPage;
