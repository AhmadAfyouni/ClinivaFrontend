import { Card, Text, Group, Badge, Box, useMantineTheme } from "@mantine/core";
import { useTranslation } from "react-i18next";

interface Props {
  insuranceType: string;
   expiryDate: string; 
  personName: string;
  isActive: boolean;
  ID: string;
  familyMedicalHistory: string[];
  lifestyleFactors: string;
  preferredLanguage: string;
}

function InsuranceCard({
  insuranceType,
  // HPI,
  expiryDate,
  isActive,
  personName,
}: Props) {
  const theme = useMantineTheme();
  const { t } = useTranslation("index");

  return (
    <Card bg={theme.other.secondaryColor} radius="md" p="md">
      {/* Insurance header */}
      <Group gap={6} mb={10}>
        <Text
          fz={13}
          c={theme.other.onSurfacePrimary}
          style={{ display: "flex", alignItems: "center" }}
        >
          <Box
            component="span"
            mr="4px"
            fz="12px"
            c={theme.other.onSurfacePrimary}
          >
            ▲
          </Box>
          {t(insuranceType)}
        </Text>
      </Group>

      {/* Insurance details */}
      <Text fw={700} size="xl" mb={10} c={theme.other.onSurfacePrimary}>
        {personName}
      </Text>
      {/* <Text fw={500} fz={13} c={theme.other.onSurfaceSecondary} mb={15}>
        {HPI}
      </Text> */}

      <Group justify="space-between" align="center">
        <Box>
          <Text size="xs" c={theme.other.onSurfaceSecondary}>
            {t("expiry_date")}
          </Text>
          <Text size="sm" c={theme.other.onSurfacePrimary}>
             {expiryDate}
          </Text>
        </Box>
        <Badge
          size="30px"
          color={theme.colors.myPrimary[2]}
          radius="15px"
          bg={theme.other.primaryColor}
          p="8px 12px"
          styles={{
            label: {
              color: theme.other.onSurfacePrimary,
              fontWeight: 500,
              fontSize: "14px",
            },
          }}
        >
          {isActive ? t("active") : t("inactive")}
        </Badge>
      </Group>
    </Card>
  );
}

export default InsuranceCard;
