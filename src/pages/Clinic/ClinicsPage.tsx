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
  const { setSelectedOption } = useDropDownStore();
  const { data, isFetched } = useClinicsList(false, sortBy, order);
  const navigate = useNavigate();
  // const { setSelectedOption } = useDropDownStore();
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
  // const SpecialtiesOptions = [""];
  // const handlSpecialtyChange = (e: string | null) => {
  //   setSelectedOption("CliSpeciality", e);
  //   console.log(e);
  // };
  const statusOptionsboolean = [true, false];
  const statusOptions = statusOptionsboolean.map((item) =>
    item
      ? { label: "ACTIVE", value: true }
      : { label: "INACTIVE", value: false }
  );
  const handlStatusChange = (e: string | null) => {
    const value = statusOptions.find((item) => item.label === e)?.value ?? null;
    setSelectedOption("CliStatus", e);
    pagination.setFilter(value);
  };

  const workingHours = data.map((item) => item.WorkingHours).flat();
  const maxStartTime = workingHours.reduce(
    (max, wh) => (wh.startTime > max ? wh.startTime : max),
    workingHours[0]?.startTime || ""
  );

  const maxEndTime = workingHours.reduce(
    (max, wh) => (wh.endTime > max ? wh.endTime : max),
    workingHours[0]?.endTime || ""
  );
  console.log(maxStartTime, maxEndTime);
  const rows = data.map((item, index) => (
    <TableBody
      // imgUrl={item.logo !== null ? item.logo : ""}
      onClick={() => navigate(`/clinics/details/${item._id}`)}
      selection={selection}
      setSelection={setSelection}
      key={item._id}
      th0={(pagination.current_page * (index + 1)).toString().padStart(3, "0")}
      th1={item.publicId}
      th2={{ value: item.name }}
      // th2={(() => {
      //   const wh = item.WorkingHours || [];
      //   const maxStart = wh.reduce(
      //     (max, x) => (x.startTime > max ? x.startTime : max),
      //     wh[0]?.startTime || ""
      //   );
      //   const maxEnd = wh.reduce(
      //     (max, x) => (x.endTime > max ? x.endTime : max),
      //     wh[0]?.endTime || ""
      //   );
      //   return `${maxStart} - ${maxEnd}`;
      // })()}
      th3={{ value: item.specializations.map((item) => item.name).join(",") }}
      th4={item.treatedPatientCount.toString() || "0"}
      // th5={item.isActive.toString()}
      onDeleteClick={() => {
        console.log("delete");
      }}
      onEditClick={() => console.log("edit")}
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
        <Flex w="97%" justify="space-between">
          <Flex>
            <SearchInput
              searchValue={pagination.paramKey}
              setSearchValue={handleSearchChange}
              text="Search"
            />
            <CustomFilters
              IsDropDown1={true}
              dropdownName1="CliStatus"
              placeHolderDropDown1="Status"
              OptionsDropDown1={statusOptions.map((item) => item.label)}
              handlDropDownChange1={handlStatusChange}
            />
          </Flex>
          <AddButton
            text="addClinic"
            handleOnClick={() => navigate(`/clinics/add`)}
          />
        </Flex>
        <Box style={{ height: "80vh", overflow: "auto" }}>
          <Table>
            <TableHead
              labels={[
                "clinicId",
                "name",
                "workingHours",
                "speciality",
                "numberOfPatients",
                "status",
                "clinic",
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
