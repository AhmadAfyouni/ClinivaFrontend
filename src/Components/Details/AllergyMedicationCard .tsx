import {
  Card,
  List,
  Title,
  Container,
  useMantineTheme,
  ScrollArea,
  Flex,
} from "@mantine/core";

const AllergyMedicationCard = () => {
  const allergies = [
    "Penicillin",
    "Pollen",
    "Latex",
    "Penicillin",
    "Pollen",
    "Penicillin",
    "Pollen",
    "Latex",
    "Penicillin",
    "Pollen",
    "Latex",
  ];
  const chronicDiseases = [
    "Hypertension (High Blood Pressure)",
    "Diabetes",
    "Asthma",
    "Chronic Obstructive Pulmonary Disease (COPD)",
    "Arthritis",
    "Chronic Kidney Disease",
  ];
  const theme = useMantineTheme();
  return (
    <Container size="sm" py="md" bg={theme.other.bgSubtle} w="100%">
      <Card p="lg" radius="md" bg={theme.other.bgSubtle} h="150px" w="100%">
        <ScrollArea>
          <Flex justify="space-between" w="90%">
            <Flex direction="column" w="50%">
              <Title
                size="16px"
                order={4}
                mb="md"
                c={theme.other.onSurfaceTertiary}
              >
                Allergies
              </Title>
              <List>
                {allergies.map((allergy, index) => (
                  <List.Item key={index} c={theme.other.onSurfacePrimary}>
                    {allergy}
                  </List.Item>
                ))}
              </List>
            </Flex>

            <Flex direction="column" w="50%">
              <Title
                order={4}
                mb="md"
                c={theme.other.onSurfaceTertiary}
                size="16px"
              >
                Chronic diseases
              </Title>
              <List>
                {chronicDiseases.map((allergy, index) => (
                  <List.Item key={index} c={theme.other.onSurfacePrimary}>
                    {allergy}
                  </List.Item>
                ))}
              </List>
            </Flex>
          </Flex>
        </ScrollArea>
      </Card>
    </Container>
  );
};

export default AllergyMedicationCard;
