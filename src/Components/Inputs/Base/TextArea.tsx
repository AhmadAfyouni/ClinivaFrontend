import { Textarea } from "@mantine/core";
import InputPropsType from "../../../types/InputsType";

interface Props {
  base: InputPropsType;
}
export default function TextareaBase(props: Props) {
  return (
    <Textarea
      // size="md"
      id={props.base.id}
      withAsterisk={props.base.mandatory}
      w={"40%"}
      label={props.base.label}
      placeholder={props.base.placeholder}
      onChange={props.base.onChange}
      error={props.base.error}
    />
  );
}
