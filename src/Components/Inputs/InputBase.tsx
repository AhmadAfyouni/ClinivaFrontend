import InputTooltipBase from "./Base/TextWithTooltip";
import InputPropsType from "../../types/InputsType";
import TextareaBase from "./Base/TextArea";
import DateBase from "./Base/DateBase";
import RadioBase from "./Base/RadioBase";
import InputFileBase from "./Base/InputFileBase";
import AutocompleteCustom from "./Base/Autocomplete";
import SelectBaseCustom from "./Base/SelectBase";
import MultiSelectBase from "./Base/MultiSelect";
interface Props {
  base: InputPropsType;
}
function InputBaseCustom({ base }: Props) {
  if (
    base.type === "text" ||
    base.type === "number" ||
    base.type === "password" ||
    base.type === "email"
  )
    return <InputTooltipBase base={base} key={base.id} />;
  else if (base.type === "areaText")
    return <TextareaBase base={base} key={base.id} />;
  else if (base.type === "date") return <DateBase base={base} key={base.id} />;
  else if (base.type === "radio")
    return (
      <RadioBase base={base} radio={base.radio || [{ label: "", value: "" }]} />
    );
  else if (base.type === "image") return <InputFileBase base={base} />;
  else if (base.type === "autoCompleat")
    return <AutocompleteCustom base={base} />;
  else if (base.type === "multiSelect") return <MultiSelectBase base={base} />;
  else if (base.type === "select") return <SelectBaseCustom base={base} />;
  return <>!</>;
}

export default InputBaseCustom;
