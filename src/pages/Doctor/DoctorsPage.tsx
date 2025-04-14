import { useEffect, useState } from "react";
import {
  ScrollArea,
  Grid,
  useMantineTheme,
  Box,
  Flex,
  Center,
  Text,
  TextInput,
  Group,
} from "@mantine/core";
import DoctorCard from "../../Components/DoctorCard";
import MobileFilters from "../../Components/mobliefilters";
import AddButton from "../../Components/AddButton";
import useDoctorsCards from "../../hooks/doctor/useDoctorsCards";
import { useNavigate } from "react-router";
import { IconSearch } from "@tabler/icons-react";
import Dropdown from "../../Components/Dropdown";

const DoctorsPage = () => {
  const theme = useMantineTheme();
  const { data, isFetched } = useDoctorsCards();
  console.log(data);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const [department, setDepartment] = useState<string | null>(null);

  useEffect(() => {
    if (department) {
      setDepartment(department);
      // result = result.filter((p) => p.status === status);
    }

    setDepartment(department);
  }, [department]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  console.log(search);

  if (!data) return null;

  console.log("doctor and clinics are" + data.map((p) => p.clinics));
  const departmentOptions = [...new Set(data.map((p) => p.identity))];

  // const departmentOptions = [...new Set(doctors.map((p) => p.department))]
  //   .map((d) => ({ value: d, label: d }))
  //   .map((option) => option.value);

  const handleChangDropDownDepartment = (e: string | null) => {
    setDepartment(e);
  };
  // const handleChangeDropDownSpecialty = (e: string | null) => {
  //   setSpecialty(e);
  // };

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
          <Grid.Col span={6}>
            <TextInput
              w="180px"
              fz="10px"
              placeholder="Search patient ,treatment "
              mb="md"
              leftSection={<IconSearch size={16} stroke={1.5} />}
              value={search}
              onChange={handleSearchChange}
              mr="10px"
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <Group justify="end" visibleFrom="sm">
              <Dropdown
                placeHolder="department"
                options={departmentOptions.map(String)}
                onChange={handleChangDropDownDepartment}
              />
              {/* <Dropdown
                placeHolder="specialty"
                options={specialtyOptions}
                onChange={handleChangeDropDownSpecialty}
              /> */}
            </Group>
            <Flex justify="end" hiddenFrom="sm">
              <MobileFilters />
              <AddButton text="AddDoctors" />
            </Flex>
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
        </ScrollArea>
      </Box>
    );
};

export default DoctorsPage;
