import { create } from "zustand";

interface DeleteDialogState {
  isOpen: boolean;
  openDialog: () => void;
  closeDialog: () => void;
}

export const useDeleteDialogStore = create<DeleteDialogState>((set) => ({
  isOpen: false,
  openDialog: () => set({ isOpen: true }),
  closeDialog: () => set({ isOpen: false }),
}));
