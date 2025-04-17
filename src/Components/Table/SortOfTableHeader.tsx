import {UnstyledButton, Text, Flex, useMantineTheme, Table } from "@mantine/core";
import { IconChevronDown, IconChevronUp, IconSelector } from "@tabler/icons-react";
import ThProps from "../../types/ThPropsSort";

export default function Th({ children, reversed, sorted, onSort, w }: ThProps) {
  const Icon = sorted ? (reversed ? IconChevronUp : IconChevronDown) : IconSelector;
  const theme = useMantineTheme()
  return (
    <UnstyledButton onClick={onSort}>
      <Table.Th >
        <Flex style={{ alignItems: 'center' }}  w={w}>
          <Text fw={500} fz="11px"
          style={{
            padding: "16px 4px",
            color: theme.other.onSurfaceTertiary,
            fontWeight: "normal",
            textAlign: "start",
          }}>
            {children}
          </Text>
          <Icon size={20} stroke={1.5} color={ theme.other.onSurfaceTertiary} />
        </Flex>
      </Table.Th >
    </UnstyledButton>
  );
}
