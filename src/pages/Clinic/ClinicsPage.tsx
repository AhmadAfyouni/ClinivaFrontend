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

const ClinicsPage = () => {
  const pagination = usePaginationtStore();
  const { sortBy, order } = useSortStore();
  const { data, isFetched } = useClinicsList(false, sortBy, order);
  const navigate = useNavigate();
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

  const rows = data.map((item) => (
    <TableBody
      onClick={() => navigate(`/clinic/details/${item._id}`)}
      selection={selection}
      setSelection={setSelection}
      key={item._id}
      th0={item._id}
      th1={item.name}
      th2={
        item?.WorkingHours?.map(
          (dayItem) =>
            dayItem?.timeSlots
              ?.map((slot) => `${slot.startTime} - ${slot.endTime}`)
              .join(", ") || ""
        ).join(" | ") || ""
      }
      th3={item.specializations.map((item) => item.name).join(",")}
      th4={item.statistics.patients.total.toString()}
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
          <SearchInput
            searchValue={pagination.paramKey}
            setSearchValue={handleSearchChange}
            text="Search Clinic"
          />
          <AddButton
            text="Add Clinic"
            handleOnClick={() => navigate(`/clinic/add`)}
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
