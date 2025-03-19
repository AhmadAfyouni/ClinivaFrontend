import "@mantine/core/styles.css";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import {
  MantineProvider,
  DirectionProvider,
  ColorSchemeScript,
} from "@mantine/core";
import { useDarkThem } from "./store/darkThem.ts";

// Separate component to handle theme changes
const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const { dark } = useDarkThem();

  return (
    <DirectionProvider>
      <MantineProvider defaultColorScheme={dark}>
        <ColorSchemeScript />
        {children}
      </MantineProvider>
    </DirectionProvider>
  );
};

const Root = () => {
  return (
    <ThemeProvider>
      <App />
    </ThemeProvider>
  );
};

createRoot(document.getElementById("root")!).render(<Root />);
