import { TableColumn } from "../../../types/TableInputTypes";

export const validateTableRow = <T extends Record<string, unknown>>(
  columns: TableColumn[],
  row: T
): boolean => {
  return columns.every((col) => {
    const value = row[col.key];
    switch (col.type) {
      case "number":
        return value !== 0;
      case "date":
        return value !== null;
      case "email":
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value));
      case "phone":
        return /^[0-9]{10,15}$/.test(String(value));
      default:
        return typeof value === "boolean" ? true : value !== "";
    }
  });
};

export const formatTableValue = (value: unknown): string => {
  if (value instanceof Date) {
    return value.toLocaleDateString();
  }
  if (typeof value === "boolean") {
    return value ? "Yes" : "No";
  }
  return String(value ?? "");
};

export const createEmptyRow = <T extends Record<string, unknown>>(
  columns: TableColumn[]
): T => {
  return Object.fromEntries(
    columns.map((col) => [
      col.key,
      col.type === "number" ? 0 : col.type === "date" ? new Date() : "",
    ])
  ) as T;
};
