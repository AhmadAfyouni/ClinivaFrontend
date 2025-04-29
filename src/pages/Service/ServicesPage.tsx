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

const ServicesPage = () => {
  const pagination = usePaginationtStore();
  const { sortBy, order } = useSortStore();
  const { data, isFetched } = useServicesList(false, sortBy, order);
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
  // const SpecialtiesOptions = [""];
  // const handlSpecialtyChange = (e: string | null) => {
  //   console.log(e);
  // };
  const rows = data.map((item) => (
    <TableBody
      onClick={() => navigate(`/services/details/${item._id}`)}
      selection={selection}
      setSelection={setSelection}
      key={item._id}
      th0={item.publicId}
      th1={item.name || ""}
      th2={item.description}
      th3={item.price.toString()}
      th4={item.clinic !== null ? item.clinic.name : ""}
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
        <Flex w="97%" justify="space-between">
          <Flex>
            <SearchInput
              searchValue={pagination.paramKey}
              setSearchValue={handleSearchChange}
              text="Search"
            />
            {/* <CustomFilters
              IsDropDown1={true}
              placeHolderDropDown1="clinicAssociation"
              OptionsDropDown1={SpecialtiesOptions}
              handlDropDownChange1={handlSpecialtyChange}
            /> */}
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
                "clinic",
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
