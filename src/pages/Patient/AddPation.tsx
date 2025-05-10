import { useFormik } from "formik";
import AddPationType, { EmergencyContactType } from "../../types/AddPationType";
import AddPationSchema from "../../schema/AddPationSchema";
import InputForm from "../../Components/Inputs/InputForm";
import InputPropsType from "../../types/InputsType";
import { Button, ScrollArea } from "@mantine/core";
import { language } from "../../data/Language";
import { useNavigate } from "react-router-dom";
import useAddPation from "../../hooks/patient/useAddPation";
import TableSelection from "../../Components/Inputs/table/TableSelection";

function AddPation() {
  const handleImageChange = (file: File | null) => {
    formik.setFieldValue("image", file);
  };
  const hook = useAddPation();
  const navigate = useNavigate();
  const handleMultiSelectChange = (
    fieldName: string,
    selectedValues: string[]
  ) => {
    console.log(selectedValues);
    formik.setFieldValue(fieldName, selectedValues);
  };
  const formik = useFormik<AddPationType>({
    initialValues: {
      languages: [],
      evaluation: 0,
      professiona_experi: "",
      name: "",
      phone: "",
      dateOfBirth: "",
      gender: "male",
      nationality: "",
      // image: "",
      marital_status: "Single",
      number_children: 0,
      blood_type: "A+",
      height: 0,
      weight: 0,
      notes: "",
      email: "",
      address: "",
      emergencyContacts: [],
      Smoking: false,
      Current_Medications: "",
      Surgical_History: "",
      identity: ""
    },
    validationSchema: AddPationSchema,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: (values) => {
      console.log("Form Submitted:@", values);
      hook.mutate(values);
    },
  });
  // if (hook.isSuccess) navigate(`/patients`);

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
      id: "identity",
      label: "Identity",
      mandatory: true,
      type: "text",
      description: "",
      error: formik.errors.identity,
      placeholder: "123456789",
      tooltip: "Enter identity number",
      value: formik.values.identity || "",
      onChange: formik.handleChange,
      onBlur: formik.handleBlur,
    },

    {
      id: "languages",
      label: "Languages",
      mandatory: true,
      type: "multiSelect",
      description: "",
      error: formik.errors.languages?.toString(),
      placeholder: "Select language",
      tooltip: "Enter your language",
      value: formik.values.languages || [],
      onChange: (selectedValues) =>
        handleMultiSelectChange("languages", selectedValues as string[]),

      onBlur: formik.handleBlur,
      selectValue: language,
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
      error: formik.errors.dateOfBirth,
      placeholder: "1/1/1990",
      value: formik.values.dateOfBirth,
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
      id: "smoking",
      label: "Smoking",
      mandatory: false,
      type: "radio",
      description: "",
      error: formik.errors.Smoking,
      placeholder: "",
      radio: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
      onChange: formik.handleChange,
      onBlur: formik.handleBlur,
    },
    {
      id: "Current_Medications",
      label: "Current Medications",
      mandatory: false,
      type: "text",
      description: "",
      error: formik.errors.Current_Medications,
      placeholder: "",
      value: formik.values.Current_Medications,
      onChange: formik.handleChange,
      onBlur: formik.handleBlur,
    },
    {
      id: "Surgical_History",
      label: "Surgical History",
      mandatory: false,
      type: "date",
      description: "",
      value: formik.values.Surgical_History,
      error: formik.errors.Surgical_History,
      placeholder: "",
      onChange: formik.handleChange,
      onBlur: formik.handleBlur,
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
  console.log("erro", formik.errors);
  console.log(formik.values);

  return (
    <ScrollArea h="calc(100vh - 100px)" w="100%">
      <form onSubmit={formik.handleSubmit}>
        <InputForm
          base={attrb}
          count={0}
          with_submit={false}
          onSubmit={() => {}}
        />
        <TableSelection<EmergencyContactType>
          columns={[
            { key: "name", label: "Name", type: "text" },
            { key: "phone", label: "Phone", type: "number" },
            {
              key: "relationToPatient",
              label: "Relation To Patient",
              type: "text",
            },
          ]}
          fieldName="emergencyContacts"
          title="Emergency Contact"
          key={"emergencyContacts"}
          onFieldChange={formik.setFieldValue}
          error={formik.errors.emergencyContacts?.toString() || ""}
          data={formik.values.emergencyContacts}
        />
        <Button type="submit">Submit</Button>
      </form>
    </ScrollArea>
  );
}

export default AddPation;
