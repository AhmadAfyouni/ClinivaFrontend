import "@mantine/core/styles.css";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import {
  MantineProvider,
  ColorSchemeScript,
  DirectionProvider,
} from "@mantine/core";
import { useDarkThem } from "./store/useDarkThem.ts";
import "../src/translation/index"; // ✅ i18n init
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

// ThemeProvider component
const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const { dark } = useDarkThem();
  const { i18n } = useTranslation();

  const direction = i18n.language === "ar" ? "rtl" : "ltr";

  // Update HTML direction
  useEffect(() => {
    document.documentElement.setAttribute("dir", direction);
  }, [direction]);

  return (
    <>
      <DirectionProvider>
        <MantineProvider defaultColorScheme={dark}>
          <ColorSchemeScript />
          {children}
        </MantineProvider>
      </DirectionProvider>
    </>
  );
};

const Root = () => (
  <ThemeProvider>
    <App />
  </ThemeProvider>
);

createRoot(document.getElementById("root")!).render(<Root />);
