import {
  Card,
  Text,
  Group,
  Stack,
  Button,
  Divider,
  Grid,
  ActionIcon,
  useMantineTheme,
  Flex,
  ScrollArea,
} from "@mantine/core";
import { IconDotsVertical } from "@tabler/icons-react";
interface Props {
  aboutPatient: string;
  patientId: string;
  gender: string;
  birthday: string;
  maritalStatus: string;
}
function PatientInfoCard({
  aboutPatient,
  patientId,
  maritalStatus,
  birthday,
  gender,
}: Props) {
  const theme = useMantineTheme();
  return (
    <Card
      p="lg"
      radius="sm"
      withBorder={false}
      maw={400}
      mx="auto"
      styles={{
        root: {
          backgroundColor: theme.other.bgSubtle,
          boxShadow: "none",
        },
      }}
    >
      <Group justify="space-between" mb={20}>
        <Text fw={600} size="md" c={theme.other.onSurfacePrimary}>
          General Info
        </Text>
        <ActionIcon variant="transparent" color="gray">
          <IconDotsVertical size={16} stroke={1.5} />
        </ActionIcon>
      </Group>

      <Stack gap={4} mb={10} w="100%">
        <Text fw={500} size="sm" c={theme.other.onSurfaceTertiary} mb={8}>
          About Patient
        </Text>
        <ScrollArea h={{ md: "90px", xs: "120px" }}>
          <Text
            size="sm"
            style={{ lineHeight: 1.8 }}
            c={theme.other.onSurfacePrimary}
          >
            {aboutPatient}
          </Text>
        </ScrollArea>
      </Stack>

      <Divider color={theme.other.onSurfaceTertiary} />

      <Grid gutter={0} pt={16} pb={8}>
        <Grid.Col span={12}>
          <Flex justify="space-between" mb={18}>
            <Text fw={500} size="sm" c={theme.other.onSurfaceTertiary}>
              ID Patient
            </Text>
            <Text size="sm" c={theme.other.onSurfacePrimary}>
              {patientId}
            </Text>
          </Flex>
        </Grid.Col>
        <Grid.Col span={12}>
          <Flex justify="space-between" mb={18}>
            <Text fw={500} size="sm" c={theme.other.onSurfaceTertiary}>
              Gender
            </Text>
            <Text size="sm" c={theme.other.onSurfacePrimary}>
              {gender}
            </Text>
          </Flex>
        </Grid.Col>
        <Grid.Col span={12} mb={18}>
          <Flex justify="space-between">
            <Text fw={500} size="sm" c={theme.other.onSurfaceTertiary}>
              Birthday
            </Text>
            <Text size="sm" c={theme.other.onSurfacePrimary}>
              {birthday}
            </Text>
          </Flex>
        </Grid.Col>
        <Grid.Col span={12} mb={18}>
          <Flex justify="space-between">
            <Text fw={500} size="sm" c={theme.other.onSurfaceTertiary}>
              maritalStatus
            </Text>
            <Text size="sm" c={theme.other.onSurfacePrimary}>
              {maritalStatus}
            </Text>
          </Flex>
        </Grid.Col>
      </Grid>

      <Button
        fullWidth
        mt={12}
        mb={4}
        radius="xl"
        h={48}
        bg={theme.other.secondaryColor}
        c={theme.other.onSurfacePrimary}
        variant="filled"
        styles={{
          root: {
            border: "none",
            boxShadow: "none",
            "&:hover": {
              backgroundColor: "#d1efe0",
            },
          },
          label: {
            fontWeight: 500,
            fontSize: "14px",
          },
        }}
      >
        Edit Patient Data
      </Button>
    </Card>
  );
}

export default PatientInfoCard;
