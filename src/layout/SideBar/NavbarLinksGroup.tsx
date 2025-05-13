import { useState } from "react";
import {
  Group,
  Box,
  Collapse,
  ThemeIcon,
  Text,
  UnstyledButton,
  rem,
} from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";
import { useNavigate, useLocation } from "react-router-dom";
import classes from "./NavbarLinksGroup.module.css";

interface LinksGroupProps {
  icon: React.ComponentType<{
    size?: number;
    stroke?: number;
    style?: React.CSSProperties;
  }>;
  label: string;
  initiallyOpened?: boolean;
  link?: string;
  links?: { label: string; link: string }[];
}

export function LinksGroup({
  icon: Icon,
  label,
  initiallyOpened,
  links,
  link,
}: LinksGroupProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [opened, setOpened] = useState(initiallyOpened || false);

  const handleClick = (targetLink: string) => {
    navigate(targetLink);
  };

  // const isActive = (path: string) => location.pathname === path;
const isActive = (path: string) =>
  location.pathname === path || location.pathname.startsWith(`${path}/`);

  const items = (links || []).map((linkItem) => (
    <Text<"a">
      component="a"
      className={`${classes.link} ${
        isActive(linkItem.link) ? classes.active : ""
      }`}
      key={linkItem.label}
      onClick={() => handleClick(linkItem.link)}
    >
      {linkItem.label}
    </Text>
  ));

  const isParentActive =
    (link && isActive(link)) ||
    (links && links.some((l) => isActive(l.link)));

  return (
    <>
      <UnstyledButton
        onClick={() => {
          if (links) {
            setOpened((o) => !o);
          } else if (link) {
            handleClick(link);
          }
        }}
        className={`${classes.control} ${isParentActive ? classes.active : ""}`}
      >
        <Group justify="space-between" gap={0}>
          <Box style={{ display: "flex", alignItems: "center" }}>
            <ThemeIcon variant="light" size={30}>
              <Icon style={{ width: rem(18), height: rem(18) }} />
            </ThemeIcon>
            <Box ml="md">{label}</Box>
          </Box>
          {links && (
            <IconChevronRight
              className={classes.chevron}
              stroke={1.5}
              style={{
                width: rem(16),
                height: rem(16),
                transform: opened ? "rotate(-90deg)" : "none",
              }}
            />
          )}
        </Group>
      </UnstyledButton>
      {links ? <Collapse in={opened}>{items}</Collapse> : null}
    </>
  );
}
