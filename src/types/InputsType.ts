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
    | "select"
    | "multiSelect"
    | "time"
    | "email"
    | "phone"
    | "password";
  placeholder?: string;
  error?: string;
  description?: string;
  mandatory: boolean;
  onChange: (
    event:
      | string
      | string[]
      | null
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onChangeFile?: (file: File | null) => void;
  onBlur?: (
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  value?: string | File | string[] | number;
  radio?: RadioType[];
  selectValue?: string[];
  disabled?: boolean;
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
