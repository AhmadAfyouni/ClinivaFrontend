import ContactInfo from "../common/ContactInfo";

interface WorkingHour {
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
interface DepartmentId {
  name: string;
}
interface ClinicCollectionId {
  name: string;
}
interface Company {
  name: string;
  id: string;
}
interface Clinic {
  name: string;
  id: string;
}

export default interface DoctorDetailsType {
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
  vacationRecords: VacationRecord[];
  employeeType: string;
  hireDate: string;
  medicalLicenseNumber: string;
  certifications: string[];
  jobType: string;
  breakTimes: BreakTime[];
  isActive: boolean;
  companyId: Company;
  clinicCollectionId: ClinicCollectionId | null;
  departmentId: DepartmentId | null;
  clinics: Clinic[];
  specializations: string[];
  publicId: string;
}
