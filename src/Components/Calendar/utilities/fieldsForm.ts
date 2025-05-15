import InputPropsType from "../../../types/InputsType";
import { FormikProps } from "formik";
import AppointmentType from "../../../types/Appointment/AppointmentType";
export interface SelectItemType {
  [key: string]: string;
}
export const fieldsForm: (
  formik: FormikProps<AppointmentType>,
  doctors: SelectItemType
) => InputPropsType[] = (formik, doctors) => [
  {
    id: "datetime",
    label: "Date & Time",
    mandatory: true,
    type: "text",
    description: "",
    error: undefined,
    placeholder: "",
    tooltip: "Appointment date and time",
    value: new Date(formik.values.datetime).toLocaleString(),
    onChange: () => {},
    onBlur: () => {},
    disabled: true,
  },
  {
    id: "patient.name",
    label: "Patient Name",
    mandatory: true,
    type: "text",
    description: "",
    error: formik.errors.patient?.name as string | undefined,
    placeholder: "Enter patient name",
    tooltip: "Enter the patient's name",
    value: formik.values.patient.name,
    onChange: formik.handleChange,
    onBlur: formik.handleBlur,
  },
  {
    id: "reason",
    label: "Reason",
    mandatory: true,
    type: "text",
    description: "",
    error: formik.errors.reason as string | undefined,
    placeholder: "Enter reason",
    tooltip: "Enter appointment reason",
    value: formik.values.reason,
    onChange: formik.handleChange,
    onBlur: formik.handleBlur,
  },
  {
    id: "doctor.name",
    label: "Doctor",
    mandatory: true,
    type: "select",
    description: "",
    error: formik.errors.doctor?.name as string | undefined,
    placeholder: "Select doctor",
    tooltip: "Select the doctor",
    value: formik.values.doctor.name,
    onChange: (selectedKeys) => {
      if (
        Array.isArray(selectedKeys) &&
        selectedKeys.every((item) => typeof item === "string")
      ) {
        const selectedValues = selectedKeys.map((key) => doctors[key]);
        formik.setFieldValue("doctor", selectedValues);
      } else {
        console.error("selectedKeys is not a valid array of strings");
      }
    },
    onBlur: formik.handleBlur,
    selectValue: Object.keys(doctors),
  },
];
