export interface TimeSlot {
  startTime: string;
  endTime: string;
}

export interface WorkingHours {
  day: string;
  timeSlots: TimeSlot[];
}

export interface Vacation {
  leaveStartDate: string;
  leaveEndDate: string;
  leaveType: string;
  status: string;
}

export interface ContactInfo {
  type: "email" | "phone";
  value: string;
  isPublic: boolean;
  subType?: string;
}

export default interface AddEmployeeType {
  name: string;
  contactInfos: ContactInfo[];
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
  specialties: string[];
  Languages: string[];
  workingHours: WorkingHours[];
  vacationRecords: Vacation[];
  employeeType: string;
  hireDate: string;
  medicalLicenseNumber: string;
  certifications: string[];
  jobType: "FULL_TIME" | "PART_TIME";
  breakTimes: TimeSlot[];
  isActive: boolean;
  clinics: string[];
  specializations: string[];
}
