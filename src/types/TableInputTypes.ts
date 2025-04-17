export interface TableColumn {
  key: string;
  label: string;
  type?:
    | "text"
    | "number"
    | "date"
    | "email"
    | "phone"
    | "select"
    | "time"
    | "checkBox"
    | "boolean";
  step?: string;
  options?: string[];
  error?: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface TableSelectionProps<T extends Record<string, any>> {
  title: string;
  fieldName: string;
  columns: TableColumn[];
  data?: T[];
  onFieldChange: (fieldName: string, value: T[]) => void;
  onDelete?: (selectedIds: number[]) => void;
  error: string;
}
