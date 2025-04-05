import {
  Button,
  Flex,
  Input,
  Menu,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import { CiSearch } from "react-icons/ci";
import { IoIosArrowBack } from "react-icons/io";
import { MdArrowForwardIos, MdKeyboardArrowDown } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";

interface AppointmentHeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedDoctor: string;
  setSelectedDoctor: (doctor: string) => void;
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  setStartDate: (date: Date) => void;
  handlePreviousWeek: () => void;
  handleNextWeek: () => void;
  doctors: string[];
}

function AppointmentHeader({
  searchQuery,
  setSearchQuery,
  selectedDoctor,
  setSelectedDoctor,
  selectedDate,
  setSelectedDate,
  setStartDate,
  handlePreviousWeek,
  handleNextWeek,
  doctors,
}: AppointmentHeaderProps) {
  const theme = useMantineTheme();

  const handleDateChange = (date: Date | null) => {
    if (date) {
      setSelectedDate(date);
      setStartDate(date);
    }
  };

  return (
    <Flex justify="space-between" direction={{ base: "column", sm: "row" }}>
      <Flex>
        <Button
          fs={"Lato"}
          fw={"500"}
          lh={"105%"}
          c={theme.other.onSurfacePrimary}
          bg={theme.other.secondaryColor}
          onClick={() => {
            const today = new Date();
            setStartDate(today);
            setSelectedDate(today);
          }}
        >
          <Text>Today</Text>
        </Button>
        <DateTimePicker
          c={theme.other.onSurfacePrimary}
          fs={"Lato"}
          fw={"600"}
          value={selectedDate}
          onChange={handleDateChange}
          variant="filled"
          valueFormat="MMMM YYYY"
          clearable={false}
          rightSection={<IoIosArrowDown />}
        />
      </Flex>

      <Flex gap={"8px"}>
        <Input
          placeholder="Search patient, treatment, etc"
          value={searchQuery}
          radius="xl"
          variant={"filled"}
          onChange={(e) => setSearchQuery(e.currentTarget.value)}
          leftSection={<CiSearch size={"15px"} />}
          rightSectionPointerEvents="auto"
        />
        <Menu shadow="md" width={200}>
          <Menu.Target>
            <Button
              c={theme.other.onSurfacePrimary}
              bg={theme.other.secondaryColor}
              radius={"lg"}
              rightSection={<MdKeyboardArrowDown size={20} />}
            >
              <Text>{selectedDoctor}</Text>
            </Button>
          </Menu.Target>

          <Menu.Dropdown>
            {doctors.map((doctor) => (
              <Menu.Item
                key={doctor}
                onClick={() => setSelectedDoctor(doctor)}
                style={{
                  backgroundColor:
                    selectedDoctor === doctor
                      ? theme.other.secondaryColor
                      : "transparent",
                  color: theme.other.onSurfacePrimary,
                }}
              >
                {doctor}
              </Menu.Item>
            ))}
          </Menu.Dropdown>
        </Menu>
        <Button
          c={theme.other.onSurfacePrimary}
          bg={theme.other.secondaryDarkColor}
          radius={"xl"}
          onClick={handlePreviousWeek}
        >
          <IoIosArrowBack />
        </Button>
        <Button
          c={theme.other.onSurfacePrimary}
          bg={theme.other.secondaryDarkColor}
          radius={"xl"}
          onClick={handleNextWeek}
        >
          <MdArrowForwardIos />
        </Button>
      </Flex>
    </Flex>
  );
}

export default AppointmentHeader;
