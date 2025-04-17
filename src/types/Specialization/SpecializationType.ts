type statistics = {
  clinics: number;
  doctors: number;
};
export default interface SpecializationListType {
  _id: string;
  name: string;
  description: string;
  requiredEquipment: string[];
  requiredStaff: string[];
  medicalProcedures: string[];
  certificationRequirements: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  statistics: statistics;
}
