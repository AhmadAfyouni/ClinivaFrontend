import * as Yup from "yup";

const AddUserSchema = Yup.object().shape({
  address: Yup.string().required("Address is required"),
  blood_type: Yup.string()
    .oneOf(
      ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
      "Invalid blood type"
    )
    .nullable(),
  created_at: Yup.date().default(() => new Date()),
  dateOfBirth: Yup.date().required("Date of Birth is required"),
  email: Yup.string().email("Invalid email format"),
  emergencyContact: Yup.string().nullable(),
  gender: Yup.string()
    .oneOf(["female", "male"], "Invalid gender")
    .nullable()
    .required("Gender is Required"),
  height: Yup.number().positive("Height must be positive").nullable(),
  identity: Yup.string().nullable(),
  image: Yup.mixed()
    .nullable()
    .test("fileSize", "File size is too large (max 5MB)", (value) => {
      if (!value) return true; // No file uploaded is valid
      return (value as File).size <= 5 * 1024 * 1024; // Max 5MB
    })
    .test("fileType", "Invalid file format (Only images allowed)", (value) => {
      if (!value) return true;
      return ["image/jpeg", "image/png", "image/jpg"].includes(
        (value as File).type
      );
    }),

  insurances: Yup.mixed().nullable(), // If it's an object or array, keep mixed()
  is_active: Yup.boolean().default(true),
  marital_status: Yup.string()
    .oneOf(["Single", "Married", "Divorced"], "Invalid marital status")
    .nullable(),
  name: Yup.string().required("Name is required"),
  nationality: Yup.string().nullable(),
  notes: Yup.string().nullable(),
  number_children: Yup.number()
    .integer()
    .min(0, "Children count cannot be negative")
    .nullable(),
  phone: Yup.string()
    .matches(/^[0-9]{10,15}$/, "Invalid phone number")
    .required("Phone number is required"),
  updated_at: Yup.date().default(() => new Date()),
  weight: Yup.number().positive("Weight must be positive").nullable(),
});

export default AddUserSchema;
