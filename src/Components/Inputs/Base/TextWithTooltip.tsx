import { IconEye, IconEyeOff, IconInfoCircle } from "@tabler/icons-react";
import { ActionIcon, Center, Text, TextInput, Tooltip } from "@mantine/core";
import InputPropsType from "../../../types/InputsType";
import { useState } from "react";
import { useTranslation } from "react-i18next";
interface Props {
  base: InputPropsType;
}
export default function InputTooltipBase(props: Props) {
  const { t } = useTranslation("index");

  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };
  const passwordRightSection = (
    <ActionIcon onClick={togglePasswordVisibility} size={30}>
      {passwordVisible ? <IconEyeOff size={18} /> : <IconEye size={18} />}
    </ActionIcon>
  );
  const rightSection = (
    <Tooltip
      label={t(props.base.tooltip || "")}
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
      type={passwordVisible ? "text" : props.base.type}
      id={props.base.id}
      withAsterisk={props.base.mandatory}
      w={"100%"}
      rightSection={
        props.base.type === "password" ? passwordRightSection : rightSection
      }
      label={t(props.base.label)}
      placeholder={t(props.base.placeholder || "")}
      onChange={props.base.onChange}
      error={props.base.error}
      disabled={props.base.disabled}
      inputWrapperOrder={["label", "input", "error", "description"]}
      value={props.base.value?.toString() || ""}
    />
  );
}
