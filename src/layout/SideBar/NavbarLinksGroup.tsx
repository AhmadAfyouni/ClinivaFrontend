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
  links?: { 
    label: string; 
    link: string;
    requiredPlan?: string; // Add required plan for each link
  }[];
  requiredPlan?: string; // Add required plan for the parent group
}

export function LinksGroup({
  icon: Icon,
  label,
  initiallyOpened,
  links,
  link,
  requiredPlan,
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

  const items = (links || []).filter(linkItem => {
    // Check if user has access to this link based on their plan
    const userPlan = localStorage.getItem('plan');
    const planHierarchy = ['clinic', 'department', 'complex', 'company'];
    if (!linkItem.requiredPlan || !userPlan) return true;
    const userPlanIndex = planHierarchy.indexOf(userPlan);
    const requiredPlanIndex = planHierarchy.indexOf(linkItem.requiredPlan);
    return userPlanIndex !== -1 && requiredPlanIndex !== -1 && userPlanIndex >= requiredPlanIndex;
  }).map((linkItem) => (
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
    (link && isActive(link) && (!requiredPlan || (() => {
      const userPlan = localStorage.getItem('plan') || 'company'; // Default to company plan if not set
      const planHierarchy = ['clinic', 'department', 'complex', 'company'];
      const userPlanIndex = planHierarchy.indexOf(userPlan);
      const requiredPlanIndex = planHierarchy.indexOf(requiredPlan);
      return userPlanIndex !== -1 && requiredPlanIndex !== -1 && userPlanIndex >= requiredPlanIndex;
    })())) ||
    (links && links.some((l) => 
      isActive(l.link) && 
      (!l.requiredPlan || l.requiredPlan === localStorage.getItem('plan') || localStorage.getItem('plan') === 'enterprise')
    ));

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
