import { IconInfoCircle } from "@tabler/icons-react";
import { Center, Text, TextInput, Tooltip } from "@mantine/core";
interface InputProps {
  label: string;
  tooltip: string;
  type: "text" | "number" | "image" | "date" | "radio";
  placeholder: string;
}
export default function InputTooltip(Props: InputProps) {
  const rightSection = (
    <Tooltip
      label={Props.tooltip}
      position="top-end"
      withArrow
      transitionProps={{ transition: "pop-bottom-right" }}
    >
      <Text component="div" c="dimmed" style={{ cursor: "help" }}>
        <Center>
          <IconInfoCircle size={18} stroke={1.5} />
        </Center>
      </Text>
    </Tooltip>
  );

  return (
    <TextInput
      // bg={"green"}
      w={"45%"}
      rightSection={rightSection}
      label={Props.label}
      placeholder={Props.placeholder}
    />
  );
}
