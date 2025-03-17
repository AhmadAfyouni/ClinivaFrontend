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
import classes from "./NavbarLinksGroup.module.css";
import { useNavigate, useLocation } from "react-router-dom";

interface LinksGroupProps {
  icon: React.FC<any>;
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
  const [opened, setOpened] = useState(initiallyOpened || false);
  const navigate = useNavigate();
  const location = useLocation();
  const hasLinks = Array.isArray(links);
  const isActive = link
    ? location.pathname === link
    : links?.some((l) => location.pathname === l.link);

  const items = (hasLinks ? links : []).map((link) => (
    <Text<"a">
      component="a"
      className={classes.link}
      href={link.link}
      key={link.label}
      onClick={(event) => {
        event.preventDefault();
        navigate(link.link);
      }}
      style={{
        backgroundColor:
          location.pathname === link.link ? "#FFF5F2" : undefined,
      }}
    >
      {link.label}
    </Text>
  ));

  return (
    <>
      <UnstyledButton
        onClick={() => {
          if (hasLinks) {
            setOpened((o) => !o);
          } else if (link) {
            navigate(link);
          }
        }}
        className={classes.control}
        style={{
          backgroundColor: isActive ? "#FFF5F2" : undefined,
        }}
      >
        <Group justify="space-between" gap={0}>
          <Box style={{ display: "flex", alignItems: "center" }}>
            <ThemeIcon variant="light" size={30}>
              <Icon style={{ width: rem(18), height: rem(18) }} />
            </ThemeIcon>
            <Box ml="md">{label}</Box>
          </Box>
          {hasLinks && (
            <IconChevronRight
              className={classes.chevron}
              stroke={1.5}
              style={{
                transform: opened ? "rotate(90deg)" : "none",
              }}
            />
          )}
        </Group>
      </UnstyledButton>
      {hasLinks ? <Collapse in={opened}>{items}</Collapse> : null}
    </>
  );
}

const mockdata = {
  label: "Releases",
  // icon: IconCalendarStats,
  links: [
    { label: "Upcoming releases", link: "/" },
    { label: "Previous releases", link: "/" },
    { label: "Releases schedule", link: "/" },
  ],
};

export function NavbarLinksGroup() {
  return (
    <Box mih={220} p="md">
      <LinksGroup {...mockdata} />
    </Box>
  );
}
