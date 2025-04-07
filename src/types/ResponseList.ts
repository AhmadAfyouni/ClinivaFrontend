export default interface ResponseType<T> {
  success: string;
  message: string;
  data: T[];
  pagination: PaginationType;
}
interface PaginationType {
  current_page: number;
  total_pages: number;
  total_items: number;
  items_per_page: number;
  has_next_page: boolean;
  has_previous_page: boolean;
}
