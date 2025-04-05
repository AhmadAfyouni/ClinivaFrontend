export const handleMoveWeek = (
  X: number,
  startDate: Date,
  setStartDate: (newDate: Date) => void,
  action: "next" | "previous"
) => {
  const newDate = new Date(startDate);
  if (action === "next") newDate.setDate(startDate.getDate() + X);
  else newDate.setDate(startDate.getDate() - X);

  setStartDate(newDate);
};
