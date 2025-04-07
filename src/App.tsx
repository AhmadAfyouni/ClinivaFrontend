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
import "@mantine/notifications/styles.css";
import { BrowserRouter, useLocation, useNavigate } from "react-router-dom";
import { routes } from "./routes/routes";
import { useRoutes } from "react-router-dom";
import { useMediaQuery } from "@mantine/hooks";
import { useDarkThem } from "./store/darkThem";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LoaderCustom from "./Components/Loader";
import { useEffect } from "react";
import { Notifications } from "@mantine/notifications";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

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
    calenderCard1: "#FFD9CF",
    calenderCard2: "#CDEDDD",

    calenderCardText1: "#1A1615",
    calenderCardText2: "#66615E",
  },
});

function AppContent() {
  const element = useRoutes(routes);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { dark } = useDarkThem();
  const theme = createAppTheme(dark);
  const location = useLocation();
  const navigate = useNavigate();
  const isLoginPage = location.pathname === "/login";

  useEffect(() => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");

    if (!token && !isLoginPage) {
      navigate("/login");
    } else if (token && isLoginPage) {
      navigate("/");
    }
  }, [navigate, isLoginPage]);

  if (isLoginPage) {
    return element;
  }

  return (
    <>
      <LoaderCustom />

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
          <Card bg={theme.other?.bg} w={"100%"} h={"100%"} mr={"xl"} ml={"xl"}>
            {element}
          </Card>
        </Flex>
      </Flex>
    </>
  );
}

function App() {
  const { dark } = useDarkThem();
  const theme = createAppTheme(dark);
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { refetchOnWindowFocus: false, staleTime: 1000 * 60 * 2 },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer />
      <MantineProvider theme={theme}>
        <Notifications />

        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </MantineProvider>
    </QueryClientProvider>
  );
}

export default App;
