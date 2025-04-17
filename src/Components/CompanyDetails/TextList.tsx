import {
  List,
  ListItem,
  ScrollArea,
  Text,
  Box,
  Paper,
  useMantineTheme,
  Flex,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { CircleDot } from "lucide-react";

interface Props {
  title: string;
  title1: string;
  content1: string[];
  title2: string;
  content2: string[];
  primaryColor?: string;
  secondaryColor?: string;
  heightLists: number;
  heightOneList: number;
}

const TextList = ({
  title,
  title1,
  content1,
  title2,
  content2,
  heightLists,
  heightOneList,
}: Props) => {
  const theme = useMantineTheme();
  const isMobile = useMediaQuery("(max-width: 576px)");
  const primaryColor = theme.colors.myPrimary[5];
  return (
    <Paper radius="md" w="100%">
      <Box mb="lg">
        <Text fz={20} fw={700} c={primaryColor} mb={8}>
          {title}
        </Text>
      </Box>
      <ScrollArea
        h={heightLists}
        type="auto"
        scrollbarSize={8}
        offsetScrollbars
      >
        <Flex
          w="100%"
          align="start"
          gap="xl"
          direction={isMobile ? "column" : "row"}
        >
          <Paper
            h={heightOneList}
            p="lg"
            w={isMobile ? "100%" : "50%"}
            radius="md"
            withBorder
          >
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
          <Paper
            h={heightOneList}
            p="lg"
            w={isMobile ? "100%" : "50%"}
            radius="md"
            withBorder
          >
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
        </Flex>
      </ScrollArea>
    </Paper>
  );
};

export default TextList;
