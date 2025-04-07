export interface BreakTimesType {
  startTime: string;
  endTime: string;
}

export interface WorkingHoursType {
  day: string;
  startTime: string;
  endTime: string;
}
export interface VacationRecordsType {
  leaveStartDate: string;
  leaveEndDate: string;
  leaveType: "Vacation" | "Sick Leave" | "Emergency";
  status: "Pending" | "Approved";
}

export interface ContactInfoType {
  type: "email" | "phone";
  value: string;
  isPublic: boolean;
  subType?: string;
}

export default interface AddEmployeeType {
  name: string;
  contactInfos: ContactInfoType[];
  dateOfBirth: string;
  gender: "female" | "male" | "";
  identity: string;
  nationality: string;
  image: string;
  marital_status: "Single" | "Married" | "Divorced" | "";
  number_children: number;
  notes: string;
  address: string;
  professional_experience: string;
  Languages: string[];
  workingHours: WorkingHoursType[];
  vacationRecords: VacationRecordsType[];
  employeeType:
    | "Doctor"
    | "Nurse"
    | "Technician"
    | "Administrative"
    | "Employee"
    | "Other"
    | "";
  hireDate: string;
  medicalLicenseNumber: string;
  certifications: string[];
  jobType: "FULL_TIME" | "PART_TIME";
  breakTimes: BreakTimesType[];
  isActive: boolean;
  clinics: string[];
  specializations: string[];
  companyId: string;
  clinicCollectionId: string;
  departmentId: string;
}
