export default interface AppointmentType {
  patientName: string;
  treatment: string;
  time: string;
  date: Date;
  doctor: string;
  notes?: string;
  status?: "scheduled" | "completed" | "cancelled";
}
