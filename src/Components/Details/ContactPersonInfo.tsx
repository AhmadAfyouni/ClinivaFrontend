import {
  Text,
  Paper,
  Container,
  Flex,
  Stack,
  Box,
  useMantineTheme,
} from "@mantine/core";
import {
  IconPhone,
  IconHome2,
  IconMail,
  IconAlertCircle,
} from "@tabler/icons-react";
interface Props {
  phoneNumber: string;
  adress: string;
  email: string;
  emergencyContact: string;
}
export function ContactPersonInfo({
  adress,
  email,
  emergencyContact,
  phoneNumber,
}: Props) {
  const theme = useMantineTheme();
  const contactInfo = [
    {
      label: "Phone",
      value: phoneNumber,
      icon: IconPhone,
    },
    {
      label: "Address",
      value: adress,
      icon: IconHome2,
    },
    {
      label: "Email",
      value: email,
      icon: IconMail,
    },
    {
      label: "Emergency Contact",
      value: emergencyContact,
      icon: IconAlertCircle,
    },
  ];

  return (
    <Container size="sm" p="md" bg={theme.other.bgSubtle}>
      <Flex
        justify="space-between"
        align="center"
        mb="md"
        bg={theme.other.bgSubtle}
      >
        <Text fw={600} size="lg" c={theme.other.onSurfacePrimary}>
          Contact Person
        </Text>
      </Flex>

      <Paper p="md" radius="md" bg={theme.other.bgSubtle} h={300}>
        <Stack gap="22px">
          {contactInfo.map((info, index) => (
            <Flex key={index} align="flex-start" gap="md">
              <Box mt={4}>
                <info.icon size={20} color={theme.other.onSurfaceTertiary} />
              </Box>
              <Stack gap={4}>
                <Text size="sm" c={theme.other.onSurfaceTertiary}>
                  {info.label}
                </Text>
                <Text size="sm" c={theme.other.onSurfacePrimary}>
                  {info.value}
                </Text>
              </Stack>
            </Flex>
          ))}
        </Stack>
      </Paper>
    </Container>
  );
}

export default ContactPersonInfo;
