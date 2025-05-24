import { useState } from "react";
import { Group, Box, Collapse, Text, UnstyledButton, rem } from "@mantine/core";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { useNavigate, useLocation } from "react-router-dom";
import classes from "./NavbarLinksGroup.module.css";
import { useTranslation } from "react-i18next";

interface LinksGroupProps {
  // icon: React.ComponentType<{
  //   size?: number;
  //   stroke?: number;
  //   style?: React.CSSProperties;
  // }>;
  icon: React.ElementType;
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
  const { i18n } = useTranslation();

  const handleClick = (targetLink: string) => {
    navigate(targetLink);
  };

  // const isActive = (path: string) => location.pathname === path;
  const isActive = (path: string) => {
    return (
      location.pathname === path || location.pathname.startsWith(`${path}/`)
    );
  };
  const items = (links || [])
    .filter((linkItem) => {
      // Check if user has access to this link based on their plan
      const userPlan = localStorage.getItem("plan");
      const planHierarchy = ["clinic", "department", "complex", "company"];
      if (!linkItem.requiredPlan || !userPlan) return true;
      const userPlanIndex = planHierarchy.indexOf(userPlan);
      const requiredPlanIndex = planHierarchy.indexOf(linkItem.requiredPlan);
      return (
        userPlanIndex !== -1 &&
        requiredPlanIndex !== -1 &&
        userPlanIndex >= requiredPlanIndex
      );
    })
    .map((linkItem) => (
      <Text<"a">
        component="a"
        className={`${classes.link} 
        ${isActive(linkItem.link) ? classes.activeChildren : ""}
      ${i18n.language === "ar" ? classes.rtlLink : classes.ltrLink}
      `}
        key={linkItem.label}
        style={{ color: "#717680" }}
        onClick={() => handleClick(linkItem.link)}
      >
        {linkItem.label}
      </Text>
    ));

  const isParentActive =
    (link &&
      isActive(link) &&
      (!requiredPlan ||
        (() => {
          const userPlan = localStorage.getItem("plan") || "company"; // Default to company plan if not set
          const planHierarchy = ["clinic", "department", "complex", "company"];
          const userPlanIndex = planHierarchy.indexOf(userPlan);
          const requiredPlanIndex = planHierarchy.indexOf(requiredPlan);
          return (
            userPlanIndex !== -1 &&
            requiredPlanIndex !== -1 &&
            userPlanIndex >= requiredPlanIndex
          );
        })())) ||
    (links &&
      links.some(
        (l) =>
          isActive(l.link) &&
          (!l.requiredPlan ||
            l.requiredPlan === localStorage.getItem("plan") ||
            localStorage.getItem("plan") === "enterprise")
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
        className={`${classes.control}`}
      >
        <Group
          justify="space-between"
          gap={0}
          className={` ${isParentActive ? classes.active : ""} ${
            classes.hover
          }`}
        >
          <Box
            style={{
              display: "flex",
              alignItems: "center",
              color: "#717680",
            }}
            className={`${classes.linkStyle} ${classes.hover}`}
          >
            {/* <Icon style={{ width: rem(18), height: rem(18) }} /> */}
            <Icon
              className={` ${isParentActive ? classes.activeText : ""} `}
              style={{ width: rem(18), height: rem(18) }}
            />
            <Box
              ml={i18n.language === "ar" ? undefined : "md"}
              mr={i18n.language === "ar" ? "md" : undefined}
              className={` ${isParentActive ? classes.activeText : ""}`}
            >
              {label}
            </Box>
          </Box>
          {links &&
            (i18n.language === "ar" ? (
              <IconChevronLeft
                className={classes.chevron}
                stroke={1.5}
                style={{
                  width: rem(16),
                  height: rem(16),
                  transform: opened ? "rotate(90deg)" : "none",
                }}
              />
            ) : (
              <IconChevronRight
                className={classes.chevron}
                stroke={1.5}
                style={{
                  width: rem(16),
                  height: rem(16),
                  transform: opened ? "rotate(-90deg)" : "none",
                }}
              />
            ))}
        </Group>
      </UnstyledButton>
      {links ? <Collapse in={opened}>{items}</Collapse> : null}
    </>
  );
}
