import * as Yup from "yup";

const AppointmentSchema = Yup.object().shape({
  patient: Yup.string().required("Patient name is required"),
  clinic:Yup.string().required("Clinic is required"),
  service: Yup.string().required("Service is required"),
  reason: Yup.string().required("Reason is required"),
  datetime: Yup.string()
    .required("Date is required"),
    doctor: Yup.string().required("Doctor is required"),
  // notes: Yup.string().nullable(),
  status: Yup.string()
    .oneOf(["scheduled", "completed", "cancelled"], "Invalid status")
    .default("scheduled"),
  cancellationReason: Yup.string().nullable(),
  reminderSent: Yup.boolean().default(false),
});

export default AppointmentSchema;
