// src/stores/useSortStore.ts
import { create } from "zustand";

type SortField = string;
type SortOrder = "asc" | "desc";

interface SortState {
  sortBy: SortField;
  order: SortOrder;
  setSortBy: (field: SortField) => void;
  toggleOrder: () => void;
  setOrder: (order: SortOrder) => void;
  resetSort: () => void;
}

const useSortStore = create<SortState>((set, get) => ({
  sortBy: "_id", // Default value
  order: "desc", // Default value
  setSortBy: (field) => set({ sortBy: field }),
  setOrder: (order) => set({ order }),
  toggleOrder: () => set({ order: get().order === "asc" ? "desc" : "asc" }),
  resetSort: () => set({ sortBy: "_id", order: "desc" }), // Reset to default
}));

export default useSortStore;
