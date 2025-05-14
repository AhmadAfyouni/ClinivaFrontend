import {
  BankAccountType,
  ContactInfoType,
  Holiday,
  LocationGoogle,
} from "../GeneralAdd";

export interface Specialization {
  name: string;
  description: string;
  [key: string]: unknown;
}

export interface InsuranceCompany {
  companyName: string;
  companyPhone: string;
  companyEmail: string;
}

export interface CommercialRecord {
  recordNumber: string;
  grantDate: string;
  issueDate: string;
  expirationDate: string;
  taxNumber: string;
}

export default interface AddCompanyType {
  name: string;
  address: string;
  yearOfEstablishment: string;
  logo?: string;
  vision: string;
  contactInfos: ContactInfoType[];
  holidays: Holiday[];
  specializations: Specialization[];
  bankAccount: BankAccountType[];
  insuranceCompany: InsuranceCompany[];
  commercialRecord: CommercialRecord;
  locationGoogle: LocationGoogle;
  goals: string;
  overview: string;
  Key_member: string;
  Founder: string;
  Executives: string;
}
