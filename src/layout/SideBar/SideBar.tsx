import { IconUsersGroup, IconUser } from "@tabler/icons-react";
import { Group, ScrollArea, Text, Drawer } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { LinksGroup } from "./NavbarLinksGroup";
import { UserButton } from "./UserButton";
import classes from "./NavbarNested.module.css";
import useDrawerStore from "../../store/useDrawerStore";
import { useTranslation } from "react-i18next";
import { CalendarDays, School, SquareUserRound } from "lucide-react";
import logo from "../../assets/SiteLogo.png";

// import { Logo } from "./Logo";

export function SideBar() {
  const { t, i18n } = useTranslation();
  const mockdata = [
    // { label: t("Dashboard"), icon: IconGauge, link: "/" },
    {
      label: t("Users"),
      icon: IconUser,
      link: "/",
      requiredPlan: "company",
    },
    {
      label: t("Appointments"),
      icon: CalendarDays,
      link: "/appointments",
      requiredPlan: "company",
    },
    {
      label: t("Patients"),
      icon: SquareUserRound,
      link: "/patients",
      requiredPlan: "company",
    },
    {
      label: t("Medical Facilities"),
      icon: School,
      links: [
        {
          label: t("companyInfo"),
          link: "/company",
          requiredPlan: "company",
        },
        {
          label: t("MedicalComplexes"),
          link: "/medicalComplexes",
          requiredPlan: "complex",
        },
        {
          label: t("Departements"),
          link: "/departements",
          requiredPlan: "department",
        },
        {
          label: t("Services"),
          link: "/services",
          requiredPlan: "clinic",
        },
        {
          label: t("Clinics"),
          link: "/clinics",
          requiredPlan: "clinic",
        },
      ],
      requiredPlan: "company", // Parent group requires company plan
    },
    {
      label: t("Doctors & Staff"),
      icon: IconUsersGroup,
      links: [
        {
          label: t("Staff"),
          link: "/employees",
          requiredPlan: "department",
        },
        {
          label: t("Doctors"),
          link: "/doctors",
          requiredPlan: "department",
        },

        {
          label: t("Specialities"),
          link: "/specialities",
          requiredPlan: "department",
        },
      ],
    },
  ];
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { opened, close } = useDrawerStore();
  const links = mockdata.map((item) => (
    <LinksGroup {...item} key={item.label} />
  ));
  // console.log("@!@", i18n.language);
  const NavbarContent = () => (
    <nav
      className={classes.navbar}
      style={{
        left: i18n.language === "en" ? 0 : "auto",
        right: i18n.language === "ar" ? 0 : "auto",
      }}
    >
      <div className={classes.header}>
        <Group justify="center" align="center">
          {/* <Logo style={{ width: 120 }} /> */}
          <img src={logo} alt="" style={{ width: "167px", height: "32px" }} />
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
        position={i18n.language === "ar" ? "right" : "left"}
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
