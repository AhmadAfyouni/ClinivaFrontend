export interface ContactInfo {
  type: string;
  value: string;
}

export interface WorkingHour {
  day: string;
  startTime: string;
  endTime: string;
}

export interface VacationRecord {
  startDate: string;
  endDate: string;
  reason: string;
}

export interface Certification {
  certificateName: string;
  institution: string;
  issueDate: string;
  expiryDate: string;
  certificateImageUrl: string;
  status: string;
}

export interface BreakTime {
  startTime: string;
  endTime: string;
}

export interface ClinicContactInfo {
  type: string;
  value: string;
  isPublic: boolean;
  subType: string;
}

export interface Holiday {
  name: string;
  date: string;
  reason: string;
}

export interface TimeSlot {
  startTime: string;
  endTime: string;
}

export interface WorkingHours {
  day: string;
  timeSlots: TimeSlot[];
}

export interface BankAccount {
  accountName: string;
  swiftCode: string;
  bankName: string;
  bankAddress: string;
  accountNumber: string;
  accountType: string;
  isActive: boolean;
}

export interface InsuranceCompany {
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

export interface CashBoxTransaction {
  date: string;
  amount: number;
  description: string;
}

export interface CashBox {
  name: string;
  isActive: boolean;
  location: string;
  currency: string;
  pic: string;
  totalBalance: number;
  createdBy: string;
  transactionHistory: CashBoxTransaction[];
}

export interface OnlinePaymentMethod {
  companyName: string;
  transactionType: string;
  type: string;
  supportedCurrencies: string[];
  processingFees: number;
  securityFeatures: string[];
  isActive: boolean;
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

export interface Clinic {
  _id: string;
  isActive: boolean;
  AverageDurationOfVisit: number;
  overview: string;
  yearOfEstablishment: string;
  address: string;
  logo: string;
  vision: string;
  goals: string;
  contactInfos: ClinicContactInfo[];
  holidays: Holiday[];
  name: string;
  WorkingHours: WorkingHours[];
  bankAccount: BankAccount[];
  insuranceCompany: InsuranceCompany[];
  cashBoxes: CashBox[];
  onlinePaymentMethods: OnlinePaymentMethod[];
  commercialRecord: CommercialRecord;
  locationGoogl: LocationGoogle;
  departmentId: string;
  specializations: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export default interface GetEmployeeType {
  _id: string;
  name: string;
  contactInfos: ContactInfo[];
  dateOfBirth: string;
  gender: "male" | "female" | "";
  identity: string;
  nationality: string;
  image: string;
  marital_status: "" | "Single" | "Married" | "Divorced";
  number_children: number;
  notes: string;
  address: string;
  professional_experience: string;
  specialties: string[];
  Languages: string[];
  workingHours: WorkingHour[];
  employeeType:
    | ""
    | "Doctor"
    | "Nurse"
    | "Technician"
    | "Administrative"
    | "Employee"
    | "Other";
  vacationRecords: VacationRecord[];
  hireDate: string;
  medicalLicenseNumber: string;
  certifications: Certification[];
  jobType: "FULL_TIME" | "PART_TIME";
  breakTimes: BreakTime[];
  isActive: boolean;
  companyId: string | null;
  clinicCollectionId: string | null;
  departmentId: string | null;
  clinics: Clinic[] | null;
  specializations: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}
