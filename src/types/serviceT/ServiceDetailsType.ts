export default interface ServiceDetailsType {
  _id: string;
  name: string;
  description: string;
  price: number;
  clinicsAssociated: string[];
  doctorsAssociated: string[];
  isActive: boolean;
  creationDate: Date | string;
  lastModified: Date | string;
}
