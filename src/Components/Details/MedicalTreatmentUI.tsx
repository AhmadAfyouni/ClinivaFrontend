import {
  Box,
  Card,
  Group,
  Text,
  Stack,
  Badge,
  Grid,
  useMantineTheme,
  ScrollArea,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconCalendar } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
interface TreatmentProps {
  scheduleStatus: string;
  scheduleTreatment: string;
  scheduleDate: string;
}
interface ScheduleProps {
  scheduleId: string;
  scheduleStatus: string;
  scheduleTreatment: string;
  scheduleDate: string;
}
interface Props {
  upcomingAndHistorySchedule: ScheduleProps[];
  noteText?: string;
}
function MedicalTreatment({ upcomingAndHistorySchedule, noteText }: Props) {
  const { t } = useTranslation();
  const theme = useMantineTheme();
  const isMobile = useMediaQuery("(max-width: 576px)");
  const isTablet = useMediaQuery("(min-width: 577px) and (max-width: 992px)");
  const history: ScheduleProps[] = [];
  const upcoming: ScheduleProps[] = [];
  upcomingAndHistorySchedule.map((item) =>
    new Date(item.scheduleDate) <= new Date()
      ? history.push(item)
      : upcoming.push(item)
  );
  // Component for treatment card (reused for both upcoming and history)
  const TreatmentCard = ({
    scheduleStatus,
    scheduleTreatment,
    scheduleDate,
  }: TreatmentProps) => (
    <Card radius="md" bg={theme.other.bgSubtle} mb="xs">
      <Stack gap="md">
        <Group gap={8}>
          <Badge
            radius="xl"
            px="md"
            style={{
              backgroundColor:
                scheduleStatus === "Scheduled"
                  ? theme.colors.myPrimary[3]
                  : theme.other.secondaryColor,
              color: theme.other.onSurfacePrimary,
              fontWeight: 500,
              fontSize: "12px",
            }}
            leftSection={
              <Box
                w={8}
                h={8}
                mr={4}
                style={{
                  borderRadius: "50%",
                  backgroundColor:
                    scheduleStatus === "Scheduled"
                      ? theme.colors.myPrimary[6]
                      : theme.other.secondaryDarkColor,
                }}
              />
            }
          >
            {scheduleStatus}
          </Badge>
        </Group>

        <Text fw={600} size="15px" c={theme.other.onSurfacePrimary}>
          {scheduleTreatment}
        </Text>

        <Group gap={8} mt={2}>
          <IconCalendar size={18} color={theme.other.onSurfaceSecondary} />
          <Text size="sm" c={theme.other.onSurfaceSecondary}>
            {new Date(scheduleDate).toLocaleString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              hour12: false, // Use 24-hour time format
            })}
          </Text>
        </Group>
      </Stack>
    </Card>
  );

  return (
    <>
      {/* Header Section */}
      <Text fw={600} size="16px" c={theme.other.onSurfacePrimary}>
        {t("Treatment")}
      </Text>
      <Grid columns={6}>
        <Grid.Col span={isMobile ? 6 : isTablet ? 2 : 6} mt={10}>
          {/* Upcoming Section */}
          <Text fw={500} size="15px" c={theme.other.onSurfacePrimary} mb={15}>
            {t("Upcoming")}
          </Text>
          <ScrollArea h="250px" mb={10}>
            {upcoming.map((item) => (
              <TreatmentCard
                key={item.scheduleId}
                scheduleStatus={item.scheduleStatus}
                scheduleTreatment={item.scheduleTreatment}
                scheduleDate={item.scheduleDate}
              />
            ))}
          </ScrollArea>
        </Grid.Col>
        {/* History Section */}
        <Grid.Col span={isMobile ? 6 : isTablet ? 2 : 6} mt={10}>
          <Text fw={500} size="15px" c={theme.other.onSurfacePrimary} mb="md">
            {t("History")}
          </Text>
          <ScrollArea h="250px" mb={10}>
            {history.map((item) => (
              <TreatmentCard
                key={item.scheduleId}
                scheduleStatus={item.scheduleStatus}
                scheduleTreatment={item.scheduleTreatment}
                scheduleDate={item.scheduleDate}
              />
            ))}
          </ScrollArea>
        </Grid.Col>

        {/* Notes Section */}
        <Grid.Col span={isMobile ? 6 : isTablet ? 2 : 6}>
          <Box>
            <Text
              fw={500}
              size="sm"
              mb="xs"
              c={theme.other.onSurfacePrimary}
              mt={15}
            >
              {t("Notes")}
            </Text>
            <Card
              shadow="sm"
              p="md"
              radius="md"
              withBorder
              bg={theme.other.bgSubtle}
            >
              <Text size="sm" c={theme.other.onSurfaceSecondary} mb="xs">
                2028/09/12 - 12:00 PM
              </Text>
              <ScrollArea>
                <Text size="sm" h="100px" c={theme.other.onSurfacePrimary}>
                  {noteText}
                </Text>
              </ScrollArea>
            </Card>
          </Box>
        </Grid.Col>
      </Grid>
    </>
  );
}

export default MedicalTreatment;
