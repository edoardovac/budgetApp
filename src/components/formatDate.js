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
