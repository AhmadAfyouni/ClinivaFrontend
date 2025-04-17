export interface TimeSlot {
  startTime: string;
  endTime: string;
}

export interface WorkingHour {
  day: string;
  timeSlots: TimeSlot[];
}
