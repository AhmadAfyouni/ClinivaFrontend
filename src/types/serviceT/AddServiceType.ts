export default interface AddServiceType {
  name: string;
  description: string;
  price: number | null;
  clinic: string;
  doctors: string[];
  isActive: boolean;
}
