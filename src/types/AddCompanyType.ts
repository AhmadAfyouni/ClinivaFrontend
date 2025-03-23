export interface ContactInfo {
  name: string;
  email: string;
  phone: string;
  designation: string;
  [key: string]: unknown;
}

export interface Holiday {
  name: string;
  date: string;
  [key: string]: unknown;
}

export interface Specialization {
  name: string;
  description: string;
  [key: string]: unknown;
}

export interface WorkingHours {
  day: string;
  timeSlots: {
    startTime: string;
    endTime: string;
  }[];
}

export interface BankAccount {
  bankName: string;
  accountNumber: string;
  swiftCode: string;
  accountName: string;
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

export interface LocationGoogle {
  x: number;
  y: number;
}

export default interface AddCompanyType {
  name: string;
  address: string;
  intro: string;
  yearOfEstablishment: string;
  logo?: string;
  vision: string;
  details: string;
  contactInfos: ContactInfo[];
  holidays: Holiday[];
  specializations: Specialization[];
  workingDays: WorkingHours[];
  bankAccount: BankAccount[];
  insuranceCompany: InsuranceCompany[];
  commercialRecord: CommercialRecord;
  locationGoogle: LocationGoogle;
}
