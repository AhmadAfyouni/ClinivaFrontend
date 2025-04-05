import InputPropsType from "../../../types/InputsType";
import { FormikProps } from "formik";
import AppointmentType from "../../../types/AppointmentType";

export const fieldsForm: (
  formik: FormikProps<AppointmentType>,
  doctors: string[]
) => InputPropsType[] = (formik, doctors) => [
  {
    id: "patientName",
    label: "Patient Name",
    mandatory: true,
    type: "text",
    description: "",
    error: formik.errors.patientName,
    placeholder: "Enter patient name",
    tooltip: "Enter the patient's name",
    value: formik.values.patientName || "",
    onChange: formik.handleChange,
    onBlur: formik.handleBlur,
  },
  {
    id: "treatment",
    label: "Treatment",
    mandatory: true,
    type: "text",
    description: "",
    error: formik.errors.treatment,
    placeholder: "Enter treatment",
    tooltip: "Enter the treatment",
    value: formik.values.treatment || "",
    onChange: formik.handleChange,
    onBlur: formik.handleBlur,
  },
  {
    id: "time",
    label: "Time",
    mandatory: true,
    type: "text",
    description: "",
    error: formik.errors.time,
    placeholder: "Enter time",
    tooltip: "Enter the appointment time",
    value: formik.values.time || "",
    onChange: formik.handleChange,
    onBlur: formik.handleBlur,
    disabled: true, // Disable time input if cell is selected
  },
  {
    id: "date",
    label: "Date",
    mandatory: true,
    type: "text",
    description: "",
    error:
      typeof formik.errors.date === "string" ? formik.errors.date : undefined,
    placeholder: "Select date",
    tooltip: "Select the appointment date",
    onChange: formik.handleChange,
    onBlur: formik.handleBlur,
    disabled: true, // Disable date input if cell is selected
    value: formik.values.date.toLocaleDateString() || "",
  },
  {
    id: "doctor",
    label: "Doctor",
    mandatory: true,
    type: "select",
    description: "",
    error: formik.errors.doctor,
    placeholder: "Select doctor",
    tooltip: "Select the doctor",
    value: formik.values.doctor || "",
    onChange: formik.handleChange,
    onBlur: formik.handleBlur,
    selectValue: doctors.filter((d) => d !== "All Doctors"),
  },
  {
    id: "notes",
    label: "Notes",
    mandatory: false,
    type: "areaText",
    description: "",
    error: formik.errors.notes,
    placeholder: "Enter notes",
    tooltip: "Enter any additional notes",
    value: formik.values.notes || "",
    onChange: formik.handleChange,
    onBlur: formik.handleBlur,
  },
];
