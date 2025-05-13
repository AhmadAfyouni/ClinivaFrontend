import CashBox from "../common/CashBox";
import Holiday from "../common/Holiday";
import LocationGoogl from "../common/LocationGoogl";
import OnlinePaymentMethod from "../common/OnlinePaymentMethod";
import { BankAccountType } from "../GeneralAdd";
import { Specialization } from "./AddCompanyType";

export interface ContactInfoType {
  type: "email" | "phone";
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
  specializations: Specialization[];
  cashBoxes: CashBox[];
  holidays: Holiday[];
  onlinePaymentMethods: OnlinePaymentMethod[];
  insuranceCompany: InsuranceCompany[];
  bankAccount: BankAccountType[];
  commercialRecord: CommercialRecord;
  locationGoogl?: LocationGoogle;
  createdAt: string;
  updatedAt: string;
  goals: string;
  overview: string;
  location: LocationGoogl;
  Key_member: string;
  Founder: string;
  Executives: string;
  intro: string;
  details: string;
  __v: number;
}
