import { create } from "zustand";

type Store = {
  dark: "dark" | "light";
  change: () => void;
};

const getInitialTheme = (): "dark" | "light" => {
  try {
    const savedTheme = localStorage.getItem("theme");
    console.log("Initial theme from localStorage:", savedTheme);

    if (savedTheme === "dark" || savedTheme === "light") {
      return savedTheme;
    }

    const systemDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    console.log("System prefers dark mode:", systemDark);
    return systemDark ? "dark" : "light";
  } catch (error) {
    console.error("Error accessing localStorage:", error);
    return "light"; // fallback to light theme
  }
};

// Initialize theme on load
const initialTheme = getInitialTheme();
console.log("Setting initial theme to:", initialTheme);
document.documentElement.setAttribute(
  "data-mantine-color-scheme",
  initialTheme
);

export const useDarkThem = create<Store>()((set) => ({
  dark: initialTheme,
  change: () =>
    set((state) => {
      try {
        const newTheme = state.dark === "dark" ? "light" : "dark";
        console.log("Changing theme to:", newTheme);

        localStorage.setItem("theme", newTheme);
        document.documentElement.setAttribute(
          "data-mantine-color-scheme",
          newTheme
        );

        return { dark: newTheme };
      } catch (error) {
        console.error("Error saving theme:", error);
        return state; // keep current state if save fails
      }
    }),
}));
