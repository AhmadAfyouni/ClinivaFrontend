import { Radio, Group } from "@mantine/core";
import InputPropsType, { RadioType } from "../../../types/InputsType";
import { useTranslation } from "react-i18next";
interface Props {
  base: InputPropsType;
  radio: RadioType[];
}

export default function RadioBase(props: Props) {
  const { t } = useTranslation();

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
      label={t(props.base.label)}
      description={t(props.base.description || "")}
      id={props.base.id}
      withAsterisk={props.base.mandatory}
      onChange={handleChange}
      error={t(props.base.error || "")}
    >
      <Group mt="xs">
        {props.radio.map((option) => (
          <Radio
            disabled={props.base.disabled}
            key={option.value.toString()}
            value={option.value.toString()}
            label={t(option.label.toString())}
          />
        ))}
        {/* <Radio value="react" label="React" />
        <Radio value="react" label="React" /> */}
      </Group>
    </Radio.Group>
  );
}
