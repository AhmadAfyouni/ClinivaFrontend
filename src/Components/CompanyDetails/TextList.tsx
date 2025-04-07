import {
  List,
  ListItem,
  ScrollArea,
  Text,
  Box,
  Paper,
  Group,
  useMantineTheme,
} from "@mantine/core";
import { CircleDot } from "lucide-react";

interface Props {
  title: string;
  title1: string;
  content1: string[];
  title2: string;
  content2: string[];
  primaryColor?: string;
  secondaryColor?: string;
}

const TextList = ({ title, title1, content1, title2, content2 }: Props) => {
  const theme = useMantineTheme();
  const primaryColor = theme.colors.myPrimary[5];
  return (
    <Paper radius="md">
      <Box mb="lg">
        <Text fz={24} fw={700} c={primaryColor} mb={8}>
          {title}
        </Text>
      </Box>
      <ScrollArea h={100} type="auto" scrollbarSize={8} offsetScrollbars>
        <Group grow align="flex-start" gap="xl">
          <Paper p="lg" radius="md" withBorder>
            <Text fw={600} fz={18} mb="md" pb="xs">
              {title1}
            </Text>
            <List spacing="md">
              {content1.map((item) => (
                <ListItem
                  key={item}
                  icon={
                    <CircleDot
                      size={16}
                      color={primaryColor}
                      style={{
                        backgroundColor: theme.other.bgSubtle,
                        borderRadius: "50%",
                      }}
                    />
                  }
                >
                  <Text fz={15}>{item}</Text>
                </ListItem>
              ))}
            </List>
          </Paper>
          <Paper p="lg" radius="md" withBorder>
            <Text fw={600} fz={18} mb="md" pb="xs">
              {title2}
            </Text>
            <List spacing="md">
              {content2.map((item) => (
                <ListItem
                  key={item}
                  icon={
                    <CircleDot
                      size={16}
                      color={primaryColor}
                      style={{
                        backgroundColor: theme.other.bgSubtle,
                        borderRadius: "50%",
                      }}
                    />
                  }
                >
                  <Text fz={15}>{item}</Text>
                </ListItem>
              ))}
            </List>
          </Paper>
        </Group>
      </ScrollArea>
    </Paper>
  );
};

export default TextList;
