export default interface ServiceDetailsType {
  _id: string;
  name: string;
  description: string;
  price: number;
  clinicAssociation: string[];
  associatedDoctors: string[];
  isActive: "Active" | "Inactive";
  creationDate: Date | string;
  lastModified: Date | string;
}
