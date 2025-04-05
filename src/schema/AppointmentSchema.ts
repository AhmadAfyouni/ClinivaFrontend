import * as Yup from "yup";

const AppointmentSchema = Yup.object().shape({
  patientName: Yup.string().required("Patient name is required"),
  treatment: Yup.string().required("Treatment is required"),
  time: Yup.string().required("Time is required"),
  date: Yup.date()
    .required("Date is required")
    .min(new Date(), "Date cannot be in the past"),
  doctor: Yup.string().required("Doctor is required"),
  notes: Yup.string().nullable(),
  status: Yup.string()
    .oneOf(["scheduled", "completed", "cancelled"], "Invalid status")
    .default("scheduled"),
});

export default AppointmentSchema;
