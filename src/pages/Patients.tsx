import { useEffect, useState } from 'react';
import { Table, Text, Checkbox, ScrollArea, TextInput, Flex, Button, Select, useMantineTheme} from '@mantine/core';
import {  IconChevronLeft, IconChevronRight, IconSearch } from '@tabler/icons-react';
import data from '../data/patients.json';
import RowData from '../types/PatientsRowData';
import sortData from '../utilities/SortData';
import Th from '../Components/Table/SortOfTableHeader'
import TableBody from '../Components/Table/TableBody';
import useSelectionStore from '../store/useSelectionStore';
import Dropdown from '../Components/Dropdown';
import CompactDatePicker from '../Components/CompactDatePicker';
import { Plus, SlidersHorizontal } from 'lucide-react';
import CircledButton from '../Components/CircledButton';

const PatientsTables = () => {
    const theme = useMantineTheme();
    const [treatment, setTreatment] = useState(null);
    const [doctor, setDoctor] = useState(null);
    const [filteredData] = useState(data);
    const { selection, setSelection } = useSelectionStore();
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const totalItems = data.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const [search, setSearch] = useState('');
    const [sortedData, setSortedData] = useState(data);
    const [sortBy, setSortBy] = useState<keyof RowData | null>(null);
    const [reverseSortDirection, setReverseSortDirection] = useState(false);
    const [dateRange, setDateRange] = useState<[Date | null, Date | null]|null>([null, null]);

    const setSorting = (field: keyof RowData) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
    setSortedData(sortData(filteredData, { sortBy: field, reversed, search }));
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setSearch(value);
    setSortedData(sortData(filteredData, { sortBy, reversed: reverseSortDirection, search: value }));
  };

  const toggleAll = () =>
    setSelection((current) => (current.length === data.length ? [] : data.map((item) => item.id)));

const doctorOptions = [...new Set(data.map(p => p.doctor))].map(d => ({ value: d, label: d })).map(option => option.value);
const treatmentOptions = [...new Set(data.map(p => p.treatment))].map(t => ({ value: t, label: t })).map(option => option.value);

const resetFilters = () => {
  setDateRange([null,null]);
};

