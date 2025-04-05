export const getNextXDays = (
  start: Date,
  x: number
): {
  day: string;
  year: number;
  month: number;
  dayNumber: number;
  weekday: string;
}[] => {
  const days = [];
  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  for (let i = 0; i < x; i++) {
    const date = new Date(start);
    date.setDate(start.getDate() + i);
    days.push({
      day: date.toISOString().split("T")[0],
      year: date.getFullYear(),
      month: date.getMonth(),
      dayNumber: date.getDate(),
      weekday: weekdays[date.getDay()],
    });
  }
  return days;
};
