import { ContactInfoType, Holiday, BankAccountType } from "../GeneralAdd";

interface TimeSlot {
  startTime: string;
  endTime: string;
}

export interface WorkingHourAddClinic {
  day: string;
  timeSlots: TimeSlot;
}

interface InsuranceCompany {
  companyName: string;
  coveredServices: string[];
  termsAndConditions: string;
  coverageDetails: string[];
  coveragePercentage: number;
  contractStartDate: string;
  contractEndDate: string;
  contactPerson: string;
  companyPhone: string;
  companyEmail: string;
  address: string;
  isActive: boolean;
}

interface TransactionHistory {
  date: string;
  amount: number;
  description: string;
}

interface CashBox {
  name: string;
  isActive: boolean;
  location: string;
  currency: string;
  pic: string;
  totalBalance: number;
  createdBy: string;
  transactionHistory: TransactionHistory[];
}

interface OnlinePaymentMethod {
  companyName: string;
  transactionType: string;
  type: string;
  supportedCurrencies: string[];
  processingFees: number;
  securityFeatures: string[];
  isActive: boolean;
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

export default interface AddClinicType {
  isActive: boolean;
  AverageDurationOfVisit: number;
  overview: string;
  yearOfEstablishment: string;
  address: string;
  logo?: string;
  vision: string;
  goals: string;
  contactInfos: ContactInfoType[];
  holidays: Holiday[];
  name: string;
  WorkingHours: WorkingHourAddClinic[];
  bankAccount: BankAccountType[];
  insuranceCompany: InsuranceCompany[];
  cashBoxes: CashBox[];
  onlinePaymentMethods: OnlinePaymentMethod[];
  commercialRecord: CommercialRecord;
  locationGoogl: LocationGoogle;
  departmentId?: string;
  specializations: string[];
  PIC:string
}
