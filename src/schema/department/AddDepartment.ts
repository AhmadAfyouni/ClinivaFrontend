import * as Yup from "yup";

const AddDepartmentSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  introduction: Yup.string().required("Introduction is required"),
  yearOfEstablishment: Yup.string().required(
    "Year of establishment is required"
  ),
  address: Yup.string().required("Address is required"),
  logo: Yup.string(),
  vision: Yup.string().required("Vision is required"),
  details: Yup.string().required("Details are required"),
  contactInfos: Yup.array().of(
    Yup.object().shape({
      type: Yup.string().required("Type is required"),
      value: Yup.string().required("Value is required"),
      subType: Yup.string().required("Sub type is required"),
    })
  ),
  clinicCollectionId: Yup.string(),
  PIC: Yup.string().required("PIC is required"),
});

export default AddDepartmentSchema;
