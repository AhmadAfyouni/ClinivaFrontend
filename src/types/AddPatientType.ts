export default interface AddPatientType {
  name?: string;
  phone?: string;
  dateOfBirth?: Date | "";
  gender?: "female" | "male" | "";
  image?: string;
  identity?: string;
  nationality?: string;
  address?: string;
  marital_status?: "Single" | "Married" | "Divorced" | "";
  number_children?: number;
  blood_type?: "" | "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
  height?: number;
  weight?: number;
  is_active?: boolean;
  created_at?: Date | "";
  updated_at?: Date | "";
  emergencyContact?: string; // Assuming Map type as a generic object
  notes?: string;
  insurances?: string; // Assuming "Embedding" as an unknown data structure
  email?: string;
}
