export const selectAllExpenseQuery = () => {
  return `SELECT expenseId, name, description, import, date, type, fixed, categoryId FROM Expense
  ORDER BY date DESC, expenseId DESC;`;
};

// allowed values: 'CASH','DEBIT CARD','CREDIT CARD','CHECK',
// 'WIRE TRANSFER','BANK TRANSFER','CRYPTO','OTHER'
export const selectExpenseByTypeQuery = () => {
  return `SELECT expenseId, name, description, import, date, categoryId FROM Expense
  WHERE type = ?;`;
};

export const selectExpensesFixedQuery = () => {
  return `SELECT expenseId, name, description, import, date, type, fixed, categoryId FROM Expense
  WHERE fixed = "YES";`;
};

export const selectExpensesNonFixedQuery = () => {
  return `SELECT expenseId, name, description, import, date, type, fixed, categoryId FROM Expense
  WHERE fixed = "NO";`;
};

export const selectExpensesByMonthQuery = () => {
  return `SELECT expenseId, name, description, import, date, type, fixed, categoryId FROM Expense
  WHERE fixed = "YES" OR (date >= ? AND date < ?)
  ORDER BY date DESC, expenseId DESC;`;
};

export const selectExpenseSumMonthQuery = () => {
  return `SELECT SUM(import) AS 'SUM' FROM Expense
    WHERE fixed = "YES" OR (date >= ? AND date < ?);`;
};

export const selectExpenseSumFixedQuery = () => {
  return `SELECT SUM(import) AS 'SUM' From Expense
  WHERE fixed = "YES";`;
};

export const selectExpenseSumByCategoryI = () => {
  return `SELECT SUM(import) AS 'SUUM' FROM Expense
  WHERE categoryId = ?`;
};

// need select by category
// need select by date (month, week, day, year?)
