export default interface AddSpecialityType {
  name: string;
  description: string;
  requiredEquipment: string;
  requiredStaff: string[];
  medicalProcedures: string;
  certificationRequirements: string;
  isActive: boolean;
}
