import {
  IconAdjustments,
  IconCalendarStats,
  IconFileAnalytics,
  IconGauge,
  IconLock,
  IconNotes,
  IconPresentationAnalytics,
} from "@tabler/icons-react";
import { Group, ScrollArea, Text } from "@mantine/core";
import { LinksGroup } from "./NavbarLinksGroup";
import { UserButton } from "./UserButton";
import classes from "./NavbarNested.module.css";
// import { Logo } from "./Logo";

const mockdata = [
  { label: "Dashboard", icon: IconGauge, link: "/" },
  {
    label: "Patient",
    icon: IconNotes,
    initiallyOpened: true,
    links: [
      { label: "Add Patient", link: "/patients/add" },
      { label: "All Patients", link: "/patients/all" },
      { label: "Appointments", link: "/patients/appointments" },
      { label: "Records", link: "/patients/records" },
    ],
  },
  {
    label: "Doctor",
    icon: IconCalendarStats,
    links: [
      { label: "Add Doctor", link: "/doctors/add" },
      { label: "All Doctors", link: "/doctors/all" },
    ],
  },
  { label: "Analytics", icon: IconPresentationAnalytics, link: "/analytics" },
  { label: "Contracts", icon: IconFileAnalytics, link: "/contracts" },
  { label: "Settings", icon: IconAdjustments, link: "/settings" },
  {
    label: "Security",
    icon: IconLock,
    links: [
      { label: "Enable 2FA", link: "/security/2fa" },
      { label: "Change password", link: "/security/password" },
      { label: "Recovery codes", link: "/security/recovery" },
    ],
  },
];

export function SideBar() {
  const links = mockdata.map((item) => (
    <LinksGroup {...item} key={item.label} />
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.header}>
        <Group justify="space-between">
          {/* <Logo style={{ width: 120 }} /> */}
          <Text fs={"oblique"} size="1.5rem" fw={"bold"}>
            Cliniva
          </Text>
          {/* <Code fw={700}>v3.1.2</Code> */}
        </Group>
      </div>

      <ScrollArea className={classes.links}>
        <div className={classes.linksInner}>{links}</div>
      </ScrollArea>

      <div className={classes.footer}>
        <UserButton />
      </div>
    </nav>
  );
}
