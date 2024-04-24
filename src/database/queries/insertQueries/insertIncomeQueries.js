export const insertIncomeQuery = () => {
  return `INSERT INTO Income (name, description, import, date, type, fixed, categoryId ) VALUES (?, ?, ?, ?, ?, ?, ?);`;
};
