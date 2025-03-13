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
import { useEffect } from "react";

const Root = () => {
  const { dark } = useDarkThem();
  console.log("@@##@", dark);
  useEffect(() => {
    console.log(dark);
  }, [dark]);
  return (
    <DirectionProvider>
      <MantineProvider defaultColorScheme={dark === "dark" ? "light" : "light"}>
        <ColorSchemeScript />
        <App />
      </MantineProvider>
    </DirectionProvider>
  );
};

createRoot(document.getElementById("root")!).render(<Root />);
