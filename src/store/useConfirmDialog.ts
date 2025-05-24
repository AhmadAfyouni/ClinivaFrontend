import { create } from "zustand";

interface ConfirmDialogState {
  isConfirmOpen: boolean;
  openConfirmDialog: () => void;
  closeConfirmDialog: () => void;
}

export const useConfirmDialogStore = create<ConfirmDialogState>((set) => ({
  isConfirmOpen: false,
  openConfirmDialog: () => set({ isConfirmOpen: true }),
  closeConfirmDialog: () => set({ isConfirmOpen: false }),
}));
