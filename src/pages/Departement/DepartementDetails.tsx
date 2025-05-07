import {
  Flex,
  Text,
  Badge,
  useMantineTheme,
  Box,
  Table,
  Center,
  ScrollArea,
  Button,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import ListComponent from "../../Components/CompanyDetails/ListComponent";
import { FaClinicMedical } from "react-icons/fa";
import useSortStore from "../../hooks/useSortStore ";
import usePaginationtStore from "../../store/Pagination/usePaginationtStore";
import useStaffList from "../../hooks/staff/useStaffList";
import { useNavigate, useParams } from "react-router";
import { useState } from "react";
import TableBody from "../../Components/Table/TableBody";
import CustomPagination from "../../Components/Pagination/Pagination";
import TableHead from "../../Components/Table/TableHead";
import AddButton from "../../Components/AddButton";
import { SearchInput } from "../../Components/SearchInput";
import { useTranslation } from "react-i18next";
import useDepartmentDetails from "../../hooks/departement/useDepartementDetails";
import useDeleteById from "../../hooks/delete/useDeleteById";

const DepartementDetails = () => {
  const { t } = useTranslation();
  const theme = useMantineTheme();
  const { id: deptID } = useParams();
  const { data: departementData } = useDepartmentDetails(deptID!);
  console.log(departementData);
  const isMobile = useMediaQuery("(max-width: 576px)");
  const deleteDepartment = useDeleteById({
    endpoint: "departments",
    mutationKey: "delete-department",
    navigationUrl: "/departements",
  });
  //////////////////////////////////////////////////////staff table
  const { sortBy, order } = useSortStore();
  const pagination = usePaginationtStore();
  const { data, isFetched } = useStaffList(false, sortBy, order);
  const navigate = useNavigate();
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
      th2={{
        value: item.contactInfos
          .map((item) => (item.type === "email" ? item.value : ""))
          .join(""),
      }}
      th3={{ value: item.departmentId?.name || "" }}
      th4={item.employeeType}
      // th5={item.isActive.toString()}
      onDeleteClick={() => {
        console.log("delete");
      }}
      onEditClick={() => console.log("edit")}
    />
  ));
  const title = ["ID", "Name", "ComplexName", "Location"];
  const content = [
    departementData?.publicId,
    departementData?.name,
    departementData?.clinicCollectionId?.name,
    departementData?.address,
  ];
  const title2 = ["Patient Capacity", "Description"];
  const content2 = [departementData?.patientCount, departementData?.details];
  const handleDeleteEvent = () => {
    deleteDepartment.mutate(deptID!);
  };
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
              {t("Departement")}
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
                      {t(item)}
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
                    {t("Status")}
                  </Text>
                  <Badge
                    size="14px"
                    p="sm"
                    bg={
                      departementData?.isActive
                        ? theme.other.secondaryColor
                        : theme.colors.myPrimary[4]
                    }
                  >
                    {departementData?.isActive ? "Active" : "Inactive"}
                  </Badge>
                </Flex>
                <Flex w="100%" direction="column" mb="lg" gap="lg">
                  {title2.map((item, index) => (
                    <Flex key={index}>
                      <Text w={200} c={theme.other.onSurfaceTertiary}>
                        {t(item)}
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
          {t("Clinics")}
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
              title={t("Clinics")}
              listItems={data.map((item) => item.name)}
              icon={<FaClinicMedical />}
            />
          </Flex>
          <Flex w="50%">
            {/* <ListComponent
              key={1}
              minwidth="50%"
              title={t("Specialties")}
              listItems={[
                'there is '
              ]}
              icon={<FaClinicMedical />}
            /> */}
          </Flex>
        </Flex>
        <Flex
          w="99%"
          direction="column"
          style={{ height: "fit-content", overflow: "auto" }}
        >
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
          <Box>
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
        <Button
          variant="filled"
          color="red"
          radius="xl"
          mt={20}
          mb="40px"
          onClick={handleDeleteEvent}
        >
          Delete
        </Button>
      </ScrollArea>
    );
};

export default DepartementDetails;
