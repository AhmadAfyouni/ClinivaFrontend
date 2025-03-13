import { Switch } from "@mantine/core";
import { IconSun, IconMoonStars } from "@tabler/icons-react";
import { useDarkThem } from "../store/darkThem";

export default function SwitchDarkMode() {
  const { change } = useDarkThem();
  return (
    <Switch
      size="md"
      color="dark.4"
      onLabel={
        <IconSun size={16} stroke={2.5} color="var(--mantine-color-yellow-4)" />
      }
      onClick={change}
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
