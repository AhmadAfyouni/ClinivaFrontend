import {
  Flex,
  Text,
  Badge,
  useMantineTheme,
  Box,
  Table,
  Center,
  ScrollArea,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import ListComponent from "../../Components/CompanyDetails/ListComponent";
import { FaClinicMedical } from "react-icons/fa";
import useSortStore from "../../hooks/useSortStore ";
import usePaginationtStore from "../../store/Pagination/usePaginationtStore";
import useStaffList from "../../hooks/staff/useStaffList";
import { useNavigate } from "react-router";
import { useState } from "react";
import TableBody from "../../Components/Table/TableBody";
import CustomPagination from "../../Components/Pagination/Pagination";
import TableHead from "../../Components/Table/TableHead";
import AddButton from "../../Components/AddButton";
import { SearchInput } from "../../Components/SearchInput";

const DepartementDetails = () => {
  const theme = useMantineTheme();
  const isMobile = useMediaQuery("(max-width: 576px)");
  const title = ["ID", "Name", "ComplexName", "Location"];
  const content = ["12345", "Clinic 1", "Complex 1", "Location 1"];
  const title2 = ["Patient Capacity", "Description"];
  const content2 = ["3254", "blah blah blah"];
  //////////////////////////////////////////////////////staff table
  const { sortBy, order } = useSortStore();
  const pagination = usePaginationtStore();
  const { data, isFetched } = useStaffList(false, sortBy, order);
  const navigate = useNavigate();
  // console.log(data);
  const [selection, setSelection] = useState<string[]>([]);

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
  const handleSearchChange = (e: string) => {
    pagination.setSearchKey(e);
  };

  const rows = data?.map((item) => (
    <TableBody
      onClick={() => navigate(`/departements/details/${item._id}`)}
      selection={selection}
      setSelection={setSelection}
      key={item._id}
      th0={item._id.toString()}
      th1={item.name}
      th2={item.contactInfos.map((item) =>
        item.type === "email" ? item.value : ""
      )}
      th3={item.departmentId?.name || ""}
      th4={item.employeeType}
      th5={item.isActive.toString()}
    />
  ));

  if (!isFetched || !data)
    return (
      <Center>
        <Text>No departement Staff Found</Text>
      </Center>
    );
  else
    return (
      <ScrollArea h="100vh" w="100%" type="always" bg={theme.other.bg} pb={90}>
        <Flex direction="row">
          <Flex w="100%" direction="column" mb="lg" gap="md">
            <Text fz={20} fw={600} c={theme.colors.myPrimary[5]}>
              Departement
            </Text>
            <Flex direction={isMobile ? "column" : "row"}>
              <Flex
                w={isMobile ? "100%" : "48%"}
                direction="column"
                mb="lg"
                gap="md"
              >
                {title.map((item, index) => (
                  <Flex key={index}>
                    <Text w={200} c={theme.other.onSurfaceTertiary}>
                      {item}
                    </Text>
                    <Text c={theme.other.onSurfacePrimary}>
                      {content[index]}
                    </Text>
                  </Flex>
                ))}
              </Flex>
              <Flex direction="column" w={isMobile ? "100%" : "48%"} gap="md">
                <Flex>
                  <Text w={200} c={theme.other.onSurfaceTertiary}>
                    Status
                  </Text>
                  <Badge size="14px" p="sm">
                    Active
                  </Badge>
                </Flex>
                <Flex w="100%" direction="column" mb="lg" gap="lg">
                  {title2.map((item, index) => (
                    <Flex key={index}>
                      <Text w={200} c={theme.other.onSurfaceTertiary}>
                        {item}
                      </Text>
                      <Text c={theme.other.onSurfacePrimary}>
                        {content2[index]}
                      </Text>
                    </Flex>
                  ))}
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
        <Text fw={600} fz={20} c={theme.colors.myPrimary[5]}>
          Clinics & Specialties
        </Text>
        <Flex
          w="100%"
          justify="space-between"
          direction={isMobile ? "column" : "row"}
        >
          <Flex w="50%">
            <ListComponent
              key={0}
              minwidth="50%"
              title="Clinics"
              listItems={["gf1dsa", "gsgf2sdg", "g3fdsa", "gsg4fsdg", "gf5dsa"]}
              icon={<FaClinicMedical />}
            />
          </Flex>
          <Flex w="50%">
            <ListComponent
              key={1}
              minwidth="50%"
              title="Specialties"
              listItems={[
                "fsdgsf0",
                "sdf09g",
                "g00fdsa",
                "gsg9fsdg",
                "gfds8a",
                "gsg7fsdg",
              ]}
              icon={<FaClinicMedical />}
            />
          </Flex>
        </Flex>
        <Flex w="99%" direction="column" h="600px">
          <Flex w="100%" justify="space-between">
            <SearchInput
              searchValue={pagination.paramKey}
              setSearchValue={handleSearchChange}
              text="Search "
            />
            <Flex justify="end" hiddenFrom="sm">
              <AddButton
                text="Add Staff"
                handleOnClick={() => navigate(`/employee/add`)}
              />
            </Flex>
          </Flex>
          <Box style={{ height: "auto", overflow: "auto" }}>
            <Table>
              <TableHead
                labels={[
                  "Staff Id",
                  "Staff Name",
                  "Contact Info",
                  "department",
                  "Role",
                  "Status",
                  "User",
                ]}
                sortedBy={[
                  "_id",
                  "name",
                  "contactInfos",
                  "departmentId",
                  "employeeType",
                  "isActive",
                  "_id",
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
      </ScrollArea>
    );
};

export default DepartementDetails;
