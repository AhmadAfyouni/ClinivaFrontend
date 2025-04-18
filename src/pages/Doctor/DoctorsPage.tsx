import {
  ScrollArea,
  Grid,
  useMantineTheme,
  Box,
  Center,
  Text,
} from "@mantine/core";
import DoctorCard from "../../Components/DoctorCard";
import AddButton from "../../Components/AddButton";
import useDoctorsCards from "../../hooks/doctor/useDoctorsCards";
import { useNavigate } from "react-router";
import { SearchInput } from "../../Components/SearchInput";
import usePaginationtStore from "../../store/Pagination/usePaginationtStore";
import CustomPagination from "../../Components/Pagination/Pagination";

const DoctorsPage = () => {
  const theme = useMantineTheme();
  const pagination = usePaginationtStore();
  const { data, isFetched } = useDoctorsCards();
  console.log(data);
  const navigate = useNavigate();

  const handleSearchChange = (e: string) => {
    pagination.setSearchKey(e);
  };

  if (!isFetched || !data)
    return (
      <Center>
        <Text>No Doctors Found</Text>
      </Center>
    );
  else
    return (
      <Box bg={theme.other.bg}>
        <Grid columns={12}>
          <Grid.Col span={10}>
            <SearchInput
              searchValue={pagination.paramKey}
              setSearchValue={handleSearchChange}
              text="Search"
            />
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
            {data.map((doctor) => (
              <DoctorCard
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
