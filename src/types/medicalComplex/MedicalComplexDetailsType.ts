import CashBox from "../common/CashBox";
import OnlinePaymentMethod from "../common/OnlinePaymentMethod";

interface TimeSlot {
  startTime: string;
  endTime: string;
}

interface WorkingDay {
  day: string;
  timeSlots: TimeSlot[];
}

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

interface Specialization {
  name: string;
  description: string;
}

interface BankAccount {
  accountName: string;
  swiftCode: string;
  bankName: string;
  accountNumber: string;
}

interface InsuranceCompany {
  companyName: string;
  companyPhone: string;
  companyEmail: string;
}

interface CommercialRecord {
  recordNumber: string;
  grantDate: string;
  issueDate: string;
  expirationDate: string;
  taxNumber: string;
}

interface LocationGoogle {
  x: number;
  y: number;
}

interface Company {
  contactInfos: ContactInfo[];
  cashBoxes: CashBox[];
  onlinePaymentMethods: OnlinePaymentMethod[];
  _id: string;
  name: string;
  intro: string;
  yearOfEstablishment: string;
  address: string;
  logo: string;
  vision: string;
  details: string;
  ContactInfos: ContactInfo[];
  holidays: Holiday[];
  specialization: Specialization[];
  workingDays: WorkingDay[];
  bankAccount: BankAccount[];
  insuranceCompany: InsuranceCompany[];
  commercialRecord: CommercialRecord;
  locationGoogl: LocationGoogle;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface MedicalComplexDetailsType {
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
  companyId: Company;
  createdAt: string;
  updatedAt: string;
  __v: number;
  id: string;
  employeeCount: number;
  departmentCount: number;
}
