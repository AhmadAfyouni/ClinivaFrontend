import { IconChevronRight } from "@tabler/icons-react";
import { Avatar, Group, Text, UnstyledButton } from "@mantine/core";
import classes from "./UserButton.module.css";
import image from "../../assets/medical-team.png";

export function UserButton() {
  const userName = localStorage.getItem("userName");

  const encodedEmail = localStorage.getItem("userEmail");
  const decodedEmail = encodedEmail ? atob(encodedEmail) : "";
  return (
    <UnstyledButton className={classes.user}>
      <Group>
        <Avatar src={image} radius="xl" />
        <div style={{ flex: 1 }}>
          <Text size="sm" fw={500}>
            {/* Harriette Spoonlicker */}
            {userName}
          </Text>
          <Text c="dimmed" size="xs">
            {decodedEmail}
            {/* hspoonlicker@outlook.com */}
          </Text>
        </div>

        <IconChevronRight size={14} stroke={1.5} />
      </Group>
    </UnstyledButton>
  );
}
