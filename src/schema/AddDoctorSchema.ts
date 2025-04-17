import * as Yup from "yup";

const AddDoctorSchema = Yup.object().shape({
  specialties: Yup.array()
    .of(Yup.string())
    .required("Specialties are required"),
  languages: Yup.array().of(Yup.string()).nullable(),
  evaluation: Yup.number().min(0).max(5).nullable(),
  professiona_experi: Yup.string().required(
    "Professional experience is required"
  ),
  workingHours: Yup.mixed().nullable(),
  name: Yup.string().required("Name is required").max(30),
  phone: Yup.string().matches(/^[0-9]{10,15}$/, "Invalid phone number"),
  dateOfBirth: Yup.date().required("Date of Birth is required"),
  gender: Yup.string()
    .oneOf(["female", "male"], "Invalid gender")
    .required("Gender is Required"),
  insurances: Yup.mixed().nullable(),
  nationality: Yup.string().required("Nationality is required"),
  image: Yup.string().nullable(),
  marital_status: Yup.string()
    .oneOf(["Single", "Married", "Divorced"], "Invalid marital status")
    .required("Marital status is required")
    .default("Single"),
  number_children: Yup.number().integer().min(0).nullable(),
  blood_type: Yup.string()
    .oneOf(
      ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
      "Invalid blood type"
    )
    .required("Blood type is required"),
  height: Yup.number().positive("Height must be positive").nullable(),
  weight: Yup.number().positive("Weight must be positive").nullable(),
  notes: Yup.string().nullable(),
  email: Yup.string().email("Invalid email format"),
  address: Yup.string().required("Address is required"),
  emergencyContact: Yup.mixed().nullable(),
  created_at: Yup.date().default(() => new Date()),
  updated_at: Yup.date().nullable(),
});

export default AddDoctorSchema;
