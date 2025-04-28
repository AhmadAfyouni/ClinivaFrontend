import * as Yup from "yup";

const AddSpecialitySchema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters"),

  description: Yup.string()
    .required("Description is required")
    .min(5, "Description must be at least 10 characters"),

  requiredEquipment: Yup.string()
    .required("Required Equipment are required")
    .min(5, "Medical Procedures must be at least 10 characters"),

  requiredStaff: Yup.array()
    .of(Yup.string().required("Staff item is required"))
    .min(1, "At least one staff member must be selected")
    .required("Required Staff is required"),

  medicalProcedures: Yup.string()
    .required("Medical Procedures are required")
    .min(5, "Medical Procedures must be at least 10 characters"),

  certificationRequirements: Yup.string()
    .required("Certification Requirements are required")
    .min(5, "Certification Requirements must be at least 5 characters"),
});

export default AddSpecialitySchema;
