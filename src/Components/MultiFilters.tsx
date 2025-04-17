import { Button, Flex, useMantineTheme, Text } from "@mantine/core";
import { SearchInput } from "./SearchInput";
import Dropdown from "./Dropdown";
import CompactDatePicker from "./CompactDatePicker";
import MobileFilters from "./mobliefilters";
import AddButton from "./AddButton";

interface Props {
  search: string;
  handleSearchChange: (sea: string) => void;
  doctorOptions: string[];
  handleChangDropDownDoctor: (e: string | null) => void;
  treatmentOptions: string[];
  handleChangeDropDownTreatment: (e: string | null) => void;
  dateRange: [Date | null, Date | null] | null;
  setDateRange: (date: [Date | null, Date | null] | null) => void;
}
const MultiFilters = ({
  search,
  handleSearchChange,
  doctorOptions,
  handleChangDropDownDoctor,
  treatmentOptions,
  handleChangeDropDownTreatment,
  dateRange,
  setDateRange,
}: Props) => {
  const theme = useMantineTheme();
  return (
    <>
      <Flex
        w="95%"
        visibleFrom="sm"
        justify={{ md: "flex-start", lg: "space-between" }}
      >
        <Flex>
          <SearchInput
            text=""
            searchValue={search}
            setSearchValue={handleSearchChange}
          />
          <Dropdown
            placeHolder="Doctor"
            options={doctorOptions}
            onChange={handleChangDropDownDoctor}
          />
          <Dropdown
            placeHolder="Treatment"
            options={treatmentOptions}
            onChange={handleChangeDropDownTreatment}
          />
        </Flex>
        <Flex>
          <Flex direction="column">
            <CompactDatePicker
              dateRange={dateRange}
              setDateRange={setDateRange}
            />
          </Flex>
          <Button
            variant="filled"
            color={theme.other.secondaryDarkColor}
            radius="xl"
            w="100px"
            ml="5px"
          >
            <Text fw="normal" fz="11px" c={theme.other.onSurfacePrimary}>
              + add Patient
            </Text>
          </Button>
        </Flex>
      </Flex>
      <Flex
        hiddenFrom="sm"
        align="center"
        w="90%"
        h="35px"
        justify="space-between"
      >
        <SearchInput
          searchValue={search}
          setSearchValue={handleSearchChange}
          text={""}
        />
        <Flex justify={"end"}>
          <MobileFilters />
          <AddButton
            text="Add Patient"
            handleOnClick={() => console.log("MultiFilters")}
          />
        </Flex>
      </Flex>
    </>
  );
};

export default MultiFilters;
