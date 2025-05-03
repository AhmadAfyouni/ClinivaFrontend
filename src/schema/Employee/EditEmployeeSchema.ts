import * as Yup from "yup";

const EditEmployeeSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  contactInfos: Yup.array()
    .of(
      Yup.object().shape({
        type: Yup.string()
          .oneOf(["email", "phone"], "Invalid contact type")
          .required("Contact type is required"),
        value: Yup.string().required("Contact value is required"),
      })
    )
    .required("Contact information is required")
    .min(1, "At least one Contact entry is required"),
  dateOfBirth: Yup.date().required("Date of Birth is required"),
  gender: Yup.string()
    .oneOf(["female", "male"], "Invalid gender")
    .required("Gender is required"),
  identity: Yup.string().required("Identify is required"),
  nationality: Yup.string().required("Nationality is required"),
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
  marital_status: Yup.string()
    .oneOf(["Single", "Married", "Divorced"], "Invalid marital status")
    .nullable(),
  number_children: Yup.number()
    .integer()
    .min(0, "Children count cannot be negative")
    .nullable(),
  notes: Yup.string().nullable(),
  address: Yup.string().required("Address is required"),
  professional_experience: Yup.string().required(
    "Professional experience is required"
  ),
  Languages: Yup.array().of(Yup.string()).nullable(),
  workingHours: Yup.array()
    .of(
      Yup.object().shape({
        day: Yup.string().required("Day is required"),
        startTime: Yup.string().required("Start time is required"),
        endTime: Yup.string().required("End time is required"),
      })
    )
    .required("Working hours are required")
    .min(1, "At least one working hour entry is required"),
  vacationRecords: Yup.array()
    .of(
      Yup.object().shape({
        startDate: Yup.date().required("Leave start date is required"),
        endDate: Yup.date().required("Leave end date is required"),
        reason: Yup.string().required("Status is required"),
      })
    )
    .required("Vacations are required"),
  employeeType: Yup.string().required("Employee type is required"),
  hireDate: Yup.date().required("Hire date is required"),
  medicalLicenseNumber: Yup.string().required(
    "Medical license number is required"
  ),
  certifications: Yup.array().of(Yup.string()).nullable(),
  jobType: Yup.string()
    .oneOf(["FULL_TIME", "PART_TIME"], "Invalid job type")
    .required("Job type is required"),
  breakTimes: Yup.array()
    .of(
      Yup.object().shape({
        startTime: Yup.string().required("Break start time is required"),
        endTime: Yup.string().required("Break end time is required"),
      })
    )
    .required("Break times are required"),
  isActive: Yup.boolean().default(true),
  // clinics: Yup.array().of(Yup.string()).nullable(),
  // specializations: Yup.array().of(Yup.string()).nullable(),
});

export default EditEmployeeSchema;
