import { Select } from "@mantine/core";
import InputPropsType from "../../../types/InputsType";

interface Props {
  base: InputPropsType;
}
function SelectBaseCustom({ base }: Props) {
  return (
    <Select
      withAsterisk={base.mandatory}
      id={base.id}
      name={base.id}
      label={base.label}
      placeholder={base.placeholder}
      data={base.selectValue}
      searchable
      nothingFoundMessage="Nothing found..."
      disabled={base.disabled}
      error={base.error || ""}
      // onChange={base.onChange}
      onChange={(value) => base.onChange(value)}
      value={base.value?.toString()}
    />
  );
}

export default SelectBaseCustom;
