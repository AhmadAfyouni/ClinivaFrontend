// export function TIME_SLOTS(startDate: number, endDate: number) {
//   return Array.from({ length: (endDate - startDate) * 2 + 1 }, (_, i) => {
//     const hour = startDate + Math.floor(i / 2);
//     const minutes = i % 2 === 0 ? "00" : "30";
//     return `${hour}:${minutes}`;
//   });
// }
export function TIME_SLOTS(startDate: number, endDate: number, intervalInMinutes: number) {
  const timeSlots = [];
  let currentTime = startDate * 60; 

  while (currentTime <= endDate * 60) {
      const hour = Math.floor(currentTime / 60);
      const minute = currentTime % 60;
      timeSlots.push(`${hour}:${minute.toString().padStart(2, '0')}`);

      if (currentTime + intervalInMinutes >= endDate * 60) {
          break; 
      }

      currentTime += intervalInMinutes;
  }

  return timeSlots;
}