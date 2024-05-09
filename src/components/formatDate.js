export const formatDate = (givenDate) => {
  const date = new Date(givenDate);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  const formattedDate = `${day}-${month}-${year}`;
  return formattedDate;
};

export const formatDateReverse = (givenDate) => {
  const date = new Date(givenDate);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
};

export const formatDateStringDDMMYYYY = (givenString) => {
  const [day, month, year] = givenString.toString().split("-").map(Number);
  const date = new Date(year, month - 1, day);
  return date;
};

export const formatDateStringYYYYMMDD = (givenString) => {
  const [year, month, day] = givenString.toString().split("-").map(Number);
  const date = new Date(year, month - 1, day + 1);
  return date;
};

export const formatDateStringDDMMYYYYReverse = (givenString) => {
  const [day, month, year] = givenString.toString().split("-").map(Number);
  const date = new Date(year, month - 1, day + 1);
  return date;
};

export const formatDateStringYYYYMMDDReverse = (givenString) => {
  const [year, month, day] = givenString.toString().split("-").map(Number);
  const date = new Date(year, month - 1, day + 1);
  return date;
};

export const formatDateStringYYYYMMDDToString = (givenString) => {
  const destructured = givenString.split("-");
  const dateString =
    destructured[2] + "-" + destructured[1] + "-" + destructured[0];
  return dateString;
};
