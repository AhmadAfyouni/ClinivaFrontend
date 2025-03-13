import { create } from "zustand";

type Store = {
  dark: "dark" | "light";
  change: () => void;
};

export const useDarkThem = create<Store>()((set) => ({
  dark: "dark",
  change: () =>
    set((state) => ({ dark: state.dark === "dark" ? "light" : "dark" })),
}));
