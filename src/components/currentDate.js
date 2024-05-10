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

export function givenDateStart(date) {
  const givenDate = new Date(date);
  const givenYear = givenDate.getFullYear().toString();
  const givenMonth = (givenDate.getMonth() + 1).toString().padStart(2, "0");
  const givenYearMonth = `${givenYear}-${givenMonth}-01`;
  return givenYearMonth;
}

export function givenDateStop(date) {
  const givenDate = new Date(date);
  const givenYear = givenDate.getFullYear().toString();
  const givenMonth = (givenDate.getMonth() + 2).toString().padStart(2, "0");
  const givenYearNextMonth = `${givenYear}-${givenMonth}-01`;
  return givenYearNextMonth;
}

export function currentDate() {
  // add comments
  const today = new Date();
  console.log("today " + today);
  const year = today.getFullYear().toString();
  console.log("year" + year);
  const month = (today.getMonth() + 1).toString().padStart(2, "0");
  console.log("month " + month);
  const day = today.getDate().toString();
  console.log("day " + day);
  const todayDate = `${day}-${month}-${year}`;
  console.log("today date " + todayDate);
  return todayDate;
}
