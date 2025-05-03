import { useState } from "react";
import {
  Box,
  Text,
  Paper,
  ScrollArea,
  Stack,
  Container,
  // ActionIcon,
  Flex,
  // Menu,
  useMantineTheme,
} from "@mantine/core";
import { IconFileText } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";

export function HealthReportList() {
  const { t } = useTranslation();
  const [reports] = useState([
    { id: 1, title: "Skin Test Report", type: "PDF", size: "1 MB", file: null },
    {
      id: 2,
      title: "Laser Hair Removal Pre-treatment",
      type: "PDF",
      size: "500 KB",
      file: null,
    },
    {
      id: 3,
      title: "Allergy Assessment",
      type: "PDF",
      size: "450 KB",
      file: null,
    },
  ]);

  const theme = useMantineTheme();
  return (
    <Container size="sm" p="md" bg={theme.other.bgSubtle}>
      <Flex justify="space-between" align="center" mb="md">
        <Text fw={600} size="lg" c={theme.other.onSurfacePrimary}>
          {t("Health Reports")}
        </Text>
        {/* <Menu width={200}>
          <Menu.Target>
            <ActionIcon variant="subtle">
              <IconDotsVertical size={20} />
            </ActionIcon>
          </Menu.Target>
        </Menu> */}
      </Flex>
      <ScrollArea scrollbarSize={6} bg={theme.other.bgSubtle} h={300}>
        <Stack gap="md" bg={theme.other.bgSubtle}>
          {reports.map((report) => (
            <Paper
              key={report.id}
              p="md"
              radius="md"
              bg={theme.other.bgSubtle}
              withBorder
            >
              <Flex gap="md" align="center">
                <Box
                  bg={theme.other.bgSubtle}
                  p="md"
                  style={{ borderRadius: "12px", backgroundColor: "#feeeee" }}
                >
                  <IconFileText size={24} color="#ff9a9a" />
                </Box>
                <Flex direction="column" style={{ flex: 1 }}>
                  <Text
                    fw={500}
                    truncate
                    w="150px"
                    c={theme.other.onSurfaceSecondary}
                  >
                    {report.title}
                  </Text>
                  <Flex gap="md">
                    <Text size="xs" c={theme.other.onSurfacePrimary}>
                      {report.type}
                    </Text>
                    <Text size="xs" c={theme.other.onSurfacePrimary}>
                      {report.size}
                    </Text>
                  </Flex>
                </Flex>
              </Flex>
            </Paper>
          ))}
        </Stack>
      </ScrollArea>
    </Container>
  );
}

export default HealthReportList;
