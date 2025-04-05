import {
  Text,
  Group,
  Box,
  Flex,
  useMantineTheme,
  Divider,
  ScrollArea,
} from "@mantine/core";
import { IconClock } from "@tabler/icons-react";

const AppointmentSchedule = () => {
  const theme = useMantineTheme();
  const appointments = [
    {
      date: "Tuesday, 12 Sep 2028",
      time: "9:00 AM",
      name: "Sarah Miller",
      treatment: "Facial Rejuvenation",
    },
    {
      date: "Thursday, 14 Sep 2028",
      time: "10:00 AM",
      name: "Claire Thompson",
      treatment: "Lip Fillers",
    },
    {
      date: "Friday, 15 Sep 2028",
      time: "2:00 PM",
      name: "Hannah Lee",
      treatment: "Acne Treatment",
    },
    {
      date: "Saturday, 16 Sep 2028",
      time: "11:00 AM",
      name: "Ethan Hughes",
      treatment: "Tattoo Removal",
    },
    {
      date: "Thursday, 14 Sep 2028",
      time: "10:00 AM",
      name: "Claire Thompson",
      treatment: "Lip Fillers",
    },
    {
      date: "Friday, 15 Sep 2028",
      time: "2:00 PM",
      name: "Hannah Lee",
      treatment: "Acne Treatment",
    },
    {
      date: "Saturday, 16 Sep 2028",
      time: "11:00 AM",
      name: "Ethan Hughes",
      treatment: "Tattoo Removal",
    },
  ];

  return (
    <Box w="100%" maw="400px" m="0 20px" bg={theme.other.bg}>
      <Text fw={600} fz="lg" c={theme.other.onSurfacePrimary} mb="20px">
        Schedule
      </Text>
      <ScrollArea h={480} w="100%">
        <Flex direction="column">
          {appointments.map((appointment, index) => (
            <Flex key={index} direction="column" gap="xs" mb="8px">
              <Flex direction="row" justify="space-between">
                <Text
                  mb="4px"
                  c={theme.other.onSurfacePrimary}
                  bg={theme.other.secondaryColor}
                  style={{
                    padding: "4px 8px",
                    borderRadius: "15px",
                    fontSize: "0.75rem",
                    alignSelf: "flex-start",
                  }}
                >
                  {appointment.date}
                </Text>

                <Group gap="xs" align="center">
                  <IconClock size={16} color="gray" />
                  <Text fz="sm" c={theme.other.onSurfaceSecondary}>
                    {appointment.time}
                  </Text>
                </Group>
              </Flex>
              <Flex
                bg={theme.other.bgSubtle}
                p="12px"
                gap="12px"
                style={{
                  borderRadius: "8px",
                  alignItems: "center",
                }}
              >
                <Box
                  w="40px"
                  h="40px"
                  style={{
                    borderRadius: "50%",
                    backgroundColor: "#FFDFDF",
                  }}
                />

                <Flex direction="column" style={{ flex: 1 }}>
                  <Text fw={600} c={theme.other.onSurfacePrimary}>
                    {appointment.name}
                  </Text>
                  <Text fz="sm" c={theme.other.onSurfaceSecondary}>
                    {appointment.treatment}
                  </Text>
                </Flex>
              </Flex>
              <Divider w="90%" h="2px" />
            </Flex>
          ))}
        </Flex>
      </ScrollArea>
    </Box>
  );
};

export default AppointmentSchedule;
