import {
  IconAdjustments,
  IconBuildingCommunity,
  IconBuildingHospital,
  IconBuildingSkyscraper,
  IconCalendarStats,
  IconFileAnalytics,
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
import { useDirection } from "@mantine/core";
import { LinksGroup } from "./NavbarLinksGroup";
import { UserButton } from "./UserButton";
import classes from "./NavbarNested.module.css";
import useDrawerStore from "../../store/useDrawerStore";
import { useTranslation } from "react-i18next";

// import { Logo } from "./Logo";

export function SideBar() {
  const { t } = useTranslation();
  const { dir } = useDirection();
  const mockdata = [
    // { label: t("Dashboard"), icon: IconGauge, link: "/" },
    { label: t("Users"), icon: IconUser, link: "/" },

    {
      label: t("MedicalComplexes"),
      icon: IconBuildingHospital,
      link: "/medicalComplexes",
    },
    {
      label: t("Departements"),
      icon: IconBuildingCommunity,
      link: "/departements",
    },
    {
      label: t("Specialities"),
      icon: IconMicroscope,
      link: "/specialities",
    },
    {
      label: t("Clinics"),
      icon: IconHospital,
      link: "/clinics",
    },
    {
      label: t("Appointments"),
      icon: IconCalendarStats,
      link: "/appointments",
    },
    // {
    //   label: t("Appointment"),
    //   icon: IconCalendarStats,
    //   links: [
    //     { label: t("Appointments"), link: "/appointments" },
    //     { label: t("Add Appointments"), link: "/appointments/add" },
    //   ],
    // },
    { label: t("Staff"), icon: IconUsersGroup, link: "/employees" },
    { label: t("Doctors"), icon: IconStethoscope, link: "/doctors" },
    { label: t("Patients"), icon: IconUser, link: "/patients" },
    {
      label: t("Services"),
      icon: IconReportMedical,
      link: "/services",
    },
    {
      label: t("companyInfo"),
      icon: IconBuildingSkyscraper,
      link: "/company",
    },

    { label: t("Contracts"), icon: IconFileAnalytics, link: "/contracts" },
    { label: t("Settings"), icon: IconAdjustments, link: "/settings" },
    {
      label: t("Security"),
      icon: IconLock,
      links: [
        { label: t("Enable 2FA"), link: "/security/2fa" },
        { label: t("Change password"), link: "/security/password" },
        { label: t("Recovery codes"), link: "/security/recovery" },
      ],
    },
  ];
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { opened, close } = useDrawerStore();
  const links = mockdata.map((item) => (
    <LinksGroup {...item} key={item.label} />
  ));

  const NavbarContent = () => (
    <nav
      className={classes.navbar}
      style={{
        left: dir === "ltr" ? 0 : "auto",
        right: dir === "rtl" ? 0 : "auto",
      }}
    >
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
        position={dir === "rtl" ? "right" : "left"}
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
