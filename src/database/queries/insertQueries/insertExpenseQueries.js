export const insertExpenseQuery = () => {
  return `INSERT INTO Expense (name, description, import, date, type, fixed, categoryId ) VALUES (?, ?, ?, ?, ?, ?, ?);`;
};
