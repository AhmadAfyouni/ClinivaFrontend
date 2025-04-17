import { Switch } from "@mantine/core";
import { IconSun, IconMoonStars } from "@tabler/icons-react";
import { useDarkThem } from "../store/useDarkThem";

export default function SwitchDarkMode() {
  const { dark, change } = useDarkThem();
  return (
    <Switch
      size="md"
      color="dark.4"
      checked={dark === "dark"}
      onLabel={
        <IconSun size={16} stroke={2.5} color="var(--mantine-color-yellow-4)" />
      }
      onChange={change}
      offLabel={
        <IconMoonStars
          size={16}
          stroke={2.5}
          color="var(--mantine-color-blue-6)"
        />
      }
    />
  );
}
