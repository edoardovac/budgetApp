export function currentDateStart() {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear().toString();
  const currentMonth = (currentDate.getMonth() + 1).toString().padStart(2, "0");
  const currentYearMonth = `${currentYear}-${currentMonth}-01`;
  return currentYearMonth;
}

export function currentDateStop() {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear().toString();
  const nextMonth = (currentDate.getMonth() + 2).toString().padStart(2, "0");
  const currentYearNextMonth = `${currentYear}-${nextMonth}-01`;
  return currentYearNextMonth;
}
