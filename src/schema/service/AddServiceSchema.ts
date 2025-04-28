import * as Yup from "yup";

const AddServiceSchema = Yup.object().shape({
  name: Yup.string().required("Service name is required"),
  description: Yup.string().required("Description is required"),
  price: Yup.number()
    .typeError("Price must be a number")
    .required("Price is required")
    .positive("Price must be positive"),
  clinic: Yup.string().required("Clinis is required"),
  // array()
  //   .of(Yup.string().required("Clinic ID must be a string"))
  //   .min(1, "At least one clinic must be selected")
  //   .required("Clinics are required"),
  doctors: Yup.array()
    .of(Yup.string().required("Doctor ID must be a string"))
    .min(1, "At least one doctor must be selected")
    .required("Doctors are required"),
});
export default AddServiceSchema;
