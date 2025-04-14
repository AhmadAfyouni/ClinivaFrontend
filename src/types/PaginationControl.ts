export default interface PaginationType {
  withSkelton: boolean;
  paramKey: string;
  current_page: number;
  total_pages: number;
  total_items: number;
  items_per_page: number;
  has_next_page: boolean;
  has_previous_page: boolean;
  setReFetch: (withSkelton: boolean) => void;
  setCurrent_page: (key: number) => void;
  setTotal_pages: (key: number) => void;
  setTotal_items: (key: number) => void;
  setItems_per_page: (key: number) => void;
  setHas_next_page: (key: boolean) => void;
  setHas_previous_page: (key: boolean) => void;
  setSearchKey: (key: string) => void;
}
