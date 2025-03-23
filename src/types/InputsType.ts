export default interface InputPropsType {
  id: string;
  label: string;
  tooltip?: string;
  type:
    | "text"
    | "areaText"
    | "number"
    | "image"
    | "date"
    | "radio"
    | "autoCompleat"
    | "select";
  placeholder?: string;
  error?: string;
  description?: string;
  mandatory: boolean;
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | string>
  ) => void;
  onChangeFile?: (file: File | null) => void;
  onBlur?: (
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  value: string | File;
  radio?: RadioType[];
  selectValue?: string[];
}
export interface Text {
  base: InputPropsType;
}
export interface TextArea {
  base: InputPropsType;
}
export interface RadioType {
  value: string;
  label: string;
}
export interface Date {
  base: InputPropsType;
}
