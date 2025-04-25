interface ContactInfo {
  type: string;
  value: string;
  isPublic: boolean;
  subType: string;
}

interface VacationRecord {
  leaveStartDate: string;
  leaveEndDate: string;
  leaveType: string;
  status: string;
}

interface BreakTime {
  startTime: string;
  endTime: string;
}

interface WorkingHour {
  day: string;
  startTime: string;
  endTime: string;
}

interface Holiday {
  name: string;
  date: string;
  reason: string;
}

interface TimeSlot {
  startTime: string;
  endTime: string;
}

interface WorkingDay {
  day: string;
  timeSlots: TimeSlot[];
}

interface Specialization {
  name: string;
  description: string;
}

interface ClinicContactInfo {
  type: string;
  value: string;
  isPublic: boolean;
  subType: string;
}

interface BankAccount {
  accountName: string;
  swiftCode: string;
  bankName: string;
  bankAddress: string;
  accountNumber: string;
  accountType: string;
  isActive: boolean;
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

interface LocationGoogl {
  x: number;
  y: number;
}

interface Clinic {
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
  WorkingHours: WorkingDay[];
  bankAccount: BankAccount[];
  insuranceCompany: InsuranceCompany[];
  cashBoxes: CashBox[];
  onlinePaymentMethods: OnlinePaymentMethod[];
  commercialRecord: CommercialRecord;
  locationGoogl: LocationGoogl;
  departmentId: string;
  specializations: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  id: string;
}

interface ClinicCollection {
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
  companyId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  id: string;
}

interface Department {
  isActive: boolean;
  requiredStaff: string[];
  specializations: Specialization[];
  _id: string;
  name: string;
  introduction: string;
  yearOfEstablishment: string;
  address: string;
  logo: string;
  vision: string;
  details: string;
  ContactInfos: ContactInfo[];
  clinicCollectionId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export default interface StaffDetailsType {
  _id: string;
  name: string;
  contactInfos: ContactInfo[];
  dateOfBirth: string;
  gender: string;
  identity: string;
  nationality: string;
  image: string;
  marital_status: string;
  number_children: number;
  notes: string;
  address: string;
  professional_experience: string;
  specialties: string[];
  Languages: string[];
  workingHours: WorkingHour[];
  employeeType: string;
  vacationRecords: VacationRecord[];
  hireDate: string;
  medicalLicenseNumber: string;
  certifications: string[];
  jobType: string;
  breakTimes: BreakTime[];
  isActive: boolean;
  companyId: string | null;
  clinicCollectionId: ClinicCollection;
  departmentId: Department;
  clinics: Clinic[];
  specializations: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}
