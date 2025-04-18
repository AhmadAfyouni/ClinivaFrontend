import {
  Stack,
  Text,
  Image,
  Card,
  Grid,
  useMantineTheme,
  Flex,
  UnstyledButton,
  Skeleton,
  Box,
} from "@mantine/core";
import { User } from "lucide-react";
import DoctorDetailsType from "../types/doctor/DoctorDetailsType";
import { useState } from "react";
interface Props {
  doctor: DoctorDetailsType;
  onClick: () => void;
}

const DoctorCard = ({ doctor, onClick }: Props) => {
  const theme = useMantineTheme();
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  return (
    <Grid.Col key={doctor._id} span={{ base: 12, xs: 6, md: 4, lg: 3 }}>
      <UnstyledButton w="100%" onClick={onClick}>
        <Card p={0}>
          <Flex justify="center" mt="10px" direction="column" align="center">
            {!loaded && !error && (
              <Skeleton width={150} height={150} radius="xl" />
            )}

            {!error && doctor.image ? (
              <Image
                content="cover"
                src={doctor.image}
                alt="Uploaded Image"
                w={150}
                h={150}
                mb={12}
                radius={8}
                onLoad={() => setLoaded(true)}
                onError={() => {
                  setLoaded(false);
                  setError(true);
                }}
                style={{ display: loaded ? "block" : "none" }}
              />
            ) : error ? (
              <Box w={150} h={150} mb={12}>
                <Text c={theme.other.onSurfacePrimary}>
                  There is an error loading the image
                </Text>
              </Box>
            ) : (
              <Flex
                justify="center"
                w="80px"
                h="80px"
                bg={theme.other.bg}
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
            <Flex direction="column" gap={8} align="center">
              <Text size="xs" c={theme.other.onSurfaceSecondary}>
                {/* {doctor.id} */}
                {doctor.identity}
              </Text>
              <Text size="xs" c={theme.other.onSurfacePrimary}>
                {/* {doctor.specialty} */}
                {doctor.specialties.map((item) => item).join(" - ")}
              </Text>
            </Flex>
            <Text size="sm" c={theme.other.onSurfaceSecondary}>
              {/* {doctor.department} */}
              {doctor.departmentId}
            </Text>
          </Stack>
        </Card>
      </UnstyledButton>
    </Grid.Col>
  );
};

export default DoctorCard;
