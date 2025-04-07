import { MultiSelect } from "@mantine/core";
import InputPropsType from "../../../types/InputsType";
interface Props {
  base: InputPropsType;
}
function MultiSelectBase({ base }: Props) {
  return (
    <MultiSelect
      id={base.id}
      name={base.id}
      label={base.label}
      placeholder={base.placeholder}
      data={base.selectValue}
      error={base.error || ""}
      searchable
      nothingFoundMessage="Nothing found..."
      disabled={base.disabled}
      onChange={base.onChange}
      withAsterisk={base.mandatory}
    />
  );
}

export default MultiSelectBase;
