import {
  IconAdjustments,
  IconCalendarStats,
  IconFileAnalytics,
  IconGauge,
  IconLock,
  IconNotes,
  IconPresentationAnalytics,
} from "@tabler/icons-react";
import { Group, ScrollArea, Text, Drawer } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { LinksGroup } from "./NavbarLinksGroup";
import { UserButton } from "./UserButton";
import classes from "./NavbarNested.module.css";
import useDrawerStore from "../../store/useDrawerStore";
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
  {
    label: "Company",
    icon: IconPresentationAnalytics,
    links: [
      { label: "Company", link: "/company" },
      { label: "Add Company", link: "/company/add" },
    ],
  },
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
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { opened, close } = useDrawerStore();
  const links = mockdata.map((item) => (
    <LinksGroup {...item} key={item.label} />
  ));

  const NavbarContent = () => (
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

  const DrawerContent = () => (
    <div className={classes.drawerContent}>
      <div className={classes.drawerHeader}>
        <Group justify="space-between">
          {/* <Logo style={{ width: 120 }} /> */}
          <Text fs={"oblique"} size="1.5rem" fw={"bold"}>
            Cliniva
          </Text>
          {/* <Code fw={700}>v3.1.2</Code> */}
        </Group>
      </div>

      <div className={classes.drawerBody}>
        <ScrollArea>
          <div className={classes.linksInner}>{links}</div>
        </ScrollArea>
      </div>

      <div className={classes.drawerFooter}>
        <UserButton />
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <Drawer
        opened={opened}
        onClose={close}
        size="100%"
        padding={0}
        title="Menu"
        hiddenFrom="md"
        zIndex={9999}
        styles={{
          content: {
            padding: 0,
          },
        }}
      >
        <DrawerContent />
      </Drawer>
    );
  }

  return <NavbarContent />;
}
