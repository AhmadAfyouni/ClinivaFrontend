export function TIME_SLOTS(startDate: number, endDate: number) {
  return Array.from({ length: (endDate - startDate) * 2 + 1 }, (_, i) => {
    const hour = startDate + Math.floor(i / 2);
    const minutes = i % 2 === 0 ? "00" : "30";
    return `${hour}:${minutes}`;
  });
}
