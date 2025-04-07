import { useState, useMemo } from "react";
import { Card, Text, Group, Select, useMantineTheme } from "@mantine/core";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface PatientData {
  date: string;
  recovered: number;
  newPatient: number;
  total: number;
}

const PatientStatisticsChart = () => {
  const [timePeriod, setTimePeriod] = useState<string>("Last 7 Days");
  const theme = useMantineTheme();
  const allData: Record<string, PatientData[]> = {
    "Last 7 Days": [
      { date: "14 Sep", recovered: 210, newPatient: 70, total: 280 },
      { date: "15 Sep", recovered: 230, newPatient: 80, total: 310 },
      { date: "16 Sep", recovered: 160, newPatient: 110, total: 270 },
      { date: "17 Sep", recovered: 140, newPatient: 60, total: 200 },
      { date: "18 Sep", recovered: 180, newPatient: 70, total: 250 },
      { date: "19 Sep", recovered: 220, newPatient: 90, total: 310 },
      { date: "20 Sep", recovered: 250, newPatient: 100, total: 350 },
    ],
    "Last 30 Days": [
      { date: "21 Aug", recovered: 180, newPatient: 60, total: 240 },
      { date: "28 Aug", recovered: 210, newPatient: 90, total: 300 },
      { date: "04 Sep", recovered: 190, newPatient: 80, total: 270 },
      { date: "11 Sep", recovered: 220, newPatient: 100, total: 320 },
      { date: "18 Sep", recovered: 240, newPatient: 110, total: 350 },
      { date: "25 Sep", recovered: 260, newPatient: 120, total: 380 },
      { date: "02 Oct", recovered: 280, newPatient: 130, total: 410 },
    ],
    "This Month": [
      { date: "01 Sep", recovered: 150, newPatient: 50, total: 200 },
      { date: "07 Sep", recovered: 200, newPatient: 70, total: 270 },
      { date: "14 Sep", recovered: 230, newPatient: 90, total: 320 },
      { date: "21 Sep", recovered: 260, newPatient: 110, total: 370 },
      { date: "28 Sep", recovered: 290, newPatient: 130, total: 420 },
      { date: "30 Sep", recovered: 310, newPatient: 140, total: 450 },
    ],
  };

  const selectedData = useMemo(() => allData[timePeriod], [timePeriod]);

  const summaryStats = useMemo(() => {
    if (!selectedData || selectedData.length === 0)
      return { total: 0, newPatients: 0, recovered: 0 };

    const total = selectedData.reduce((sum, item) => sum + item.total, 0);
    const newPatients = selectedData.reduce(
      (sum, item) => sum + item.newPatient,
      0
    );
    const recovered = selectedData.reduce(
      (sum, item) => sum + item.recovered,
      0
    );

    return {
      total: Math.round(total / selectedData.length),
      newPatients: Math.round(newPatients / selectedData.length),
      recovered: Math.round(recovered / selectedData.length),
    };
  }, [selectedData]);

  return (
    <Card radius="md" h={450} mt={10} bg={theme.other.bg}>
      <Group justify="space-between" align="center" mb="md">
        <Text fw={700} size="xl" c={theme.other.onSurfacePrimary}>
          Patients Statistics
        </Text>
        <Select
          value={timePeriod}
          onChange={(value) => value && setTimePeriod(value)}
          data={Object.keys(allData)}
          placeholder="Select time period"
          c={theme.other.onSurfacePrimary}
          w="25%"
          styles={(theme) => ({
            input: {
              backgroundColor: theme.other.secondaryColor,
              borderRadius: "25%",
              color: theme.other.onSurfacePrimary,
            },
          })}
        />
      </Group>

      <Group justify="space-between" mb="md">
        <Card shadow="xs" radius="md" w="30%" bg={theme.other.bgSubtle}>
          <Text c={theme.other.onSurfaceSecondary} size="sm">
            Total Patient
          </Text>
          <Text fw={700} size="xl" c={theme.other.onSurfacePrimary}>
            {summaryStats.total}
          </Text>
        </Card>
        <Card shadow="xs" radius="md" w="30%" bg={theme.other.bgSubtle}>
          <Text c={theme.other.onSurfaceSecondary} size="sm">
            Disactive
          </Text>
          <Text fw={700} size="xl" c={theme.other.onSurfacePrimary}>
            {summaryStats.newPatients}
          </Text>
        </Card>
        <Card shadow="xs" radius="md" w="30%" bg={theme.other.bgSubtle}>
          <Text c={theme.other.onSurfaceSecondary} size="sm">
            Dis Active
          </Text>
          <Text fw={700} size="xl" c={theme.other.onSurfacePrimary}>
            {summaryStats.recovered}
          </Text>
        </Card>
      </Group>

      <ResponsiveContainer width="100%" height={230}>
        <BarChart data={selectedData}>
          <XAxis
            dataKey="date"
            axisLine={false}
            tickLine={false}
            color={theme.other.onSurfaceSecondary}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            color={theme.other.onSurfaceSecondary}
          />
          <Tooltip
            cursor={{ fill: "transparent" }}
            contentStyle={{
              backgroundColor: theme.other.bgSubtle,
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "8px",
              color: theme.other.onSurfacePrimary,
            }}
          />{" "}
          <Bar
            dataKey="recovered"
            stackId="a"
            fill={theme.colors.myPrimary[4]}
            radius={[4, 4, 0, 0]}
          />
          <Bar
            dataKey="newPatient"
            stackId="a"
            fill={theme.other.secondaryDarkColor}
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default PatientStatisticsChart;
