import {
  Container,
  MantineTheme,
  Paper,
  ScrollArea,
  Table,
  useMantineTheme,
} from "@mantine/core";
import React from "react";
interface WorkingHour {
  day: string;
  startTime: string;
  endTime: string;
}
const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const dayMap: Record<string, string> = {
  Mon: "Monday",
  Tue: "Tuesday",
  Wed: "Wednesday",
  Thu: "Thursday",
  Fri: "Friday",
  Sat: "Saturday",
  Sun: "Sunday",
};

// Hours from 8 AM to 11 PM
const generateHoursArray = (start: number, end: number) => {
  return Array.from({ length: end - start }, (_, i) => start + i);
};
const allHours = generateHoursArray(8, 24);

// Convert 24-hour int to formatted time
const formatHour = (hour: number) =>
  `${hour % 12 || 12}${hour >= 12 ? "PM" : "AM"}`;

// Convert "09:00 AM" to 24-hour int
const parseHour = (timeStr: string): number => {
  const [time, period] = timeStr.split(" ");
  let [hour] = time.split(":").map(Number);
  if (period === "PM" && hour !== 12) hour += 12;
  if (period === "AM" && hour === 12) hour = 0;
  return hour;
};

interface Props {
  workingHours: WorkingHour[];
}
const WorkingSchedule = ({ workingHours }: Props) => {
  const theme = useMantineTheme();

  const getHourStyle = (
    theme: MantineTheme,
    day: string,
    hour: number
  ): React.CSSProperties => {
    const fullDay = dayMap[day];
    const ranges = workingHours.filter((wh) => wh.day === fullDay);
    for (const range of ranges) {
      const start = parseHour(range.startTime);
      const end = parseHour(range.endTime);
      if (hour >= start && hour < end) {
        const isStart = hour === start;
        const isEnd = hour === end - 1;
        return {
          backgroundColor: theme.colors.myPrimary[3],
          color: theme.other.onSurfacePrimary,
          borderRadius: isStart ? "5px 0 0 5px" : isEnd ? "0 5px 5px 0" : "0",
          borderRight:
            hour < end - 1 ? `2px solid ${theme.colors.myPrimary[4]}` : "none",
          marginRight: hour < end - 1 ? "-2px" : "0",
        };
      }
    }
    return {};
  };
  return (
    <Container size="md" w="95%" bg={theme.other.bg}>
      <Paper p="lg" bg={theme.other.bgSubtle} w="95%">
        <ScrollArea>
          <Table>
            <Table.Thead>
              <Table.Tr>
                <Table.Th c={theme.other.onSurfacePrimary}>Day</Table.Th>
                {allHours.map((hour) => (
                  <Table.Th
                    c={theme.other.onSurfaceSecondary}
                    miw={60}
                    ta="center"
                    key={hour}
                  >
                    {formatHour(hour)}
                  </Table.Th>
                ))}
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody c={theme.other.onSurfacePrimary}>
              {days.map((day) => (
                <Table.Tr key={day}>
                  <Table.Td fw={600}>{day}</Table.Td>
                  {allHours.map((hour) => (
                    <Table.Td
                      h={40}
                      p={0}
                      c={theme.other.onSurfaceSecondary}
                      pos="relative"
                      key={`${day}-${hour}`}
                      style={{
                        ...getHourStyle(theme, day, hour),
                      }}
                    ></Table.Td>
                  ))}
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </ScrollArea>
      </Paper>
    </Container>
  );
};

export default WorkingSchedule;
