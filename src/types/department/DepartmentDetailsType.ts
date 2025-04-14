export default interface DepartmentDetailsType {
  _id: string;
  name: string;
  description: string;
  isActive: boolean;
  yearOfEstablishment: string;
  address: string;
  patientCapacity: number;
  clinicCollectionId: string;
  requiredStaff: string[];
  specializations: string[];
}
