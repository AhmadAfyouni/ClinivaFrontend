export default interface AppointementDetailsType {
  _id: string;
  patient: Patient | null;
  clinic: Clinic | null;
  doctor: Doctor | null;
  datetime: string;
  startTime?: string;
  endTime?: string;
  reason?: string;
  status: "scheduled" | "cancelled" | "completed";
  cancellationReason?: string;
  cancellationDate?: string;
  appointmentType?: string;
  priorityLevel?: string;
  notes?: string;
  patientRating?: number;
  patientFeedback?: string;
  publicId?: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Patient {
  _id: string;
  name: string;
}

export interface Clinic {
  _id: string;
  name: string;
  id: string;
}

export interface Doctor {
  _id: string;
  name: string;
}
