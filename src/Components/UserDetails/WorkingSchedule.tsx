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

const generateHoursArray = (startHour: number, endHour: number) => {
  const hours = [];
  let current = startHour;
  while (true) {
    hours.push(current);
    if (current === endHour) break;
    current = (current + 1) % 24;
  }
  return hours;
};

const formatHour = (hour: number) => {
  const twelveHour = hour % 12 || 12;
  const period = hour < 12 ? "AM" : "PM";
  return `${twelveHour} ${period}`;
};

const parseHour = (timeStr: string): number => {
  const [time, period] = timeStr.split(" ");
  const [hourStr] = time.split(":");
  let hour = parseInt(hourStr, 10);

  if (period === "PM" && hour !== 12) hour += 12;
  if (period === "AM" && hour === 12) hour = 0;

  return hour;
};

interface Props {
  workingHours: WorkingHour[];
}

const WorkingSchedule = ({ workingHours }: Props) => {
  const theme = useMantineTheme();
  if (workingHours === undefined || workingHours.length === 0) return null;
  const maxStartTime = workingHours.reduce(
    (max, wh) => (wh.startTime > max ? wh.startTime : max),
    workingHours[0]?.startTime || ""
  );

  const maxEndTime = workingHours.reduce(
    (max, wh) => (wh.endTime > max ? wh.endTime : max),
    workingHours[0]?.endTime || ""
  );
  const starthour = parseHour(maxStartTime);
  const endhours = parseHour(maxEndTime);
  console.log(endhours);
  const allHours = generateHoursArray(starthour, endhours);

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

      if (hour >= start && hour <= end) {
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
                      pos="relative"
                      key={`${day}-${hour}`}
                      style={getHourStyle(theme, day, hour)}
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
