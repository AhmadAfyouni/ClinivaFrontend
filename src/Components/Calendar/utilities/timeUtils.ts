import ClinicDetailsType from "../../../types/clinic/ClinicDetailsType";

/**
 * Get the start or end time from a clinic's working hours
 */
export const getClinicTime = (
  clinicData: ClinicDetailsType[],
  selectedClinic: string,
  type: "start" | "end"
): number => {
  if (selectedClinic === "Select Clinic") return type === "start" ? 9 : 18;

  const timeSlot = clinicData.filter(
    (c: ClinicDetailsType) => c.name === selectedClinic
  )[0];

  if (!timeSlot || timeSlot?.WorkingHours.length === 0) {
    return type === "start" ? 9 : 18;
  }

  const time =
    type === "start"
      ? timeSlot?.WorkingHours[0].startTime
      : timeSlot?.WorkingHours[0].endTime;

  if (!time) return type === "start" ? 9 : 18;

  if (time[0] === "0" || time === "00") return parseInt(time[1], 10);
  return parseInt(time.slice(0, 2), 10);
};

/**
 * Get the interval duration from a clinic
 */
export const getClinicInterval = (
  clinicData: ClinicDetailsType[],
  selectedClinic: string
): number => {
  if (selectedClinic === "Select Clinic" && clinicData.length > 0) {
    return clinicData[0]?.AverageDurationOfVisit || 30;
  }

  const clinic = clinicData.filter(
    (c: ClinicDetailsType) => c.name === selectedClinic
  )[0];

  return clinic?.AverageDurationOfVisit || 30;
};

/**
 * Format a date and time for display
 */
export const formatDateTime = (dateTime: string): string => {
  if (!dateTime) return "";

  const date = new Date(dateTime);
  const day = date.getUTCDate();
  const month = date.getUTCMonth() + 1;
  const year = date.getUTCFullYear();
  const hours = String(date.getUTCHours()).padStart(2, "0");
  const minutes = String(date.getUTCMinutes()).padStart(2, "0");

  return `${day}/${month}/${year} ${hours}:${minutes}`;
};

/**
 * Check if a time slot is available for a specific day based on clinic working hours
 */
export const isTimeSlotAvailable = (
  clinicData: ClinicDetailsType[],
  selectedClinic: string,
  dayOfWeek: string,
  timeSlot: string
): boolean => {
  if (selectedClinic === "Select Clinic" || !clinicData || clinicData.length === 0) {
    return true; // Default to available if no clinic selected
  }

  const clinic = clinicData.find((c) => c.name === selectedClinic);
  if (!clinic || !clinic.WorkingHours || clinic.WorkingHours.length === 0) {
    return true; // Default to available if no working hours defined
  }

  // Find the working hours for the given day
  const workingHoursForDay = clinic.WorkingHours.find(
    (wh) => wh.day === dayOfWeek
  );

  if (!workingHoursForDay) {
    return false; // Clinic is closed on this day
  }

  // Parse the time slot (format: "HH:MM")
  const [hourStr, minuteStr] = timeSlot.split(":");
  const slotHour = parseInt(hourStr, 10);
  const slotMinute = parseInt(minuteStr, 10);
  const slotTimeInMinutes = slotHour * 60 + slotMinute;

  // Parse the clinic's working hours
  const [startHourStr, startMinuteStr] = workingHoursForDay.startTime.split(":");
  const [endHourStr, endMinuteStr] = workingHoursForDay.endTime.split(":");
  
  const startHour = parseInt(startHourStr, 10);
  const startMinute = parseInt(startMinuteStr, 10);
  const endHour = parseInt(endHourStr, 10);
  const endMinute = parseInt(endMinuteStr, 10);
  
  const startTimeInMinutes = startHour * 60 + startMinute;
  const endTimeInMinutes = endHour * 60 + endMinute;

  // Check if the time slot is within working hours
  return slotTimeInMinutes >= startTimeInMinutes && slotTimeInMinutes < endTimeInMinutes;
};
