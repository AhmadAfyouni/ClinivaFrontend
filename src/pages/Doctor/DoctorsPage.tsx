import {
  ScrollArea,
  Grid,
  useMantineTheme,
  Box,
  Center,
  Text,
  Flex,
} from "@mantine/core";
import DoctorCard from "../../Components/DoctorCard";
import AddButton from "../../Components/AddButton";
import useDoctorsCards from "../../hooks/doctor/useDoctorsCards";
import { useNavigate } from "react-router";
import { SearchInput } from "../../Components/SearchInput";
import usePaginationtStore from "../../store/Pagination/usePaginationtStore";
import CustomPagination from "../../Components/Pagination/Pagination";
import CustomFilters from "../../Components/filters/CustomFilters";
import useDropDownStore from "../../store/Dropdown/useDropDownStore ";

const DoctorsPage = () => {
  const theme = useMantineTheme();
  const pagination = usePaginationtStore();
  const { data, isFetched } = useDoctorsCards();
  console.log(data);
  const { setSelectedOption } = useDropDownStore();

  const navigate = useNavigate();

  const handleSearchChange = (e: string) => {
    pagination.setSearchKey(e);
  };

  const statusOptionsboolean = [true, false];
  const statusOptions = statusOptionsboolean.map((item) =>
    item
      ? { label: "ACTIVE", value: true }
      : { label: "INACTIVE", value: false }
  );
  const handlStatusChange = (e: string | null) => {
    setSelectedOption("DoStatus", e);
    const value = statusOptions.find((item) => item.label === e)?.value ?? null;
    pagination.setFilter(value);
  };

  if (!isFetched) {
  return (
    <Center mih="60vh">
      {/* <Text>Loading...</Text> */}
    </Center>
  );
}

if (!data || data.length === 0) {
  return (
    <Center mih="60vh">
      <Text>No Doctors Found</Text>
    </Center>
  );
}

  else
    return (
      <Box bg={theme.other.bg}>
        <Grid columns={12}>
          <Grid.Col span={10}>
            <Flex>
              <SearchInput
                searchValue={pagination.paramKey}
                setSearchValue={handleSearchChange}
                text="Search"
              />
              <CustomFilters
                IsDropDown1={true}
                dropdownName1="DoStatus"
                placeHolderDropDown1="Status"
                OptionsDropDown1={statusOptions.map((item) => item.label)}
                handlDropDownChange1={handlStatusChange}
              />
            </Flex>
          </Grid.Col>
          <Grid.Col span={2}>
            <AddButton
              text="AddDoctors"
              handleOnClick={() => navigate(`/doctors/add`)}
            />
          </Grid.Col>
        </Grid>
        <ScrollArea bg={theme.other.bgSubtle} h={600} offsetScrollbars>
          <Grid>
            {data.map((doctor, index) => (
              <DoctorCard
                key={index}
                doctor={doctor}
                onClick={() => navigate(`/doctors/details/${doctor._id}`)}
              />
            ))}
          </Grid>
          <CustomPagination store={pagination} />
        </ScrollArea>
      </Box>
    );
};

export default DoctorsPage;
