import { Box, Center, Flex, Table, Text } from "@mantine/core";
import { useState } from "react";
import { SearchInput } from "../../Components/SearchInput";
import AddButton from "../../Components/AddButton";
import TableHead from "../../Components/Table/TableHead";
import TableBody from "../../Components/Table/TableBody";
import useSortStore from "../../hooks/useSortStore ";
import { useNavigate } from "react-router";
import usePaginationtStore from "../../store/Pagination/usePaginationtStore";
import CustomPagination from "../../Components/Pagination/Pagination";
import useServicesList from "../../hooks/serviceH/useServicesList";
import CustomFilters from "../../Components/filters/CustomFilters";
import useDropDownStore from "../../store/Dropdown/useDropDownStore ";

const ServicesPage = () => {
  const pagination = usePaginationtStore();
  const { sortBy, order } = useSortStore();
  const { data, isFetched } = useServicesList(false, sortBy, order);
  console.log("data is " + data);
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
  // const SpecialtiesOptions = [""];
  // const handlSpecialtyChange = (e: string | null) => {
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
    pagination.setFilter(value);
    setSelectedOption("SerStatus", e);
  };
  const rows = data.map((item, index) => (
    <TableBody
      onClick={() => navigate(`/services/details/${item._id}`)}
      selection={selection}
      setSelection={setSelection}
      key={item._id}
      th0={(pagination.current_page * (index + 1)).toString().padStart(3, "0")}
      th1={item.publicId || ""}
      // th2={{ value: item.description }}
      th2={{ value: item.name }}
      th3={{ value: item.price.toString() }}
      th4={item.clinic !== null ? item.clinic.name : ""}
      // th5={item.isActive.toString()}
      onDeleteClick={() => {
        console.log("delete");
      }}
      onEditClick={() => console.log("edit")}
      edit={false}
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
              placeHolderDropDown1="status"
              dropdownName1="SerStatus"
              OptionsDropDown1={statusOptions.map((item) => item.label)}
              handlDropDownChange1={handlStatusChange}
            />
          </Flex>
          <AddButton
            text="Add Service"
            handleOnClick={() => navigate(`/services/add`)}
          />
        </Flex>
        <Box style={{ height: "80vh", overflow: "auto" }}>
          <Table>
            <TableHead
              labels={[
                "serviceId",
                "serviceName",
                "description",
                "price",
                "clinics",
                "status",
                "service",
              ]}
              sortedBy={[
                "_id",
                "name",
                "description",
                "price",
                "clinics",
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

export default ServicesPage;
