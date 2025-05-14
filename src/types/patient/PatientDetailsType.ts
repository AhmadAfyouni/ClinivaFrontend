import ContactInfo from "../common/ContactInfo";

interface EmergencyContact {
  name: string;
  phone: string;
  relationToPatient: string;
}

interface ChronicDisease {
  disease_name: string;
  disease_id: string;
}

interface Insurance {
  insuranceProvider: string;
  insuranceNumber: string;
  coveragePercentage: number;
  expiryDate: string;
  insuranceType: string;
}

interface MedicalTestResult {
  filePath: string;
}

export default interface PatientDetailsType {
  _id: string;
  name: string;
  image: string;//
  contactInfos: ContactInfo[];
  dateOfBirth: string;
  gender: string;
  identity: string;
  nationality: string;
  marital_status: string;
  number_children: number;
  blood_type: string;
  height: number;
  weight: number;
  notes: string;
  isActive: boolean;
  address: string;
  emergencyContact: EmergencyContact;
  ChronicDiseases: ChronicDisease[];
  insurances: Insurance[];
  medicalTestResults: MedicalTestResult[];
  allergies: string[];
  preferredLanguage: string;
  lifestyleFactors: string;
  familyMedicalHistory: string[];
  lastVisit: string;
  publicId: string;
  Surgical_History: string;
  Smoking: boolean;
  Current_Medications: string;
  age: number;
}
