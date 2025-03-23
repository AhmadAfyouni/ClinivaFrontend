import { DateInput } from "@mantine/dates";
import { Checkbox, TextInput } from "@mantine/core";
import { TableColumn, TableRow } from "../../../types/TableInputTypes";

type TableInputProps = {
  column: TableColumn;
  value: TableRow;
  onChange: (value: string | Date | boolean) => void;
};

export const TableInput = ({ column, value, onChange }: TableInputProps) => {
  if (column.type === "date") {
    return (
      <DateInput
        placeholder={column.label}
        value={value as Date}
        onChange={(date) => onChange(date || new Date())}
        valueFormat="YYYY-MM-DD"
      />
    );
  }

  if (column.key === "isPublic") {
    return (
      <Checkbox
        checked={Boolean(value)}
        onChange={(event) => onChange(event.currentTarget.checked)}
      />
    );
  }

  return (
    <TextInput
      placeholder={column.label}
      value={value?.toString() || ""}
      onChange={(e) => onChange(e.target.value)}
      type={column.type}
      step={column.step}
    />
  );
};
