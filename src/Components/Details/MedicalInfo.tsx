import {
  Text,
  SimpleGrid,
  Container,
  Flex,
  Box,
  useMantineTheme,
} from "@mantine/core";
import { MdOutlineBloodtype } from "react-icons/md";
import { GiBodyHeight, GiWeightScale } from "react-icons/gi";
import { CiFlag1 } from "react-icons/ci";
interface Props {
  bloodType: string;
  weight: number;
  hieght: number;
  nationality: string;
}
export function MedicalInfo({ bloodType, hieght, nationality, weight }: Props) {
  const theme = useMantineTheme();
  const vitalSigns = [
    {
      title: "Blood Type",
      value: bloodType,
      icon: MdOutlineBloodtype,
      color: theme.other.secondaryColor,
    },
    {
      title: "Hieght",
      value: hieght,
      unit: " M",
      icon: GiBodyHeight,
      color: theme.primaryColor,
    },
    {
      title: "Weight",
      value: weight,
      unit: " Kg",
      icon: GiWeightScale,
      color: theme.primaryColor,
    },
    {
      title: "Nationality",
      value: nationality,
      icon: CiFlag1,
      color: theme.other.secondaryColor,
    },
  ];

  return (
    <Container size="sm" p="md" bg={theme.other.bg}>
      <Text fw={600} size="lg" c={theme.other.onSurfacePrimary} mb={5}>
        Medical Info
      </Text>

      <SimpleGrid cols={2} spacing="md">
        {vitalSigns.map((vital, index) => (
          <Box
            key={index}
            bg={vital.color}
            p="md"
            style={{ borderRadius: "16px" }}
          >
            <Flex align="center" gap="sm" mb="xs">
              <Box
                bg={theme.other.bgSubtle}
                p={10}
                style={{ borderRadius: "50%" }}
              >
                <vital.icon size={20} color={theme.other.onSurfacePrimary} />
              </Box>
              <Text size="sm" c={theme.other.onSurfaceSecondary}>
                {vital.title}
              </Text>
            </Flex>

            <Flex align="flex-end">
              <Text size="30" fw={600} lh={1} c={theme.other.onSurfacePrimary}>
                {vital.value}
              </Text>
              <Text ml={4} size="sm" c="dimmed" mb={4}>
                {vital.unit}
              </Text>
            </Flex>
          </Box>
        ))}
      </SimpleGrid>
    </Container>
  );
}

export default MedicalInfo;
