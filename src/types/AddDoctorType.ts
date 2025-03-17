export default interface AddDoctorType {
  id?: number;
  specialties: string[];
  languages?: string[];
  evaluation?: number;
  professiona_experi: string;
  workingHours?: number;
  name: string;
  phone?: string;
  dateOfBirth: Date;
  gender: "female" | "male";
  insurances?: number;
  nationality: string;
  image?: string;
  marital_status: "Single" | "Married" | "Divorced";
  number_children?: number;
  blood_type: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
  height?: number;
  weight?: number;
  notes?: string;
  email?: string;
  address: string;
  emergencyContact?: Map<string, string>;
  created_at: Date;
  updated_at?: Date;
}
