import { DateInput } from "@mantine/dates";
import { Checkbox, Select, TextInput } from "@mantine/core";
import { TableColumn } from "../../../types/TableInputTypes";

type TableInputProps = {
  column: TableColumn;
  value: unknown;
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
        error={column.error || ""}
      />
    );
  }
  if (column.type === "select") {
    return (
      <Select
        id={column.key}
        name={column.key}
        placeholder={column.label}
        data={column.options}
        searchable
        value={value as string}
        onChange={(selectedValue) => onChange(selectedValue || "")}
        nothingFoundMessage="Nothing found..."
      />
    );
  }
  if (column.type === "boolean") {
    // Handle boolean type
    return (
      <Checkbox
        radius={"md"}
        checked={Boolean(value)}
        onChange={(event) => onChange(event.currentTarget.checked)} // Pass boolean value
        label={column.label}
        error={column.error || ""}
      />
    );
  }
  // if (column.key === "isPublic") {
  //   return (
  //     <Checkbox
  //       checked={Boolean(value)}
  //       onChange={(event) => onChange(event.currentTarget.checked)}
  //       error={column.error || ""}
  //     />
  //   );
  // }

  return (
    <TextInput
      placeholder={column.label}
      value={value?.toString() || ""}
      onChange={(e) => onChange(e.target.value)}
      type={column.type}
      step={column.step}
      error={column.error || ""}
    />
  );
};
