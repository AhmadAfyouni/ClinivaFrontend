import dayjs from "dayjs";
import { DateInput, DateInputProps } from "@mantine/dates";
import InputPropsType from "../../../types/InputsType";
import { DateValue } from "@mantine/dates";

const dateParser: DateInputProps["dateParser"] = (input) => {
  if (input === "WW2") {
    return new Date(1939, 8, 1);
  }

  return dayjs(input, "DD/MM/YYYY").toDate();
};
interface Props {
  base: InputPropsType;
}
export default function DateBase(props: Props) {
  const handleChange = (value: DateValue) => {
    if (props.base.onChange) {
      const formattedDate = value ? dayjs(value).format("YYYY-MM-DD") : "";

      const event = {
        target: { name: props.base.id, value: formattedDate },
      } as React.ChangeEvent<HTMLInputElement>;

      props.base.onChange(event);
    }
  };

  return (
    <DateInput
      dateParser={dateParser}
      w={"40%"}
      valueFormat="DD/MM/YYYY"
      id={props.base.id}
      withAsterisk={props.base.mandatory}
      label={props.base.label}
      placeholder={props.base.placeholder}
      onChange={handleChange}
      error={props.base.error}
    />
  );
}
