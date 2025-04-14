import {
  BankAccountType,
  ContactInfoType,
  Holiday,
  LocationGoogle,
  WorkingHoursType,
} from "../GeneralAdd";

type InsuranceCompany = {
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
};

export interface CommercialRecordType {
  recordNumber: string;
  grantDate: string;
  issueDate: string;
  expirationDate: string;
  taxNumber: string;
}

type CashBox = {
  name: string;
  isActive: boolean;
  location: string;
  currency: string;
  pic: string;
  totalBalance: number;
  createdBy: string;
  transactionHistory: [];
};

type OnlinePaymentMethod = {
  companyName: string;
  type: "credit_card" | "bank_transfer" | "digital_wallet";
  transactionType: "deposit" | "withdrawal" | "transfer";
  supportedCurrencies: string[];
  processingFees: number;
  securityFeatures: string[];
  isActive: boolean;
};

export default interface ClinicCollectionType {
  name: string;
  overview: string;
  policies: string;
  isActive: boolean;
  yearOfEstablishment: string;
  address: string;
  logo: string;
  vision: string;
  goals: string;
  contactInfos: ContactInfoType[];
  holidays: Holiday[];
  workingDays: WorkingHoursType[];
  bankAccount: BankAccountType[];
  insuranceCompany: InsuranceCompany[];
  commercialRecord: CommercialRecordType;
  cashBoxes: CashBox[] | null;
  onlinePaymentMethods: OnlinePaymentMethod[];
  locationGoogl: LocationGoogle;
  companyId: string;
  specializations: string[];
}
