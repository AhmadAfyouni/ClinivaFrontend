import { Button, Flex, useMantineTheme ,Text} from '@mantine/core'
import { SearchInput } from './SearchInput'
import { Plus, SlidersHorizontal } from 'lucide-react'
import CircledButton from './CircledButton'
import Dropdown from './Dropdown'
import CompactDatePicker from './CompactDatePicker'

interface Props{
    search : string
    handleSearchChange : (sea: string) => void
    doctorOptions:string[]
    handleChangDropDownDoctor: (e: string | null)=>void
    treatmentOptions:string[]
    handleChangeDropDownTreatment: (e: string | null)=>void
    dateRange:[Date | null, Date | null] |null;
    setDateRange : (date:[Date | null, Date | null]|null) => void

}
const MultiFilters = ({search,handleSearchChange , doctorOptions,handleChangDropDownDoctor,
    treatmentOptions,handleChangeDropDownTreatment,dateRange,setDateRange}:Props) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const theme = useMantineTheme()
  return (
    <>
    <Flex
        w="95%"
        visibleFrom="sm"
        justify={{ md: "flex-start", lg: "space-between" }}
        >
        <Flex>
          <SearchInput
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
        hiddenFrom="xs"
        align="center"
        h="35px"
        w="50%"
        justify="space-between"
        >
        <SearchInput searchValue={search} setSearchValue={handleSearchChange} />
        <Flex>
          <CircledButton margin="8px" bg={theme.other.secondaryLightColor}>
            <SlidersHorizontal size={27} color="#1A1615" />
          </CircledButton>
          <CircledButton bg={theme.other.secondaryDarkColor}>
            <Plus size={27} color="#1A1615" />
          </CircledButton>
        </Flex>
      </Flex>
    </>
  )
}

export default MultiFilters