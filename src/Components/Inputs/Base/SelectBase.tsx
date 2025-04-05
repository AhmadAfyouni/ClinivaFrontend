import { Select } from "@mantine/core";
import InputPropsType from "../../../types/InputsType";

interface Props {
  base: InputPropsType;
}
function SelectBaseCustom({ base }: Props) {
  return (
    <Select
      id={base.id}
      name={base.id}
      label={base.label}
      placeholder={base.placeholder}
      data={base.selectValue}
      searchable
      nothingFoundMessage="Nothing found..."
      disabled={base.disabled}
      // value={base.value.toString()}
    />
  );
}

export default SelectBaseCustom;
