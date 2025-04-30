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
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();
  const theme = useMantineTheme();
  const contactInfo = [
    {
      label: t("phone"),
      value: phoneNumber,
      icon: IconPhone,
    },
    {
      label: t("Address"),
      value: adress,
      icon: IconHome2,
    },
    {
      label: t("Email"),
      value: email,
      icon: IconMail,
    },
    {
      label: t("Emergency Contact"),
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
          {t("Contact Person")}
        </Text>
      </Flex>

      <Paper p="md" radius="md" bg={theme.other.bgSubtle} h={300}>
        <Stack gap="14px">
          {contactInfo.map((info, index) => (
            <Flex key={index} align="flex-start" gap="xs">
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