const handleChangDropDown =(e ?: any)=>{
  setDoctor(e);
  setSortedData(filteredData)
}
const handleChangeDropDownTreatment =(e ?: any)=>{
  setTreatment(e);
  setSortedData(filteredData)
}
useEffect(() => {
  let result = [...data]
  if (treatment) {
    result = result.filter(p => p.treatment === treatment);
  }
  
  if (doctor) {
    
    result = result.filter(p => p.doctor === doctor);
  }
  if (dateRange[0] && dateRange[1]) {
    result = result.filter(p => {
      if (!dateRange || !dateRange[0] || !dateRange[1]) return false;
      const [startDate, endDate] = dateRange;
      const pDate = new Date(p.date);
      return pDate >= startDate && pDate <= endDate;
    });
  }
  setDoctor(doctor);
  setTreatment(treatment);
  setDateRange(dateRange)
  setSortedData(result)
}, [ doctor , treatment ,dateRange]);
  
  const currentItems = sortedData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const rows = currentItems.map((item) => (
    <TableBody key={item.id} id={item.id} name={item.name} date={item.date} time={item.time} 
    doctor={item.doctor} treatment={item.treatment} status={item.status}/>
  ));

  const renderPagination = () => {
    const visiblePages = 3;
    const startPage = Math.max(1, currentPage - Math.floor(visiblePages / 2));
    const endPage = Math.min(totalPages, startPage + visiblePages - 1);

    return (
           <Flex visibleFrom='sm' w='95%' style={{ justifyContent: 'space-between', marginTop: '16px', padding: '10px 0' }}>
          <Flex style={{ alignItems: 'center', gap: '8px' }} >
            <Text size="sm" color="#6b7280">Showing</Text>
            <Select
              value={String(itemsPerPage)}
              onChange={(value) => {
                setItemsPerPage(Number(value));
                setCurrentPage(1);
              }}
              data={['2' , '5', '10', '15', '20']}
              size="xs"
              styles={{
                  input: {
                    border: '1px solid #e5e7eb',
                    borderRadius: '30%',
                    height: '30px',
                    width:'65px',
                    fontSize: '14px',
                    color:theme.other.onSurfacePrimary,
                    backgroundColor: theme.other.secondaryLightColor
                  }
                }}
            />

            <Text size="sm" color="#6b7280">out of {totalItems}</Text>
          </Flex>

          <Flex style={{alignItems: 'center', gap: '4px' }}>
            <button disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            style = {{ 
              backgroundColor: theme.other.secondaryLightColor, 
              color: '#6b7280',
              padding: '6px', 
              borderRadius: '50%', 
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              width: '30px',
              height: '30px'
                      }
                  }>
              <IconChevronLeft size={16} />
            </button>

            {startPage > 1 && <button onClick={() => setCurrentPage(1)}>1</button>}
            {startPage > 2 && <Text size="sm">...</Text>}
            {Array.from({ length: endPage - startPage + 1 }, (_, i) => (
              <button
                key={startPage + i}
                onClick={() => setCurrentPage(startPage + i)}
                style={{
                  width:'30px',
                  height:'30px',
                  backgroundColor: currentPage === startPage + i ? '#d1fae5' : 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '50%',
                  cursor: 'pointer'
                }}
              >
                {startPage + i}
              </button>
            ))}

            {endPage < totalPages - 1 && <Text size="sm">...</Text>}
            {endPage < totalPages && <button onClick={() => setCurrentPage(totalPages)}>{totalPages}</button>}

            <button 
            disabled={currentPage === totalPages} 
            onClick={() => setCurrentPage(currentPage + 1)}
            style = {{ 
              backgroundColor: '#e5e7eb', 
              color: '#6b7280',
              padding: '6px', 
              borderRadius: '50%', 
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              width: '30px',
              height: '30px'
                      }
                  }>
              <IconChevronRight size={16} />
            </button>
          </Flex>
      </Flex>
    );
  };

  return (
    <Flex w='95%' h='85vh' direction='column'>
      <ScrollArea>
        <Flex w='95%' visibleFrom='sm' justify={{ md: 'flex-start', lg: 'space-between' }}>
          <Flex>
            <TextInput w='180px' 
            fz='10px'
              placeholder="Search patient ,treatment "
              mb="md"
              leftSection={<IconSearch size={16} stroke={1.5} />}
              value={search}
              onChange={handleSearchChange}
              mr='10px'
            />
            <Dropdown placeHolder='Doctor' options={doctorOptions} onChange={handleChangDropDown}/>
            <Dropdown placeHolder='Treatment' options={treatmentOptions} onChange={handleChangeDropDownTreatment}  />
          </Flex>
          <Flex>
            <Flex direction='column'>
              <CompactDatePicker dateRange={dateRange} setDateRange={setDateRange}/>
              {(!dateRange?.includes(null) ) && (
                <Text mt='10px' mr='5px'  size="sm" style={{ cursor: 'pointer' }} onClick={resetFilters}>
                  Reset Filter
                </Text>
              )}
            </Flex>
            <Button variant="filled" color={theme.other.secondaryDarkColor} radius="xl" w='100px' ml='5px'> 
              <Text fw='normal' fz='11px' c={theme.other.onSurfacePrimary}> +  add Patient </Text>
            </Button>
          </Flex>
        </Flex>
        <Flex hiddenFrom='xs' align='center' h='35px' w='50%' justify='space-between'>
          <TextInput w='150px' 
              fz='10px'
                placeholder="Search patient ,treatment "
                mb="md"
                leftSection={<IconSearch size={16} stroke={1.5} />}
                value={search}
                onChange={handleSearchChange}
              />
            <Flex >
              <CircledButton margin='8px'> 
                  <SlidersHorizontal size={27} color="#1A1615"/>
              </CircledButton>
              <CircledButton>
                <Plus size={27} color="#1A1615"/>
              </CircledButton>
            </Flex>
        </Flex>
        <Table>
          <Table.Thead>
            <Table.Tr>
            <Table.Th>
                <Checkbox
                iconColor={theme.other.onSurfacePrimary}
                color={selection ? theme.other.secondaryColor : theme.other.bg}
                w='12px' h='12px' size='12px'
                  onChange={toggleAll}
                  checked={selection.length === data.length}
                  indeterminate={selection.length > 0 && selection.length !== data.length}
                />
              </Table.Th>
                <Flex w='97%'  justify='space-between'>
                  <Flex visibleFrom='md' w='30%' justify='space-between'>
                    <Th sorted={sortBy === 'id'} reversed={reverseSortDirection} onSort={() => setSorting('id')} 
                    style={{ padding:'16px 4px', color: theme.other.onSurfaceTertiary, fontWeight: 'normal' ,textAlign:'start' , width:'70px'}}>Patient ID</Th>
                    <Th sorted={sortBy === 'name'} reversed={reverseSortDirection} onSort={() => setSorting('name')}
                      style={{ padding:'16px 4px', color: theme.other.onSurfaceTertiary, fontWeight: 'normal' ,textAlign:'start' , width:'130px' }}>Name</Th>
                  </Flex>
                  <Flex w='120px' align='start' hiddenFrom='md'>
                    <Th sorted={sortBy === 'id'} reversed={reverseSortDirection} onSort={() => setSorting('id')}
                        style={{ padding:'16px 4px', color: theme.other.onSurfaceTertiary, fontWeight: 'normal' ,textAlign:'start' , width:'130px' }}>Patient</Th>
                  </Flex>
                  <Flex w={{ base: '90px', md: '148px' }}>
                    <Th sorted={sortBy === 'date'} reversed={reverseSortDirection} onSort={() => setSorting('date')}
                      style={{ padding:'16px 4px', color: theme.other.onSurfaceTertiary, fontWeight: 'normal' ,textAlign:'start' , width:'148px'}}>Last Visit</Th>
                  </Flex>
                    <Th sorted={sortBy === 'doctor'} reversed={reverseSortDirection} onSort={() => setSorting('doctor')}
                    style={{ padding:'16px 4px', color: theme.other.onSurfaceTertiary, fontWeight: 'normal' ,textAlign:'start' , width:'96px' }}>Doctors</Th>
                    <Th sorted={sortBy === 'treatment'} reversed={reverseSortDirection} onSort={() => setSorting('treatment')}
                      style={{ padding:'16px 4px', color: theme.other.onSurfaceTertiary, fontWeight: 'normal' ,textAlign:'start' , width:'106px'}}>Treatment</Th>
                    <Th sorted={sortBy === 'status'} reversed={reverseSortDirection} onSort={() => setSorting('status')}
                      style={{ padding:'16px 4px', color: theme.other.onSurfaceTertiary, fontWeight: 'normal' ,textAlign:'start' , width:'110px'}}>Status</Th>
                </Flex>
              </Table.Tr>
          </Table.Thead>
                  
              {rows}
        </Table>
      <div>
          {renderPagination()}
      </div>
      </ScrollArea>
    </Flex>
  );
}

export default PatientsTables
