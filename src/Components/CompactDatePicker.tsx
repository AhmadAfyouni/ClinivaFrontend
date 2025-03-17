import { useState } from 'react';
import { ChevronDown, Calendar } from 'lucide-react';
import { Popover, Text, Group, Button, useMantineTheme } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import '@mantine/dates/styles.css';
interface Props{
  dateRange : [Date |null,Date |null] | null ,
  setDateRange : (value: [Date | null, Date | null]|null) => void
}
const CompactDatePicker = ({dateRange,setDateRange}:Props) => {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);

  const formatRange = (range: [Date | null, Date | null]|null) => {
    if (!range[0] || !range[1]) return 'Select date range';

    const formatDate = (date: Date) => date.toLocaleDateString('en-GB', {
      day: 'numeric',
    });

    const formatMonthYear = (date: Date) => date.toLocaleDateString('en-GB', {
      month: 'long',
      year: 'numeric',
    });

    return `${formatDate(range[0])}-${formatDate(range[1])} ${formatMonthYear(range[1])}`;
  };

  const handleDateChange = (value: [Date | null, Date | null] | null) => {
    if (value) setDateRange(value);
  };

  return (
    <div style={{ width: '150px'}}>
      <Popover
        position="bottom"
        shadow="md"
        radius="md"
        opened={opened}
        onChange={setOpened}
        withinPortal
      >
        <Popover.Target>
          <Button
            fullWidth 
            
            variant="default"
            onClick={() => setOpened((o) => !o)}
            rightSection={<ChevronDown size={18} />}
            leftSection={<Calendar size={18} />}
            styles={{
              root: {
                fontSize:'11px',
                color:theme.other.onSurfacePrimary,
                padding: '8px 16px',
                background: theme.other.secondaryLightColor,
                justifyContent: 'space-between',
                border: '1px solid #a3d4af',
                borderRadius: '16px',
              },
              inner: {
                width: '100%',
                justifyContent: 'space-between'
              }
            }}
          >
            <Text size="sm" fw={500} fz='12px'>
              {formatRange(dateRange)}
            </Text>
          </Button>
        </Popover.Target>

        <Popover.Dropdown p={0}>
          <DatePicker
            type="range"
            value={dateRange|| [null, null]}
            onChange={handleDateChange}
            numberOfColumns={1}  
            allowSingleDateInRange={false}
            styles={{
              calendarHeader: { 
                backgroundColor: '#f8fafc',
                marginBottom: 8
              },
              day: { borderRadius: 4 },
            }}
          />

          <Group p="sm" style={{ borderTop: '1px solid #f1f5f9', justifyContent: 'flex-end' }}>
            <Button 
              variant="light"
              size="sm"
              onClick={() => setOpened(false)}
              color={theme.other.secondaryDarkColor}
            >
              Apply
            </Button>
          </Group>
        </Popover.Dropdown>
      </Popover>
    </div>
  );
};

export default CompactDatePicker;
