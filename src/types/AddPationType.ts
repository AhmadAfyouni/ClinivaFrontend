export default interface AddPationType {
  identity: string; // Optional: Not present in the Patient schema
  languages?: string[]; // Optional: Not present in the Patient schema
  evaluation?: number; // Optional: Not present in the Patient schema
  professiona_experi?: string; // Optional: Not present in the Patient schema
  name: string; // Required: Matches Patient schema
  phone?: string; // Optional: Not explicitly in the Patient schema
  dateOfBirth: string; // Required: Matches Patient schema
  gender: "female" | "male"; // Required: Matches Patient schema
  nationality: string; // Required: Matches Patient schema
  image?: string; // Optional: Present in Patient schema but commented out
  marital_status: "Single" | "Married" | "Divorced" | "Widowed"; // Required: Matches Patient schema
  number_children?: number; // Optional: Matches Patient schema
  blood_type: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-"; // Required: Matches Patient schema
  height?: number; // Optional: Matches Patient schema
  weight?: number; // Optional: Matches Patient schema
  notes?: string; // Optional: Matches Patient schema
  email?: string; // Optional: Not present in the Patient schema
  address: string; // Required: Matches Patient schema
  emergencyContacts: EmergencyContactType[];
  Smoking: boolean; // Required: Matches Patient schema
  Current_Medications: string; // Required: Matches Patient schema
  Surgical_History?: string; // Optional: Matches Patient schema but should be Date
}

export interface EmergencyContactType {
  name: string;
  phone: string;
  relationToPatient: string;
}
