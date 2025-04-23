import CashBox from "../common/CashBox";
import OnlinePaymentMethod from "../common/OnlinePaymentMethod";
import { InsuranceCompany } from "../company/AddCompanyType";
import { BankAccount } from "../Employee/GetEmployee";

export interface ClinicResponse {
  success: boolean;
  message: string;
  data: Clinic;
}

export interface Clinic {
  isActive: boolean;
  contactInfos: ContactInfo[];
  cashBoxes: CashBox[];
  onlinePaymentMethods: OnlinePaymentMethod[];
  specializations: Specialization[];
  _id: string;
  name: string;
  address: string;
  vision: string;
  details: string;
  ContactInfos: ContactInfo[];
  holidays: Holiday[];
  specialization: Specialization[];
  workingDays: WorkingDay[];
  bankAccount: BankAccount[];
  insuranceCompany: InsuranceCompany[];
  companyId: string | null;
  createdAt: string;
  updatedAt: string;
  __v: number;
  id: string;
  employeeCount: number;
  departmentCount: number;
}

export interface ContactInfo {
  type: "phone" | "email" | string;
  value: string;
  isPublic: boolean;
  subType: string;
}

export interface Holiday {
  name: string;
  date: string; // ISO format date
  reason: string;
}

export interface Specialization {
  name: string;
  description: string;
}

export interface WorkingDay {
  day: string;
  timeSlots: TimeSlot[];
}

export interface TimeSlot {
  startTime: string; // e.g., "09:00 AM"
  endTime: string; // e.g., "05:00 PM"
}
