import { useEffect, useState } from 'react';
import {ScrollArea, TextInput,Grid,  Group, useMantineTheme,Box, Flex } from '@mantine/core';
import doctors from '../../data/doctors.json'
import PaginationPage from '../../Components/PaginationRow';
import DoctorCard from '../../Components/DoctorCard';
import Dropdown from '../../Components/Dropdown';
import Doctor from '../../types/Doctor';
import { IconSearch } from '@tabler/icons-react';
import filterData from '../../utilities/FilterData';
import MobileFilters from '../../Components/mobliefilters';
import AddButton from '../../Components/addButton';

const DoctorsPage = () => {
  const [filteredData, setFilteredData] = useState<Doctor[]>([]);
  const [search, setSearch] = useState('');
  const [activePage, setActivePage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState<string | null>('10');
  const [department, setDepartment] = useState<string | null>(null);
  const [specialty, setSpecialty] = useState<string | null>(null);

  const theme = useMantineTheme()
  const itemsPerPageNumber = parseInt(itemsPerPage?? "0");
  const totalPages = Math.ceil(filteredData.length / itemsPerPageNumber);
  const startIndex = (activePage - 1) * itemsPerPageNumber;
  const endIndex = startIndex + itemsPerPageNumber;
  const displayedDoctors = filteredData.slice(startIndex, endIndex);
  const totalItems = displayedDoctors.length;

    const departmentOptions = [...new Set(doctors.map((p) => p.department))].map((d) => ({ value: d, label: d }))
      .map((option) => option.value);

    const specialtyOptions = [...new Set(doctors.map((p) => p.specialty))].map((t) => ({ value: t, label: t }))
      .map((option) => option.value);

      const handleChangDropDownDepartment = (e: string | null) => {
        setDepartment(e);
      };
      const handleChangeDropDownSpecialty = (e: string | null) => {
        setSpecialty(e);
      };
      useEffect(() => {
        let result = [...doctors];
        if (department) {
          result = result.filter((p) => p.department ===  department);
        }
    
        if (specialty) {
          result = result.filter((p) => p.specialty === specialty);
        }
        setSpecialty(specialty);
        setDepartment(department);
        setFilteredData(result)
      }, [department , specialty]);
    
      const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
          const  result = [...doctors];
          const value  = event.currentTarget.value;
          setSearch(value)
          setFilteredData(filterData(result,value)) 
        };

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
              <Group justify='end' visibleFrom='sm'>
                <Dropdown
                    placeHolder="department"
                    options={departmentOptions.map(String)}
                    onChange={handleChangDropDownDepartment}
                    />
                  <Dropdown
                    placeHolder="specialty"
                    options={specialtyOptions}
                    onChange={handleChangeDropDownSpecialty}
                    />
              </Group>
              <Flex justify='end' hiddenFrom='sm'>
                <MobileFilters/>
                <AddButton/>
              </Flex>
                
            </Grid.Col>
          </Grid>
          <ScrollArea bg={theme.other.bgSubtle} h={600} offsetScrollbars>
            <DoctorCard displayedDoctors={displayedDoctors}/>
            <PaginationPage activePage={activePage} itemsPerPage={itemsPerPage} setActivePage={setActivePage} 
            setItemsPerPage={setItemsPerPage} totalItems={totalItems} totalPages={totalPages} />
          </ScrollArea>
      </Box>
  );
};

export default DoctorsPage;