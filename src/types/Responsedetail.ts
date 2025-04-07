export default interface ResponseDetailsType<T> {
  success: string;
  message: string;
  data: T;
}
