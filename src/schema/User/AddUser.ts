import * as Yup from "yup";

const AddUserSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(/[\W_]/, "Password must contain at least one special character"),
  isActive: Yup.boolean(),
  roleIds: Yup.string().required("Role is required"),
  // clinicCollectionId: Yup.string().required("Clinic Collection Id is required"),
  employeeId: Yup.string().required("Employee Id is required"),
});
export default AddUserSchema;
