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
  minwidth?: string;
}
function ListComponent({ title, listItems, icon, minwidth }: Props) {
  const theme = useMantineTheme();
  return (
    <ScrollArea p="md" h={250} miw={minwidth} type="always">
      <Box mb="md">
        <Text fw={600} size="sm" c={theme.other.onSurfaceTertiary}>
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
