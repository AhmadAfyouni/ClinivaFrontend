import { create } from "zustand";

interface DrawerState {
  opened: boolean;
  toggle: () => void;
  close: () => void;
}

const useDrawerStore = create<DrawerState>((set) => ({
  opened: false,
  toggle: () => set((state) => ({ opened: !state.opened })),
  close: () => set({ opened: false }),
}));

export default useDrawerStore;
