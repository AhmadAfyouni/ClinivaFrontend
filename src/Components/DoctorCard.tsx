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
  Badge,
} from "@mantine/core";
import DoctorDetailsType from "../types/doctor/DoctorDetailsType";
import { BsPersonCircle } from "react-icons/bs";
import { useState } from "react";
interface Props {
  doctor: DoctorDetailsType;
  onClick: () => void;
}



const DoctorCard = ({ doctor, onClick }: Props) => {
  const VITE_BACKEND_URL_IMAGE = import.meta.env.VITE_BACKEND_URL_IMAGE;
  const theme = useMantineTheme();
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <Grid.Col key={doctor._id} span={{ base: 12, xs: 6, md: 4, lg: 3 }}>
      <UnstyledButton w="100%" onClick={onClick}>
        <Card p={0}>
          <Flex justify="center" mt="10px" direction="column" align="center">
            {!loaded && !error && <Skeleton w={150} h={150} radius="xl" />}
            {!error && doctor.image ? (
              <Image
                content="cover"
                src={VITE_BACKEND_URL_IMAGE+doctor.image}
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
              // <Box w={150} h={150} mb={12}>
              <BsPersonCircle
                size={150}
                color={theme.other.onSurfaceSecondary}
              />
            ) : (
              // </Box>
              <Flex
                justify="center"
                bg={theme.other.bg}
                mb={12}
                align="center"
                style={{
                  borderRadius: "50%",
                }}
              />
            )}
          </Flex>
          <Stack gap={2} align="center" py="xs">
            <Text fw={600} size="lg" c={theme.other.onSurfacePrimary}>
              {doctor.name}
            </Text>
            <Badge
              w={100}
              bg={
                doctor.isActive
                  ? theme.other.secondaryColor
                  : theme.colors.myPrimary[3]
              }
            >
              <Text c={theme.other.onSurfacePrimary} size="sm" fw={600}>
                {doctor.isActive ? "ACTIVE" : "INACTIVE"}
              </Text>
            </Badge>
            <Flex direction="column" gap={8} align="center">
              <Text size="xs" c={theme.other.onSurfaceSecondary}>
                {doctor.publicId}
              </Text>
              <Text size="xs" c={theme.other.onSurfacePrimary}>
                {doctor.specialties?.map((item) => item).join(" - ")}
              </Text>
            </Flex>
            <Text size="sm" c={theme.other.onSurfaceSecondary}>
              {doctor.departmentId?.name || ""}
            </Text>
          </Stack>
        </Card>
      </UnstyledButton>
    </Grid.Col>
  );
};

export default DoctorCard;
