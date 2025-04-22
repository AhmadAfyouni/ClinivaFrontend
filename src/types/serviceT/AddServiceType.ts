export default interface AddServiceType {
  name: string;
  description: string;
  price: number | null;
  clinics: string[];
  doctors: string[];
  isActive: boolean;
}
