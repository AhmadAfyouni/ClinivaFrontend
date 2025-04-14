import { create } from "zustand";

type SortField = string;

type SortOrder = "asc" | "desc";

interface SortState {
  sortBy: SortField;
  order: SortOrder;
  setSortBy: (field: SortField) => void;
  toggleOrder: () => void;
  setOrder: (order: SortOrder) => void;
}

const useSortStore = create<SortState>((set, get) => ({
  sortBy: "_id",
  order: "desc",
  setSortBy: (field) => set({ sortBy: field }),
  setOrder: (order) => set({ order }),
  toggleOrder: () => set({ order: get().order === "asc" ? "desc" : "asc" }),
}));

export default useSortStore;
