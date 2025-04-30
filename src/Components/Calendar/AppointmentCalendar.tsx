import { Box, Center, Table, useMantineTheme } from "@mantine/core";
import CardDate from "./CardDate";
import AppointmentCard from "./AppointmentCard";
import AppointmentType from "../../types/Appointment/AppointmentType";

interface AppointmentCalendarProps {
  days: {
    day: string;
    year: number;
    month: number;
    dayNumber: number;
    weekday: string;
  }[];
  timeSlots: string[];
  appointments: AppointmentType[];
  selectedCell: { date: string; time: string } | null;
  handleCellClick: (day: string, time: string) => void;
  handleAppointmentClick: (appointment: AppointmentType) => void;
  getAppointments: (day: string, time: string) => AppointmentType[];
}

function AppointmentCalendar({
  days,
  timeSlots,
  selectedCell,
  handleCellClick,
  handleAppointmentClick,
  getAppointments,
}: AppointmentCalendarProps) {
  const theme = useMantineTheme();

  return (
    <Table.ScrollContainer minWidth={"10%"} w={"100%"}>
      <Table striped withRowBorders={false}>
        <Table.Thead>
          <Table.Tr>
            <Table.Th></Table.Th>
            {days.map((day) => (
              <Table.Th align="center" key={day.day}>
                <Center w={"100%"}>
                  <CardDate
                    weakDay={day.weekday}
                    month={day.dayNumber.toString()}
                  />
                </Center>
              </Table.Th>
            ))}
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {timeSlots.map((time) => (
            <Table.Tr key={time}>
              <Table.Td h={"75px"}>{time}</Table.Td>
              {days.map((day) => (
                <Table.Td
                  align="center"
                  key={day.day}
                  className="calendar-cell"
                  style={{
                    position: "relative",
                    height: "75px",
                    zIndex: "1",
                    cursor: "pointer",
                    backgroundColor:
                      selectedCell?.date === day.day &&
                      selectedCell?.time === time
                        ? theme.other.secondaryColor
                        : undefined,
                  }}
                  onClick={() => {
                    // console.log(day.day, time);
                    handleCellClick(day.day, time);
                  }}
                >
                  {/* Horizontal line in middle */}
                  <Box
                    style={{
                      position: "absolute",
                      left: 0,
                      right: 0,
                      top: "50%",
                      borderBottom: "2px solid var(--mantine-color-gray-3)",
                      pointerEvents: "none",
                      zIndex: "-1",
                    }}
                  />

                  <Center w={"100%"}>
                    {getAppointments(day.day, time).map((appointment) => (
                      <AppointmentCard
                        key={appointment._id}
                        patientName={appointment.patient.name}
                        treatment={appointment.reason}
                        time={time}
                        variant="pink"
                        onClick={() => handleAppointmentClick(appointment)}
                      />
                    ))}
                  </Center>
                </Table.Td>
              ))}
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
}

export default AppointmentCalendar;
