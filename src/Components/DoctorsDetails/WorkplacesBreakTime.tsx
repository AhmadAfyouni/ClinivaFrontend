import { Divider, Flex, Text, useMantineTheme } from "@mantine/core";
interface Props {
  companyName: string;
  medicalComplexName: string;
  deptName: string;
  clinicName: string;
  startTime: Date;
  endTime: Date;
}
const WorkplacesBreakTime = ({
  companyName,
  medicalComplexName,
  deptName,
  clinicName,
  startTime,
  endTime,
}: Props) => {
  const startTimeStr = startTime.toLocaleTimeString("en-US");
  const endTimeStr = endTime.toLocaleTimeString("en-US");
  const workPlaceTitle = ["Company", "MedicalComplex", "Department", "Clinic"];
  const workPlaceText = [companyName, medicalComplexName, deptName, clinicName];
  const breakTimeTitle = ["Start Time", "End Time"];
  const breakTimeDate = [startTimeStr, endTimeStr];
  const theme = useMantineTheme();
  return (
    <Flex direction="column" gap="5px" m="0 auto">
      <Text fz={16} fw={600} mb={3} c={theme.other.onSurfacePrimary}>
        Break Time
      </Text>
      {breakTimeTitle.map((item, index) => (
        <Flex h={{ sm: 30, md: 20 }} justify="start" align="centers">
          <Text
            size="sm"
            fw={500}
            miw="110px"
            c={theme.other.onSurfaceSecondary}
          >
            {item}
          </Text>
          <Text size="sm" c={theme.other.onSurfacePrimary}>
            {breakTimeDate[index]}
          </Text>
        </Flex>
      ))}
      <Divider
        w="90%"
        h={2}
        m="5px 0 5px"
        visibleFrom="lg"
        c={theme.other.borderDefault}
      />
      <Text fz={16} fw={600} mb={3} c={theme.other.onSurfacePrimary}>
        Work Places
      </Text>
      {workPlaceTitle.map((item, index) => (
        <Flex h={{ sm: 30, md: 20 }} justify="start" align="centers">
          <Text
            size="sm"
            fw={500}
            miw="110px"
            c={theme.other.onSurfaceSecondary}
          >
            {item}
          </Text>
          <Text size="sm" c={theme.other.onSurfacePrimary}>
            {workPlaceText[index]}
          </Text>
        </Flex>
      ))}
    </Flex>
  );
};

export default WorkplacesBreakTime;
