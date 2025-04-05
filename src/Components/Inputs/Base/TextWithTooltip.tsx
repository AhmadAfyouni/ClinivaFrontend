import { IconInfoCircle } from "@tabler/icons-react";
import { Center, Text, TextInput, Tooltip } from "@mantine/core";
import InputPropsType from "../../../types/InputsType";
interface Props {
  base: InputPropsType;
}
export default function InputTooltipBase(props: Props) {
  const rightSection = (
    <Tooltip
      label={props.base.tooltip}
      withArrow
      position="top-end"
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
      // style={{ justifyItems: "" }}
      type={props.base.type}
      id={props.base.id}
      withAsterisk={props.base.mandatory}
      w={"100%"}
      rightSection={rightSection}
      label={props.base.label}
      placeholder={props.base.placeholder}
      onChange={props.base.onChange}
      error={props.base.error}
      disabled={props.base.disabled}
      inputWrapperOrder={["label", "input", "error", "description"]}
      value={props.base.value?.toString() || ""}
    />
  );
}
