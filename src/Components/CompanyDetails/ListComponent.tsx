import {
  List,
  ThemeIcon,
  Text,
  Box,
  useMantineTheme,
  ScrollArea,
} from "@mantine/core";
import { ReactElement } from "react";
interface Props {
  title: string;
  listItems: string[];
  icon: ReactElement;
}
function ListComponent({ title, listItems, icon }: Props) {
  const theme = useMantineTheme();
  return (
    <ScrollArea p="md" h={250}>
      <Box mb="md">
        <Text fw={600} size="sm" color="dimmed">
          {title}
        </Text>
      </Box>

      <List spacing="md">
        {listItems.map((item, index) => (
          <List.Item
            key={index}
            icon={
              <ThemeIcon
                color={theme.colors.myPrimary[5]}
                size={30}
                radius="md"
                variant="light"
              >
                {icon}
              </ThemeIcon>
            }
          >
            <Text size="sm">{item}</Text>
          </List.Item>
        ))}
      </List>
    </ScrollArea>
  );
}

export default ListComponent;
