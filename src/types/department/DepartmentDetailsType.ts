import { InsuranceCompany, Specialization } from "../company/AddCompanyType";
import CashBox from "../common/CashBox";
import OnlinePaymentMethod from "../common/OnlinePaymentMethod";
import { BankAccount } from "../Employee/GetEmployee";

interface ContactInfo {
  type: string;
  value: string;
  isPublic: boolean;
  subType: string;
}

interface Holiday {
  name: string;
  date: string;
  reason: string;
}

interface TimeSlot {
  startTime: string;
  endTime: string;
}

interface WorkingDay {
  day: string;
  timeSlots: TimeSlot[];
}

interface SpecializationDetail {
  name: string;
  description: string;
}

interface ClinicCollection {
  _id: string;
  id?: string;
  isActive: boolean;
  name: string;
  address: string;
  vision: string;
  details?: string;
  ContactInfos?: ContactInfo[];
  contactInfos?: ContactInfo[];
  holidays: Holiday[];
  specialization?: SpecializationDetail[];
  specializations?: string[];
  workingDays: WorkingDay[];
  bankAccount: BankAccount[];
  insuranceCompany: InsuranceCompany[];
  cashBoxes?: CashBox[];
  onlinePaymentMethods?: OnlinePaymentMethod[];
  companyId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export default interface DepartmentDetailsType {
  _id: string;
  isActive: boolean;
  name: string;
  introduction?: string;
  yearOfEstablishment: string;
  address: string;
  logo?: string;
  vision: string;
  details?: string;
  ContactInfos: ContactInfo[];
  requiredStaff: string[];
  specializations: Specialization[];
  clinicCollectionId: ClinicCollection | null;
  createdAt: string;
  updatedAt: string;
  __v: number;
  clinicCount: number;
  patientCount: number;
  publicId: string;
  PIC: string;
}
