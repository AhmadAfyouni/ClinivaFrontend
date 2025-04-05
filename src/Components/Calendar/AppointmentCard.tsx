import { Paper, Text, Box, useMantineTheme, Flex, Avatar } from "@mantine/core";
import icon1 from "../../assets/icons/CalenderIcon1.svg";
import icon2 from "../../assets/icons/CalenderIcon2.svg";

interface AppointmentCardProps {
  patientName: string;
  treatment: string;
  time: string;
  onClick?: () => void;
  variant?: "pink" | "mint";
}

const AppointmentCard = ({
  patientName,
  treatment,
  time,
  onClick,
  variant = "pink",
}: AppointmentCardProps) => {
  const borderColor = variant === "pink" ? "#FFE4E6" : "#D1FAE5";
  const theme = useMantineTheme();

  return (
    <Paper
      p="5px"
      radius="md"
      onClick={onClick}
      style={{
        backgroundColor: theme.other.calenderCard1,
        border: `1px solid ${borderColor}`,
        cursor: onClick ? "pointer" : "default",
        // width: "170px",
      }}
    >
      <Box>
        <Flex align="center" justify="start" gap={"sm"}>
          <Avatar size={"sm"} src="https://i.pravatar.cc/100" />

          <Text size="sm" c={theme.other.onSurfacePrimary} fw={500}>
            {patientName}
          </Text>
        </Flex>
        <Flex
          pt={"md"}
          gap={"4px"}
          direction={"column"}
          align="start"
          justify="space-between"
          mt={4}
        >
          <Flex
            c={theme.other.onSurfaceSecondary}
            align="start"
            justify="start"
            gap={"xs"}
          >
            <Avatar size={"xs"} src={icon1} />
            <Text size="xs" c={theme.other.onSurfaceSecondary} fw={400}>
              {treatment}
            </Text>
          </Flex>
          <Flex align="start" justify="start" gap={"xs"}>
            <Avatar
              c={theme.other.onSurfaceSecondary}
              size={"xs"}
              src={icon2}
            />
            <Text size="md" c={theme.other.onSurfaceSecondary} fw={400}>
              {time}
            </Text>
          </Flex>
        </Flex>
      </Box>
    </Paper>
  );
};

export default AppointmentCard;
