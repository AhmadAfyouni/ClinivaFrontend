import {
  Card,
  Text,
  Group,
  Badge,
  Box,
  useMantineTheme,
  Flex,
  Tooltip,
} from "@mantine/core";

interface Props {
  insuranceType: string;
  personName: string;
  HPI: string;
  expiryDate: Date;
  isActive: boolean;
  ID: string;
  familyMedicalHistory: string;
  lifestyleFactors: string;
  preferredLanguage: string;
}
function InsuranceCard({
  insuranceType,
  personName,
  HPI,
  expiryDate,
  isActive,
  ID,
  familyMedicalHistory,
  lifestyleFactors,
  preferredLanguage,
}: Props) {
  const theme = useMantineTheme();
  const date = expiryDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  return (
    <Box
      maw={320}
      mx="auto"
      w="100%"
      pt={10}
      mb={10}
      style={{ backgroundColor: theme.other.bgSubtle }}
    >
      {/* Profile section */}
      <Flex direction="column" p="0 10px" mb={20} w="100%">
        <Text fw={500} mb={20} size="lg" c={theme.other.onSurfacePrimary}>
          Patient Info
        </Text>
        <Flex justify="start" mb={15}>
          <Text w="140px" fw={500} size="sm" c={theme.other.onSurfaceTertiary}>
            Name
          </Text>
          <Text size="sm" c={theme.other.onSurfacePrimary}>
            {personName}
          </Text>
        </Flex>
        <Flex justify="start" mb={15}>
          <Text w="140px" fw={500} size="sm" c={theme.other.onSurfaceTertiary}>
            National ID
          </Text>
          <Text size="sm" c={theme.other.onSurfacePrimary}>
            {ID}
          </Text>
        </Flex>
        <Flex justify="start" mb={15} w="100%">
          <Text
            miw="140px"
            truncate
            fw={500}
            size="sm"
            c={theme.other.onSurfaceTertiary}
          >
            familyMedicalHistory
          </Text>
          <Tooltip label={familyMedicalHistory} withArrow>
            <Text truncate size="sm" c={theme.other.onSurfacePrimary}>
              {familyMedicalHistory}
            </Text>
          </Tooltip>
        </Flex>
        <Flex justify="start" mb={15}>
          <Text
            miw="140px"
            fw={500}
            size="sm"
            c={theme.other.onSurfaceTertiary}
          >
            lifestyleFactors
          </Text>
          <Tooltip label={lifestyleFactors} withArrow>
            <Text size="sm" c={theme.other.onSurfacePrimary}>
              {lifestyleFactors}
            </Text>
          </Tooltip>
        </Flex>
        <Flex justify="start">
          <Text w="140px" fw={500} size="sm" c={theme.other.onSurfaceTertiary}>
            preferredLanguage
          </Text>
          <Text size="sm" c={theme.other.onSurfacePrimary}>
            {preferredLanguage}
          </Text>
        </Flex>
      </Flex>

      {/* Insurance Card */}
      <Card
        bg={theme.other.secondaryColor}
        radius="md"
        p="md"
        withBorder={false}
      >
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
            {insuranceType}
          </Text>
        </Group>

        {/* Insurance details */}
        <Text fw={700} size="xl" mb={10} c={theme.other.onSurfacePrimary}>
          {personName}
        </Text>
        <Text fw={500} fz={13} c={theme.other.onSurfaceSecondary} mb={15}>
          {HPI}
        </Text>

        <Group justify="space-between" align="center">
          <Box>
            <Text size="xs" c={theme.other.onSurfaceSecondary}>
              Expiry Date
            </Text>
            <Text size="sm" c={theme.other.onSurfacePrimary}>
              {date}
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
            {isActive ? "Active" : "InActive"}
          </Badge>
        </Group>
      </Card>
    </Box>
  );
}

export default InsuranceCard;
