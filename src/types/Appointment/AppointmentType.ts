export default interface AppointmentType {
  _id: string;
  patient: {
    _id: string;
    name: string;
  };
  clinic: {
    _id: string;
    name: string;
    id: string;
  };
  doctor: {
    _id: string;
    name: string;
  };
  service: string;
  datetime: string;
  reason: string;
  status: "scheduled" | "completed" | "cancelled";
  urgencyLevel: string;
  cancellationReason: string;
  publicId: string;
  reminderSent: boolean;
  createdAt: string;
  updatedAt: string;
  logo: string;
  __v: number;
}
