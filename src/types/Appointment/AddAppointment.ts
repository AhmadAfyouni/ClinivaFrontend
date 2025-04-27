export default interface AddAppointmentType {
    patient: string;
    clinic: string;
    service: string;
    doctor: string;
    datetime: string; 
    reason: string;
    status: string;
    cancellationReason: string;
    reminderSent: boolean;
}