import PaginationType from "./PaginationControl";

export default interface ResponseType<T> {
  success: string;
  message: string;
  data: T[];
  pagination: PaginationType;
}
