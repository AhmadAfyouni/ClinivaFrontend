import { useState } from "react";
import TableHead from "../../Components/Table/TableHead";
import { Box, Center, Flex, Table, Text } from "@mantine/core";
import TableBody from "../../Components/Table/TableBody";
import { SearchInput } from "../../Components/SearchInput";
import AddButton from "../../Components/AddButton";
import useSortStore from "../../hooks/useSortStore ";
import { useNavigate } from "react-router";
import CustomPagination from "../../Components/Pagination/Pagination";
import usePaginationtStore from "../../store/Pagination/usePaginationtStore";
import useDepatementsList from "../../hooks/departement/useDepartementsList";

const DepartementsPage = () => {
  const pagination = usePaginationtStore();
  const { sortBy, order } = useSortStore();
  const { data, isFetched } = useDepatementsList(false, sortBy, order);
  // const { setSelectedOption } = useDropDownStore();
  const navigate = useNavigate();
  const [selection, setSelection] = useState<string[]>([]);
  const handleSearchChange = (event: string) => {
    pagination.setSearchKey(event);
  };

  if (!data) return null;
  console.log(data);

  const toggleAll = () => {
    setSelection((current) =>
      current.length === data.length
        ? []
        : data.map((item) => {
            return item._id.toString();
          })
    );
  };

  // const PICOptions = [""];
  // const handlPICChange = (e: string | null) => {
  //   setSelectedOption("DepPIC", e);
  //   console.log(e);
  // };
  const rows = data.map((item) => (
    <TableBody
      // imgUrl={item.logo !== null ? item.logo : ""}
      onClick={() => navigate(`/departements/details/${item._id}`)}
      selection={selection}
      setSelection={setSelection}
      key={item._id}
      // th0={(pagination.current_page * (index + 1)).toString().padStart(3, "0")}
      th0={item.publicId}
      th1={item.name}
      th2={{ value: item.clinicCollectionId?.name || "" }}
      th3={{ value: item.PIC.name }}
      th4={item.clinicCount.toString()}
      // th5={item.patientCount.toString()}
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
        <Text>No Departements Found</Text>
      </Center>
    );
  else
    return (
      <Flex direction="column">
        <Flex w="97%" justify="space-between">
          <Flex>
            <SearchInput
              text="Search "
              searchValue={pagination.paramKey}
              setSearchValue={handleSearchChange}
            />
            {/* <CustomFilters
              IsDropDown1={true}
              dropdownName1="DepPIC"
              placeHolderDropDown1="PIC"
              OptionsDropDown1={PICOptions}
              handlDropDownChange1={handlPICChange}
            /> */}
          </Flex>
          <AddButton
            text="addDepartement"
            handleOnClick={() => navigate(`/departements/add`)}
          />
        </Flex>
        <Box style={{ height: "80vh", overflow: "auto" }}>
          <Table>
            <TableHead
              sortedBy={[
                "_id",
                "name",
                "clinicCollectionId?.name",
                "PIC",
                "clinicCount",
                "patientCount",
                "_id",
              ]}
              labels={[
                "No",
                "DepartmentID",
                "Name",
                "Complex",
                "Status",
                "Actions",
                "departement",
              ]}
              data={data}
              selection={selection}
              toggleAll={toggleAll}
            />
            {rows}
          </Table>

          <CustomPagination store={pagination} />
        </Box>
      </Flex>
    );
};

export default DepartementsPage;
