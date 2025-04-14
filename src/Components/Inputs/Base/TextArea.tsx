import { Textarea } from "@mantine/core";
import InputPropsType from "../../../types/InputsType";
import { useTranslation } from "react-i18next";

interface Props {
  base: InputPropsType;
}
export default function TextareaBase(props: Props) {
  const { t } = useTranslation("index");

  return (
    <Textarea
      // size="md"
      id={props.base.id}
      withAsterisk={props.base.mandatory}
      w={"75%"}
      label={t(props.base.label)}
      placeholder={t(props.base.placeholder || "")}
      onChange={props.base.onChange}
      error={t(props.base.error || "")}
      value={props.base.value?.toString() || ""}
      disabled={props.base.disabled}
    />
  );
}
