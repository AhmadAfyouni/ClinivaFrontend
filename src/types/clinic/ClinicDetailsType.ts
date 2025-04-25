import { Specialization } from "../company/AddCompanyType";

export default interface ClinicDetailsType {
  _id: string;
  isActive: boolean;
  AverageDurationOfVisit: number;
  overview: string;
  yearOfEstablishment: Date | string;
  address: string;
  logo: string;
  vision: string;
  goals: string;
  contactInfos: ContactInfo[];
  holidays: Holiday[];
  name: string;
  WorkingHours: WorkingHour[];
  bankAccount: BankAccount[];
  insuranceCompany: InsuranceCompany[];
  cashBoxes: CashBox[];
  onlinePaymentMethods: OnlinePaymentMethod[];
  commercialRecord: CommercialRecord;
  locationGoogle: LocationGoogle;
  departmentId: string | null;
  specializations: Specialization[];
  publicId: string;
  createdAt: Date | string;
  updatedAt: Date | string;
  __v: number;
  id: string;
  patientCount: number;
  treatedPatientCount: number;
  employeeCounts: EmployeeCounts;
}

// Supporting interfaces
interface ContactInfo {
  type: "phone" | "email" | "fax" | "other";
  value: string;
  isPublic: boolean;
  subType: "work" | "personal" | "emergency";
}

interface Holiday {
  name: string;
  date: Date | string;
  reason: string;
}

interface WorkingHour {
  day: DayOfWeek;
  startTime: string;
  endTime: string;
}

interface BankAccount {
  accountName: string;
  swiftCode: string;
  bankName: string;
  bankAddress: string;
  accountNumber: string;
  accountType: "personal" | "business";
  isActive: boolean;
}

interface InsuranceCompany {
  companyName: string;
  coveredServices: string[];
  termsAndConditions: string;
  coverageDetails: string[];
  coveragePercentage: number;
  contractStartDate: Date | string;
  contractEndDate: Date | string;
  contactPerson: string;
  companyPhone: string;
  companyEmail: string;
  address: string;
  isActive: boolean;
}

interface CashBox {
  name: string;
  isActive: boolean;
  location: string;
  currency: "SAR" | "USD" | "EUR" | string;
  pic: string;
  totalBalance: number;
  createdBy: string;
  transactionHistory: string[];
}

interface OnlinePaymentMethod {
  companyName: string;
  transactionType: "deposit" | "withdrawal" | "both";
  type: "credit_card" | "digital_wallet" | "bank_transfer";
  supportedCurrencies: string[];
  processingFees: number;
  securityFeatures: string[];
  isActive: boolean;
}

interface CommercialRecord {
  recordNumber: string;
  grantDate: Date | string;
  issueDate: Date | string;
  expirationDate: Date | string;
  taxNumber: string;
}

interface LocationGoogle {
  x: number;
  y: number;
}

interface EmployeeCounts {
  doctors: number;
  nurses: number;
  technicians: number;
  administrative: number;
  total: number;
}

type DayOfWeek =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";
