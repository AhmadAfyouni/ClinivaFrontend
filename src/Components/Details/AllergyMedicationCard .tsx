import {
  Card,
  List,
  Title,
  Container,
  useMantineTheme,
  ScrollArea,
  Flex,
} from "@mantine/core";
import { useTranslation } from "react-i18next";
interface Props {
  allergies: string[];
  chronicDiseases: string[];
}
const AllergyMedicationCard = ({ allergies, chronicDiseases }: Props) => {
  const { t } = useTranslation();
  const theme = useMantineTheme();
  return (
    <Container size="sm" py="md" bg={theme.other.bg} w="100%">
      <Card p="lg" radius="md" bg={theme.other.bg} h="150px" w="100%">
        <ScrollArea>
          <Flex justify="space-between" w="90%">
            <Flex direction="column" w="50%">
              <Title
                size="16px"
                order={4}
                mb="md"
                c={theme.other.onSurfaceTertiary}
              >
                {t("Allergies")}
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
                {t("Chronic diseases")}
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
