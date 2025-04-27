import CashBox from "../common/CashBox";
import OnlinePaymentMethod from "../common/OnlinePaymentMethod";

export interface ContactInfoType {
  type: string;
  isPublic: boolean;
  value: string;
  subType: string;
}

export interface InsuranceCompany {
  companyName: string;
  companyPhone: string;
  companyEmail: string;
}

export interface BankAccount {
  accountNumber: string;
  bankName: string;
  swiftCode: string;
  accountName: string;
}

export interface CommercialRecord {
  recordNumber: string;
  grantDate: string; // could be Date later if parsed
  issueDate: string;
  expirationDate: string;
  taxNumber: string;
}

export interface LocationGoogle {
  x: number;
  y: number;
}

export default interface CompanyDetailsType {
  _id: string;
  name: string;
  yearOfEstablishment: string;
  address: string;
  logo: string;
  vision: string;
  contactInfos: ContactInfoType[];
  cashBoxes: CashBox[];
  onlinePaymentMethods: OnlinePaymentMethod[];
  insuranceCompany: InsuranceCompany[];
  bankAccount: BankAccount[];
  commercialRecord: CommercialRecord;
  locationGoogl?: LocationGoogle;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
