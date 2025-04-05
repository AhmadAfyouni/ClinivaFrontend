import { useState } from "react";
import {
  Table,
  Checkbox,
  Button,
  Group,
  Text,
  Box,
  useMantineTheme,
} from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { TableInput } from "./TableInputs";
import { TableSelectionProps } from "../../../types/TableInputTypes";
import { validateTableRow, formatTableValue, createEmptyRow } from "./utils";

export default function TableSelection<T extends Record<string, unknown>>({
  columns,
  title,
  fieldName,
  data = [],
  onFieldChange,
  onDelete,
}: TableSelectionProps<T>) {
  const theme = useMantineTheme();
  const [scrolled, setScrolled] = useState(false);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [tableData, setTableData] = useState<T[]>(data);
  const [newRow, setNewRow] = useState<T>(() => createEmptyRow<T>(columns));

  const handleInputChange = (field: string, value: string | Date | boolean) => {
    const column = columns.find((col) => col.key === field);
    setNewRow(
      (prev: T) =>
        ({
          ...prev,
          [field]:
            column?.type === "number"
              ? Number(value)
              : column?.type === "date"
              ? new Date(value as string)
              : value,
        } as T)
    );
  };

  const handleSave = () => {
    if (validateTableRow<T>(columns, newRow)) {
      const updatedData = [...tableData, newRow];
      setTableData(updatedData);
      onFieldChange(fieldName, updatedData);
      setNewRow(createEmptyRow<T>(columns));
    }
  };

  const handleDeleteSelected = () => {
    const newTableData = tableData.filter(
      (_, index) => !selectedRows.includes(index)
    );
    setTableData(newTableData);
    onFieldChange(fieldName, newTableData);
    onDelete?.(selectedRows);
    setSelectedRows([]);
  };

  const rows = tableData.map((row, index) => (
    <Table.Tr
      key={index}
      bg={
        selectedRows.includes(index)
          ? "var(--mantine-color-blue-light)"
          : undefined
      }
    >
      <Table.Td>
        <Checkbox
          aria-label="Select row"
          checked={selectedRows.includes(index)}
          onChange={(event) =>
            setSelectedRows(
              event.currentTarget.checked
                ? [...selectedRows, index]
                : selectedRows.filter((pos) => pos !== index)
            )
          }
        />
      </Table.Td>
      {columns.map((col) => (
        <Table.Td key={col.key}>{formatTableValue(row[col.key])}</Table.Td>
      ))}
    </Table.Tr>
  ));

  return (
    <Box mb={"xl"} bd={"1px solid red"}>
      <Group justify="space-between" m="sm">
        <Text fw={800} c={theme.primaryColor}>
          {title}
        </Text>
        <Button
          color="red"
          leftSection={<IconTrash size={16} />}
          onClick={handleDeleteSelected}
          disabled={selectedRows.length === 0}
        >
          Delete Selected ({selectedRows.length})
        </Button>
      </Group>
      <Box
        h={200}
        style={{ overflow: "auto" }}
        onScroll={(e) => setScrolled(e.currentTarget.scrollTop > 0)}
      >
        <Table.ScrollContainer minWidth={"100%"}>
          <Table stickyHeader highlightOnHover>
            <Table.Thead
              style={{
                position: "sticky",
                top: 0,
                backgroundColor: "var(--mantine-color-body)",
                transition: "box-shadow 150ms ease",
                zIndex: 1,
                boxShadow: scrolled ? "var(--mantine-shadow-sm)" : "none",
              }}
            >
              <Table.Tr>
                <Table.Th />
                {columns.map((col) => (
                  <Table.Th key={col.key}>{col.label}</Table.Th>
                ))}
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {rows}
              <Table.Tr>
                <Table.Td></Table.Td>
                {columns.map((col) => (
                  <Table.Td key={col.key}>
                    <TableInput
                      column={col}
                      value={newRow[col.key]}
                      onChange={(value) => handleInputChange(col.key, value)}
                    />
                  </Table.Td>
                ))}
              </Table.Tr>
            </Table.Tbody>
          </Table>
        </Table.ScrollContainer>
      </Box>
      <Group justify="flex-end" mt="md">
        <Button
          m="sm"
          onClick={handleSave}
          disabled={!validateTableRow(columns, newRow)}
        >
          Save Row
        </Button>
      </Group>
    </Box>
  );
}
