import {UnstyledButton, Text, Flex } from "@mantine/core";
import { IconChevronDown, IconChevronUp, IconSelector } from "@tabler/icons-react";
import ThProps from "../../types/ThPropsSort";

export default function Th({ children, reversed, sorted, onSort, style }: ThProps) {
  const Icon = sorted ? (reversed ? IconChevronUp : IconChevronDown) : IconSelector;
  
  return (
    <th style={style}>
      <UnstyledButton onClick={onSort}>
        <Flex style={{ alignItems: 'center' }}>
          <Text fw={500} fz="11px">
            {children}
          </Text>
          <Icon size={20} stroke={1.5} />
        </Flex>
      </UnstyledButton>
    </th>
  );
}
