import { MultiSelect } from "@mantine/core";
import InputPropsType from "../../../types/InputsType";
import { useTranslation } from "react-i18next";
interface Props {
  base: InputPropsType;
}
function MultiSelectBase({ base }: Props) {
  const { t } = useTranslation();

  return (
    <MultiSelect
      id={base.id}
      name={base.id}
      label={t(base.label)}
      placeholder={t(base.placeholder || "")}
      data={base.selectValue}
      error={t(base.error || "")}
      searchable
      nothingFoundMessage="Nothing found..."
      disabled={base.disabled}
      onChange={base.onChange}
      withAsterisk={base.mandatory}
      value={base.value as string[]}
    />
  );
}

export default MultiSelectBase;
