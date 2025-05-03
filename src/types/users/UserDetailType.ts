interface Role {
  _id: string;
  name: string;
  permissions: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

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

interface WorkingHours {
  day: string;
  startTime: string;
  endTime: string;
}

interface BreakTime {
  startTime: string;
  endTime: string;
}
interface ClinicCollectionId {
  id: string;
  name: string;
}
interface DepartmentId {
  id: string;
  name: string;
}
interface LoginHistory {
  loginDate: Date;
  ipAddress: string;
  device: string;
}
interface Employee {
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
  workingHours: WorkingHours[];
  employeeType: string;
  vacationRecords: VacationRecord[];
  hireDate: string;
  medicalLicenseNumber: string;
  certifications: string[];
  jobType: string;
  breakTimes: BreakTime[];
  isActive: boolean;
  companyId: string | null;
  clinicCollectionId: ClinicCollectionId | null;
  departmentId: DepartmentId | null;
  clinics: string[];
  specializations: string[];
  publicId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export default interface UserDetailType {
  _id: string;
  name: string;
  email: string;
  password: string;
  isActive: boolean;
  roleIds: Role[];
  employeeId: Employee;
  lastLoginAt: string | null;
  activityLog: string;
  loginHistory: LoginHistory[];
  publicId: string;
  createdAt: string;
  updatedAt: string;
  image: string;
  __v: number;
}
