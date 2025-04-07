import {
  Group,
  Stack,
  Text,
  Image,
  Card,
  Grid,
  useMantineTheme,
  Flex,
  UnstyledButton,
} from "@mantine/core";
import Doctor from "../types/Doctor";
import { User } from "lucide-react";
import { useNavigate } from "react-router";
interface Props {
  displayedDoctors: Doctor[];
}

const DoctorCard = ({ displayedDoctors }: Props) => {
  const theme = useMantineTheme();
  const navigate = useNavigate();
  return (
    <Grid>
      {displayedDoctors.map((doctor) => (
        <Grid.Col key={doctor.id} span={{ base: 12, xs: 6, md: 4, lg: 3 }}>
          <UnstyledButton w="100%" onClick={() => navigate("/doctors/details")}>
            <Card p={0}>
              <Flex
                justify="center"
                mt="10px"
                direction="column"
                align="center"
              >
                {doctor.imageUrl ? (
                  <Image
                    content="cover"
                    src={doctor.imageUrl}
                    alt="Uploaded Image"
                    w={150}
                    h={150}
                    mb={12}
                    radius={8}
                  />
                ) : (
                  <Flex
                    justify="center"
                    w="80px"
                    h="80px"
                    bg={"#E0E0E0"}
                    mb={12}
                    align="center"
                    style={{
                      borderRadius: "50%",
                    }}
                  >
                    <User size={40} color="#A0A0A0" />
                  </Flex>
                )}
              </Flex>
              <Stack gap={2} align="center" py="xs">
                <Text fw={600} size="lg" c={theme.other.onSurfacePrimary}>
                  {doctor.name}
                </Text>
                <Group gap={8} align="center">
                  <Text size="xs" c={theme.other.onSurfaceSecondary}>
                    {doctor.id}
                  </Text>
                  <Text size="xs" c={theme.other.onSurfaceSecondary}>
                    •
                  </Text>
                  <Text size="xs" c={theme.other.onSurfacePrimary}>
                    {doctor.specialty}
                  </Text>
                </Group>
                <Text size="sm" c={theme.other.onSurfaceSecondary}>
                  {doctor.department}
                </Text>
              </Stack>
            </Card>
          </UnstyledButton>
        </Grid.Col>
      ))}
    </Grid>
  );
};

export default DoctorCard;
