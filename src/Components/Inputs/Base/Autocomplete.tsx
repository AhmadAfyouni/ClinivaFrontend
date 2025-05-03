import { Autocomplete } from "@mantine/core";
import InputPropsType from "../../../types/InputsType";
import { useTranslation } from "react-i18next";

interface Props {
  base: InputPropsType;
}
function AutocompleteCustom({ base }: Props) {
  const { t } = useTranslation();

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
      id={base.id}
      label={t(base.label)}
      placeholder={t(base.placeholder || "")}
      data={data}
      withScrollArea={false}
      onChange={handleChange}
      onBlur={base.onBlur}
      styles={{ dropdown: { maxHeight: 200, overflowY: "auto" } }}
      mt="md"
      disabled={base.disabled}
      value={base.value?.toString() || ""}
      error={t(base.error || "")}
    />
  );
}

export default AutocompleteCustom;
