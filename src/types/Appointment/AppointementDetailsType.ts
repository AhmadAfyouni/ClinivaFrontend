import ContactInfo from "../common/ContactInfo";

export default interface AppointementDetailsType {
  _id: string;
  patient: Patient;
  clinic: Clinic | null;
  doctor: Doctor | null;
  datetime: string;
  startTime: string;
  endTime: string;
  reason: string;
  status: string;
  patientRating: number;
  patientFeedback: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface Patient {
  contactInfos: ContactInfo[];
  isActive: boolean;
  medicalTestResults: string[];
  allergies: string[];
  preferredLanguage: string;
  familyMedicalHistory: string[];
  _id: string;
  name: string;
  dateOfBirth: string;
  gender: string;
  identity: string;
  nationality: string;
  image: string;
  marital_status: string;
  number_children: number;
  blood_type: string;
  height: number;
  weight: number;
  notes: string;
  email: string;
  address: string;
  emergencyContact: EmergencyContact;
  ChronicDiseases: ChronicDisease[];
  insurances: InsuranceCompany[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface EmergencyContact {
  name: string;
  phone: string;
  _id: string;
}

interface ChronicDisease {
  disease_name: string;
  _id: string;
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
  contactInfos: ContactInfo[];
  holidays: Holiday[];
  name: string;
  WorkingHours: WorkingHour[];
  bankAccount: BankAccount[];
  insuranceCompany: InsuranceCompany[];
  cashBoxes: CashBox[];
  onlinePaymentMethods: OnlinePaymentMethod[];
  commercialRecord: CommercialRecord;
  locationGoogl: Location;
  departmentId: string;
  specializations: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  id: string;
}

interface Holiday {
  name: string;
  date: string;
  reason: string;
}

interface WorkingHour {
  day: string;
  timeSlots: TimeSlot[];
}

interface TimeSlot {
  startTime: string;
  endTime: string;
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

interface Transaction {
  date: string;
  amount: number;
  description: string;
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

interface Location {
  x: number;
  y: number;
}

interface Doctor {
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
  workingHours: DoctorWorkingHour[];
  employeeType: string;
  vacationRecords: VacationRecord[];
  hireDate: string;
  medicalLicenseNumber: string;
  certifications: string[];
  jobType: string;
  breakTimes: BreakTime[];
  isActive: boolean;
  companyId: string;
  clinicCollectionId: string;
  departmentId: string;
  clinics: string[];
  specializations: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface DoctorWorkingHour {
  day: string;
  startTime: string;
  endTime: string;
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
