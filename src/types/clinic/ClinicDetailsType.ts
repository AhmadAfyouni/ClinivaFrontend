interface Location {
  x: number;
  y: number;
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

interface TimeSlot {
  startTime: string;
  endTime: string;
}

interface WorkingHour {
  day: string;
  timeSlots: TimeSlot[];
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

interface Transaction {
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
  transactionHistory: Transaction[];
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

interface Specialization {
  _id: string;
  name: string;
  description: string;
  requiredEquipment: string[];
  requiredStaff: string[];
  medicalProcedures: string[];
  certificationRequirements: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface Department {
  _id: string;
  isActive: boolean;
  name: string;
  introduction?: string;
  yearOfEstablishment: string;
  address: string;
  logo: string;
  vision: string;
  details?: string;
  ContactInfos: ContactInfo[];
  clinicCollectionId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  requiredStaff?: string[];
  specializations?: string[];
}

interface AppointmentStats {
  total: number;
  active: number;
  byStatus: {
    scheduled: number;
    completed: number;
    cancelled: number;
  };
}

interface PatientStats {
  total: number;
}

interface Activity {
  date: string;
  status: string;
}

interface Statistics {
  appointments: AppointmentStats;
  patients: PatientStats;
  recentActivity: Activity[];
}

export default interface ClinicDetailsType {
  _id: string;
  id: string;
  isActive: boolean;
  name: string;
  overview?: string;
  introduction?: string;
  goals?: string;
  details?: string;
  vision?: string;
  AverageDurationOfVisit: number;
  yearOfEstablishment: string;
  address: string;
  logo: string;
  contactInfos: ContactInfo[];
  ContactInfos?: ContactInfo[]; // optional duplicate field in one sample
  holidays: Holiday[];
  WorkingHours: WorkingHour[];
  bankAccount: BankAccount[];
  insuranceCompany: InsuranceCompany[];
  cashBoxes: CashBox[];
  onlinePaymentMethods: OnlinePaymentMethod[];
  commercialRecord?: CommercialRecord;
  locationGoogl: Location;
  departmentId: Department;
  specializations: Specialization[];
  specialization?: object[]; // fallback for malformed data
  createdAt: string;
  updatedAt: string;
  __v: number;
  statistics: Statistics;
}
