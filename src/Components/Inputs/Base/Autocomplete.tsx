import { Autocomplete } from "@mantine/core";
import InputPropsType from "../../../types/InputsType";
interface Props {
  base: InputPropsType;
}
function AutocompleteCustom({ base }: Props) {
  const data = ["1", "2", "4", "5"];
  const handleChange = (value: string) => {
    if (base.onChange) {
      const event = {
        target: { name: base.id, value },
      } as React.ChangeEvent<HTMLInputElement>;

      base.onChange(event);
    }
  };
  return (
    <Autocomplete
      label={base.label}
      placeholder={base.placeholder}
      data={data}
      withScrollArea={false}
      onChange={handleChange}
      onBlur={base.onBlur}
      styles={{ dropdown: { maxHeight: 200, overflowY: "auto" } }}
      mt="md"
    />
  );
}

export default AutocompleteCustom;
