import { Select } from "@mantine/core";
import InputPropsType from "../../../types/InputsType";
import { useTranslation } from "react-i18next";

interface Props {
  base: InputPropsType;
}
function SelectBaseCustom({ base }: Props) {
  const { t } = useTranslation("index");

  return (
    <Select
      withAsterisk={base.mandatory}
      id={base.id}
      name={base.id}
      label={t(base.label)}
      placeholder={t(base.placeholder || "")}
      data={base.selectValue}
      searchable
      nothingFoundMessage="Nothing found..."
      disabled={base.disabled}
      error={t(base.error || "")}
      // onChange={base.onChange}
      onChange={(value) => base.onChange(value)}
      value={base.value?.toString()}
    />
  );
}

export default SelectBaseCustom;
