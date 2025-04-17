import { create } from "zustand";

interface PageTitleState {
  title: string;
  setTitle: (title: string) => void;
}

const usePageTitleStore = create<PageTitleState>((set) => ({
  title: "Dashboard",
  setTitle: (title: string) => set({ title }),
}));

export default usePageTitleStore;
