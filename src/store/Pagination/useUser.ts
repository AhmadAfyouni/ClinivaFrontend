import { create } from "zustand";
import PaginationType from "../../types/PaginationControl";

const useUserPaginationStore = create<PaginationType>((set) => {
  return {
    withSkelton: false,
    paramKey: "",
    perPage: 10,
    currentPage: 1,
    current_page: 1,
    has_next_page: false,
    has_previous_page: false,
    total_items: 0,
    total_pages: 0,
    items_per_page: 10,
    setCurrent_page(current_page: number) {
      set(() => ({ current_page: current_page }));
    },
    setHas_next_page(has_next_page: boolean) {
      set(() => ({ has_next_page: has_next_page }));
    },
    setHas_previous_page(has_previous_page: boolean) {
      set(() => ({ has_previous_page: has_previous_page }));
    },
    setItems_per_page(items_per_page: number) {
      set(() => ({ items_per_page: items_per_page }));
    },
    setTotal_items(total_items: number) {
      set(() => ({ total_items: total_items }));
    },
    setTotal_pages(total_pages: number) {
      set(() => ({ total_pages: total_pages }));
    },

    setReFetch(withSkelton) {
      set(() => ({ withSkelton: withSkelton }));
    },
    setSearchKey: (key) => {
      set(() => ({ paramKey: key, currentPage: 1 }));
    },
  };
});

export default useUserPaginationStore;
