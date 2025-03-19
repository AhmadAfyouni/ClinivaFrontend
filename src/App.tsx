import {
  Card,
  Flex,
  MantineProvider,
  MantineThemeOverride,
} from "@mantine/core";
import "./App.css";
import { SideBar } from "./layout/SideBar/SideBar";
import NavBar from "./layout/NavBar/NavBar";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import { BrowserRouter } from "react-router-dom";
import { routes } from "./routes/routes";
import { useRoutes } from "react-router-dom";
import { useMediaQuery } from "@mantine/hooks";
import { useDarkThem } from "./store/darkThem";

const createAppTheme = (
  colorScheme: "light" | "dark"
): MantineThemeOverride => ({
  colors: {
    myPrimary: [
      "#FFF5F2", // 0 - lightest
      "#FFEBE5", // 1 - light
      "#FFD9CF", // 2
      "#FFC7B8", // 3
      "#FEB6A3", // 4 - base (primary)
      "#FE947A", // 5
      "#FD7251", // 6 - dark
      "#FD501F", // 7
      "#EC3A0C", // 8
      "#DC2A00", // 9 - darkest
    ],
  },
  primaryColor: "myPrimary",
  primaryShade: { light: 4, dark: 6 },
  other: {
    secondaryDarkColor: "#9BDABB",
    secondaryLightColor: "#E2F6EC",
    secondaryColor: "#CDEDDD",
    surfaceDefault: colorScheme === "dark" ? "#1A1B1E" : "#FFFDFC",
    bgSubtle: colorScheme === "dark" ? "#25262B" : "#FAFAF8",
    bg: colorScheme === "dark" ? "#2C2E33" : "#FAF6F5",
    borderDefault: colorScheme === "dark" ? "#373A40" : "#E4E2DD",
    onSurfaceTertiary: colorScheme === "dark" ? "#909296" : "#B8B1A9",
    onSurfaceSecondary: colorScheme === "dark" ? "#C1C2C5" : "#66615E",
    onSurfacePrimary: colorScheme === "dark" ? "#FFFFFF" : "#1A1615",
    PurpleHear: "#D9D9D9",
  },
});

function AppContent() {
  const element = useRoutes(routes);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { dark } = useDarkThem();
  const theme = createAppTheme(dark);

  return (
    <Flex h={"100%"} direction={"row"} justify={"flex-start"}>
      <SideBar />
      <Flex
        w={"100%"}
        direction={"column"}
        justify={"start"}
        align={"center"}
        style={{ marginLeft: isMobile ? 0 : "15%" }}
      >
        <NavBar />
        <Card bg={theme.other?.bg} w={"97%"} h={"100%"} mr={"xl"} ml={"xl"}>
          {/* <AddDoctor /> */}
          {element}
        </Card>
      </Flex>
    </Flex>
  );
}

function App() {
  const { dark } = useDarkThem();
  const theme = createAppTheme(dark);

  return (
    <MantineProvider theme={theme}>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </MantineProvider>
  );
}

export default App;
