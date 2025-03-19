export interface TableColumn {
  key: string;
  label: string;
  type?: "text" | "number" | "date" | "email" | "phone";
  step?: string;
  options?: string[];
}

export interface TableSelectionProps<T extends Record<string, unknown>> {
  title: string;
  fieldName: string;
  columns: TableColumn[];
  data?: T[];
  onFieldChange: (fieldName: string, value: T[]) => void;
  onDelete?: (selectedIds: number[]) => void;
}
