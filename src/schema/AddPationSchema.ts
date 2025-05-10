import * as Yup from "yup";

const AddPationSchema = Yup.object().shape({
  languages: Yup.array().of(Yup.string()).nullable(), // Optional: Not in Patient schema
  evaluation: Yup.number().min(0).max(5).nullable(), // Optional: Not in Patient schema
  professiona_experi: Yup.string().required("Professional experience is required"), // Optional: Not in Patient schema
  workingHours: Yup.mixed().nullable(), // Optional: Not in Patient schema
  name: Yup.string().required("Name is required").max(30), // Required: Matches Patient schema
  phone: Yup.string().matches(/^[0-9]{10,15}$/, "Invalid phone number"), // Optional: Not explicitly in Patient schema
  dateOfBirth: Yup.string().required("Date of Birth is required"), // Kept as string
  gender: Yup.string()
    .oneOf(["female", "male"], "Invalid gender")
    .required("Gender is Required"), // Required: Matches Patient schema
  insurances: Yup.array().of(Yup.object()).nullable(), // Adjusted to match the Patient schema type
  nationality: Yup.string().required("Nationality is required"), // Required: Matches Patient schema
  image: Yup.string().nullable(), // Optional: Present in Patient schema but commented out
  marital_status: Yup.string()
    .oneOf(["Single", "Married", "Divorced", "Widowed"], "Invalid marital status") // Updated to include 'Widowed'
    .required("Marital status is required")
    .default("Single"), // Required: Matches Patient schema
  number_children: Yup.number().integer().min(0).nullable(), // Optional: Matches Patient schema
  blood_type: Yup.string()
    .oneOf(
      ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
      "Invalid blood type"
    )
    .required("Blood type is required"), // Required: Matches Patient schema
  height: Yup.number().positive("Height must be positive").nullable(), // Optional: Matches Patient schema
  weight: Yup.number().positive("Weight must be positive").nullable(), // Optional: Matches Patient schema
  notes: Yup.string().nullable(), // Optional: Matches Patient schema
  email: Yup.string().email("Invalid email format").nullable(), // Optional: Not in Patient schema
  address: Yup.string().required("Address is required"), // Required: Matches Patient schema
  emergencyContacts: Yup.array().of(Yup.object().shape({ // Adjusted to match the structure in Patient schema
    name: Yup.string().required("Emergency contact name is required"),
    Phone: Yup.string().min(10, "Invalid phone number"),
    relationToPatient: Yup.string().required("Relation to patient is required"),
  })).nullable(), // Optional: Matches Patient schema
  Smoking: Yup.boolean().required("Smoking is required"), // Required: Matches Patient schema
  Current_Medications: Yup.string().nullable(), // Required: Matches Patient schema
  Surgical_History: Yup.string().nullable(), // Kept as string
  identity: Yup.string().required("Identity is required"), // Required: Not present in the Patient schema
});

export default AddPationSchema;