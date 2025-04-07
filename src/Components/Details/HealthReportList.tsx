import { useState } from "react";
import {
  Box,
  Text,
  Paper,
  ScrollArea,
  Stack,
  Container,
  ActionIcon,
  Flex,
  Button,
  Group,
  Progress,
  Modal,
  FileButton,
  Menu,
  useMantineTheme,
} from "@mantine/core";
import {
  IconDotsVertical,
  IconFileText,
  IconUpload,
} from "@tabler/icons-react";

export function HealthReportList() {
  const [reports, setReports] = useState([
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

  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [modalOpened, setModalOpened] = useState(false);
  const [newFileName, setNewFileName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileUpload = (file) => {
    if (file) {
      setSelectedFile(file);
      setNewFileName(file.name.replace(/\.[^/.]+$/, ""));
      setModalOpened(true);
    }
  };

  const simulateUpload = () => {
    setIsUploading(true);
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);

          const fileSizeInKB = Math.round(selectedFile.size / 1024);
          const fileSize =
            fileSizeInKB >= 1024
              ? `${(fileSizeInKB / 1024).toFixed(1)} MB`
              : `${fileSizeInKB} KB`;

          const newReport = {
            id: Date.now(),
            title: newFileName,
            type: "PDF",
            size: fileSize,
            file: selectedFile,
          };

          setReports([newReport, ...reports]);
          setModalOpened(false);
          return 0;
        }
        return prev + 5;
      });
    }, 100);
  };

  const theme = useMantineTheme();
  return (
    <Container size="sm" p="md" bg={theme.other.bgSubtle}>
      <Flex justify="space-between" align="center" mb="md">
        <Text fw={600} size="lg" c={theme.other.onSurfacePrimary}>
          Health Reports
        </Text>
        <Menu width={200}>
          <Menu.Target>
            <ActionIcon variant="subtle">
              <IconDotsVertical size={20} />
            </ActionIcon>
          </Menu.Target>
          <Menu.Dropdown>
            <FileButton onChange={handleFileUpload} accept="application/pdf">
              {(props) => (
                <Menu.Item
                  {...props}
                  icon={<IconUpload size={14} />}
                  c={theme.other.onSurfacePrimary}
                  bg={theme.other.bgSubtle}
                >
                  Upload PDF
                </Menu.Item>
              )}
            </FileButton>
          </Menu.Dropdown>
        </Menu>
      </Flex>
      {isUploading && (
        <Box mb="md">
          <Text size="sm" mb="xs">
            Uploading file...
          </Text>
          <Progress value={uploadProgress} animated striped />
        </Box>
      )}

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

      <Modal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        title="File Upload"
        centered
      >
        <Stack>
          <Text>File selected: {selectedFile?.name}</Text>
          <Text size="sm">Report Title:</Text>
          <input
            width={"100%"}
            type="text"
            value={newFileName}
            onChange={(e) => setNewFileName(e.target.value)}
            style={{
              padding: "8px",
              borderRadius: "4px",
              border: "1px solid #ced4da",
            }}
          />
          <Group justify="flex-end" mt="md">
            <Button variant="default" onClick={() => setModalOpened(false)}>
              Cancel
            </Button>
            <Button onClick={simulateUpload}>Upload</Button>
          </Group>
        </Stack>
      </Modal>
    </Container>
  );
}

export default HealthReportList;
