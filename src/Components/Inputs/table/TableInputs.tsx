import { DateInput } from "@mantine/dates";
import { Checkbox, Select, TextInput } from "@mantine/core";
import { TableColumn } from "../../../types/TableInputTypes";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
type TableInputProps = {
  column: TableColumn;
  value: unknown;
  onChange: (value: string | Date | boolean) => void;
};

export const TableInput = ({ column, value, onChange }: TableInputProps) => {
  const { t } = useTranslation("index");

  if (column.type === "date") {
    return (
      <DateInput
        placeholder={column.label}
        value={value as Date}
                onChange={(date) => {
          const formatted = date ? dayjs(date).format("MMMM D, YYYY") : "";
          onChange(formatted); 
        }}
        valueFormat="MMMM D, YYYY"
        error={t(column.error || "")}
      />
    );
  }
  if (column.type === "day") {
    return (
      <DateInput
        placeholder={column.label}
        value={value as Date}
        onChange={(date) => {
          const formatted = date ? dayjs(date).format("MMMM D, YYYY") : "";
          onChange(formatted);
        }}
        valueFormat="MMMM D, YYYY"
        error={t(column.error || "")}
      />
    );
  }
  if (column.type === "select") {
    return (
      <Select
        id={column.key}
        name={column.key}
        placeholder={t(column.label)}
        data={column.options}
        searchable
        value={value as string}
        onChange={(selectedValue) => onChange(selectedValue || "")}
        nothingFoundMessage={t("Nothing found...")}
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
        label={t(column.label)}
        error={t(column.error || "")}
      />
    );
  }

  return (
    <TextInput
      placeholder={t(column.label)}
      value={value?.toString() || ""}
      onChange={(e) => onChange(e.target.value)}
      type={column.type}
      step={column.step}
      error={t(column.error || "")}
    />
  );
};
