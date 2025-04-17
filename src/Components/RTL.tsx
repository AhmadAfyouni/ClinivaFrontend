import { ActionIcon, Text, Tooltip, useDirection } from "@mantine/core";

export default function RTL() {
  const { toggleDirection, dir } = useDirection();
  return (
    <Tooltip label={dir === "rtl" ? "Arabic" : "English"}>
      <ActionIcon
        onClick={() => toggleDirection()}
        variant="subtle"
        radius="md"
        size="lg"
      >
        {/* <MdOutlineLanguage size={"1.5rem"} /> */}
        <Text>{dir === "rtl" ? "Ar" : "En"}</Text>
      </ActionIcon>
    </Tooltip>
  );
}
