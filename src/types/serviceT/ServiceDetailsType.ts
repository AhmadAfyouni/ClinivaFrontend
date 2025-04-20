export default interface ServiceDetailsType {
  id: string;
  name: string;
  description: string;
  price: number;
  clinicAssociation: string[];
  associatedDoctors: string[];
  status: "Active" | "Inactive";
  creationDate: Date | string;
  lastModified: Date | string;
}
