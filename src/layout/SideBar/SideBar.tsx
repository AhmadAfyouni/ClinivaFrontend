import {
  IconAdjustments,
  IconBuildingCommunity,
  IconBuildingHospital,
  IconBuildingSkyscraper,
  IconCalendarStats,
  IconFileAnalytics,
  IconGauge,
  IconHospital,
  IconLock,
  IconMicroscope,
  IconStethoscope,
  IconUsersGroup,
  IconUser,
  IconReportMedical,
} from "@tabler/icons-react";
import { Group, ScrollArea, Text, Drawer } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { LinksGroup } from "./NavbarLinksGroup";
import { UserButton } from "./UserButton";
import classes from "./NavbarNested.module.css";
import useDrawerStore from "../../store/useDrawerStore";

// import { Logo } from "./Logo";

export function SideBar() {
  const mockdata = [
    { label: "Dashboard", icon: IconGauge, link: "/" },
    { label: "Staff", icon: IconUsersGroup, link: "/employees" },
    { label: "Patient", icon: IconUser, link: "/patients" },
    { label: "Doctors", icon: IconStethoscope, link: "/doctors" },
    { label: "User", icon: IconUser, link: "/users" },
    {
      label: "Appointment",
      icon: IconCalendarStats,
      links: [
        { label: "Appointments", link: "/appointments" },
        { label: "Add Appointments", link: "/appointments/add" },
      ],
    },
    {
      label: "Company",
      icon: IconBuildingSkyscraper,
      links: [{ label: "Add Company", link: "/companies/add" }],
    },
    {
      label: "MedicalComplexes",
      icon: IconBuildingHospital,
      link: "/medicalComplexes",
    },
    {
      label: "Departements",
      icon: IconBuildingCommunity,
      link: "/departements",
    },
    {
      label: "Clinics",
      icon: IconHospital,
      link: "/clinics",
    },
    {
      label: "Services",
      icon: IconReportMedical,
      link: "/services",
    },
    {
      label: "Specialities",
      icon: IconMicroscope,
      link: "/specialities",
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
