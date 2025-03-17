import { useFormik } from "formik";
import AddDoctorType from "../../types/AddDoctorType";
import AddDoctorSchema from "../../schema/AddDoctorSchema";
import InputForm from "../../Components/Inputs/InputForm";
import InputPropsType from "../../types/InputsType";

function AddDoctor() {
  const handleImageChange = (file: File | null) => {
    formik.setFieldValue("image", file);
  };

  const formik = useFormik<AddDoctorType>({
    initialValues: {
      specialties: [],
      languages: [],
      evaluation: 0,
      professiona_experi: "",
      workingHours: 0,
      name: "",
      phone: "",
      dateOfBirth: new Date(),
      gender: "male",
      insurances: 0,
      nationality: "",
      image: "",
      marital_status: "Single",
      number_children: 0,
      blood_type: "A+",
      height: 0,
      weight: 0,
      notes: "",
      email: "",
      address: "",
      emergencyContact: new Map(),
      created_at: new Date(),
      updated_at: new Date(),
    },
    validationSchema: AddDoctorSchema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: (values) => {
      console.log("Form Submitted:", values);
    },
  });

  const attrb: InputPropsType[] = [
    {
      id: "name",
      label: "Name",
      mandatory: true,
      type: "text",
      description: "",
      error: formik.errors.name,
      placeholder: "Dr. John Doe",
      tooltip: "Enter the doctor's name",
      value: formik.values.name || "",
      onChange: formik.handleChange,
      onBlur: formik.handleBlur,
    },
    {
      id: "specialties",
      label: "Specialties",
      mandatory: true,
      type: "autoCompleat",
      description: "",
      error: formik.errors.specialties as string,
      placeholder: "Cardiology, Neurology",
      tooltip: "Enter medical specialties",
      value: formik.values.specialties?.join(", ") || "",
      onChange: formik.handleChange,
      onBlur: formik.handleBlur,
    },

    {
      id: "languages",
      label: "Languages",
      mandatory: false,
      type: "autoCompleat",
      description: "",
      error: formik.errors.languages as string,
      placeholder: "English, Arabic",
      tooltip: "Enter languages spoken",
      value: formik.values.languages?.join(", ") || "",
      onChange: formik.handleChange,
      onBlur: formik.handleBlur,
    },
    {
      id: "evaluation",
      label: "Evaluation",
      mandatory: false,
      type: "number",
      description: "",
      error: formik.errors.evaluation,
      placeholder: "0-5",
      tooltip: "Enter evaluation score",
      value: formik.values.evaluation?.toString() || "",
      onChange: formik.handleChange,
      onBlur: formik.handleBlur,
    },
    {
      id: "phone",
      label: "Phone",
      mandatory: false,
      type: "number",
      description: "",
      error: formik.errors.phone,
      placeholder: "099996666",
      tooltip: "Enter phone number",
      value: formik.values.phone || "",
      onChange: formik.handleChange,
      onBlur: formik.handleBlur,
    },
    {
      id: "email",
      label: "Email Address",
      mandatory: false,
      type: "text",
      description: "",
      error: formik.errors.email,
      placeholder: "doctor@example.com",
      tooltip: "Enter email address",
      value: formik.values.email || "",
      onChange: formik.handleChange,
      onBlur: formik.handleBlur,
    },
    {
      id: "dateOfBirth",
      label: "Date Of Birth",
      mandatory: true,
      type: "date",
      description: "",
      error:
        typeof formik.errors.dateOfBirth === "string"
          ? formik.errors.dateOfBirth
          : undefined,
      placeholder: "",
      value: formik.values.dateOfBirth?.toISOString().split("T")[0] || "",
      onChange: formik.handleChange,
      onBlur: formik.handleBlur,
    },
    {
      id: "gender",
      label: "Gender",
      mandatory: true,
      type: "radio",
      description: "",
      error: formik.errors.gender,
      placeholder: "",
      value: formik.values.gender || "",
      onChange: formik.handleChange,
      onBlur: formik.handleBlur,
      radio: [
        { label: "Female", value: "female" },
        { label: "Male", value: "male" },
      ],
    },
    {
      id: "nationality",
      label: "Nationality",
      mandatory: true,
      type: "autoCompleat",
      description: "",
      error: formik.errors.nationality,
      placeholder: "Syrian",
      tooltip: "Enter nationality",
      value: formik.values.nationality || "",
      onChange: formik.handleChange,
      onBlur: formik.handleBlur,
    },
    {
      id: "image",
      label: "Profile Image",
      mandatory: false,
      type: "image",
      description: "",
      error: formik.errors.image,
      placeholder: "",
      value: formik.values.image || "",
      onChangeFile: handleImageChange,
      onChange: () => {},
    },
    {
      id: "marital_status",
      label: "Marital Status",
      mandatory: true,
      type: "radio",
      description: "",
      error: formik.errors.marital_status,
      placeholder: "",
      value: formik.values.marital_status || "",
      onChange: formik.handleChange,
      onBlur: formik.handleBlur,
      radio: [
        { label: "Single", value: "Single" },
        { label: "Married", value: "Married" },
        { label: "Divorced", value: "Divorced" },
      ],
    },
    {
      id: "number_children",
      label: "Number of Children",
      mandatory: false,
      type: "number",
      description: "",
      error: formik.errors.number_children,
      placeholder: "0",
      tooltip: "Enter number of children",
      value: formik.values.number_children?.toString() || "",
      onChange: formik.handleChange,
      onBlur: formik.handleBlur,
    },
    {
      id: "blood_type",
      label: "Blood Type",
      mandatory: true,
      type: "radio",
      description: "",
      error: formik.errors.blood_type,
      placeholder: "",
      value: formik.values.blood_type || "",
      onChange: formik.handleChange,
      onBlur: formik.handleBlur,
      radio: [
        { label: "A+", value: "A+" },
        { label: "A-", value: "A-" },
        { label: "B+", value: "B+" },
        { label: "B-", value: "B-" },
        { label: "AB+", value: "AB+" },
        { label: "AB-", value: "AB-" },
        { label: "O+", value: "O+" },
        { label: "O-", value: "O-" },
      ],
    },
    {
      id: "height",
      label: "Height",
      mandatory: false,
      type: "number",
      description: "",
      error: formik.errors.height,
      placeholder: "0",
      tooltip: "Enter height",
      value: formik.values.height?.toString() || "",
      onChange: formik.handleChange,
      onBlur: formik.handleBlur,
    },
    {
      id: "weight",
      label: "Weight",
      mandatory: false,
      type: "number",
      description: "",
      error: formik.errors.weight,
      placeholder: "0",
      tooltip: "Enter weight",
      value: formik.values.weight?.toString() || "",
      onChange: formik.handleChange,
      onBlur: formik.handleBlur,
    },
    {
      id: "address",
      label: "Address",
      mandatory: true,
      type: "text",
      description: "",
      error: formik.errors.address,
      placeholder: "123 Medical Center St.",
      tooltip: "Enter address",
      value: formik.values.address || "",
      onChange: formik.handleChange,
      onBlur: formik.handleBlur,
    },
    {
      id: "notes",
      label: "Notes",
      mandatory: false,
      type: "areaText",
      description: "",
      error: formik.errors.notes,
      placeholder: "Additional information...",
      tooltip: "Enter additional notes",
      value: formik.values.notes || "",
      onChange: formik.handleChange,
      onBlur: formik.handleBlur,
    },
    {
      id: "professiona_experi",
      label: "Professional Experience",
      mandatory: true,
      type: "areaText",
      description: "",
      error: formik.errors.professiona_experi,
      placeholder: "Enter professional experience details",
      tooltip: "Describe your professional experience",
      value: formik.values.professiona_experi || "",
      onChange: formik.handleChange,
      onBlur: formik.handleBlur,
    },
  ];

  return (
    <InputForm
      title="New Doctor"
      base={attrb}
      count={0}
      onSubmit={formik.handleSubmit}
    />
  );
}

export default AddDoctor;
