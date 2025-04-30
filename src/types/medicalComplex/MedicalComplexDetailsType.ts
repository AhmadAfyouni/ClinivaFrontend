import CashBox from "../common/CashBox";
import ContactInfo from "../common/ContactInfo";
import OnlinePaymentMethod from "../common/OnlinePaymentMethod";
import { InsuranceCompany, Specialization } from "../company/AddCompanyType";
import DoctorDetailsType from "../doctor/DoctorDetailsType";
import { BankAccount, Clinic, WorkingHour } from "../Employee/GetEmployee";
import { Holiday } from "../GeneralAdd";
import StaffDetailsType from "../staff/StaffDetailsType";

export interface AssignedDepartment {
  _id: string;
  isActive: boolean;
  name: string;
  yearOfEstablishment?: string;
  address?: string;
  clinicCollectionId: string;
  requiredStaff: string[];
  specializations: Specialization[];
  publicId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export default interface MedicalComplexDetailsType {
  _id: string;
  isActive: boolean;
  name: string;
  contactInfos: ContactInfo[];
  holidays: Holiday[];
  workingDays: WorkingHour[];
  cashBoxes: CashBox[];
  onlinePaymentMethods: OnlinePaymentMethod[];
  bankAccount: BankAccount[];
  insuranceCompany: InsuranceCompany[];
  companyId: string | null;
  specializations: Specialization[];
  publicId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  id: string;
  employeeCount: number;
  departmentCount: number;
  clinicsCount: number;
  patientsCount: number;
  doctorsCount: number;
  staffCount: number;
  assignedDepartments: AssignedDepartment[];
  assignedClinics: Clinic[];
  assignedSpecializations: string[];
  assignedDoctors: DoctorDetailsType[];
  assignedStaff: StaffDetailsType[];
  overview: string;
  goals: string;
  vision: string;
  details: string;
  address: string;
  logo: string;
  PIC: string;
}
