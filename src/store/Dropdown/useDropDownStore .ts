// src/store/useDropDownStore.ts
import { create } from "zustand";

interface DropDownStore {
  selectedOption: { [key: string]: string | null };
  setSelectedOption: (key: string, value: string | null) => void;
  resetSelectedOption: (key: string) => void;
  resetAllDropDownValues: () => void;
}

const useDropDownStore = create<DropDownStore>((set) => ({
  selectedOption: {},
  setSelectedOption: (key, value) =>
    set((state) => ({
      selectedOption: {
        ...state.selectedOption,
        [key]: value,
      },
    })),
  resetSelectedOption: (key) =>
    set((state) => {
      const updated = { ...state.selectedOption };
      delete updated[key];
      return { selectedOption: updated };
    }),
  resetAllDropDownValues: () => set({ selectedOption: {} }),
}));

export default useDropDownStore;
