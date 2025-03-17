import { Radio, Group } from "@mantine/core";
import InputPropsType, { RadioType } from "../../../types/InputsType";
interface Props {
  base: InputPropsType;
  radio: RadioType[];
}

export default function RadioBase(props: Props) {
  const handleChange = (value: string) => {
    if (props.base.onChange) {
      const event = {
        target: { name: props.base.id, value: value },
      } as React.ChangeEvent<HTMLInputElement>;

      props.base.onChange(event);
    }
  };
  console.log(props.radio);
  return (
    <Radio.Group
      w={"100%"}
      name={props.base.id}
      label={props.base.label}
      description={props.base.description}
      id={props.base.id}
      withAsterisk={props.base.mandatory}
      onChange={handleChange}
      error={props.base.error}
    >
      <Group mt="xs">
        {props.radio.map((option) => (
          <Radio key={option.value} value={option.value} label={option.label} />
        ))}
        {/* <Radio value="react" label="React" />
        <Radio value="react" label="React" /> */}
      </Group>
    </Radio.Group>
  );
}
