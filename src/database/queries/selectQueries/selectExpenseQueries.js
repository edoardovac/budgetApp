export const selectAllExpenseQuery = () => {
  return `SELECT expenseId, name, description, import, date, type, fixed, categoryId FROM Expense;`;
};

// allowed values: 'CASH','DEBIT CARD','CREDIT CARD','CHECK',
// 'WIRE TRANSFER','BANK TRANSFER','CRYPTO','OTHER'
export const selectExpenseByTypeQuery = (type) => {
  return `SELECT expenseId, name, description, import, date, categoryId FROM Expense
  WHERE type = ${type};`;
};

export const selectExpensesFixedQuery = () => {
  return `SELECT expenseId, name, description, import, date, type, fixed, categoryId FROM Expense
  WHERE fixed = "YES";`;
};

export const selectExpensesNonFixedQuery = () => {
  return `SELECT expenseId, name, description, import, date, type, fixed, categoryId FROM Expense
  WHERE fixed = "NO";`;
};

export const selectExpensesByMonthQuery = (dateStart, dateStop) => {
  return `SELECT expenseId, name, description, import, date, type, fixed, categoryId FROM Expense
  WHERE fixed = "YES" OR (date >= '${dateStart}' AND date < '${dateStop}')
  ORDER BY date DESC;`;
};

export const selectExpenseSumMonthQuery = (dateStart, dateStop) => {
  return `SELECT SUM(import) AS 'SUM' FROM Expense
    WHERE fixed = "YES" OR (date >= '${dateStart}' AND date < '${dateStop}');`;
};

export const selectExpenseSumFixedQuery = () => {
  return `SELECT SUM(import) AS 'SUM' From Expense
  WHERE fixed = "YES";`;
};

export const selectExpenseSumByCategoryI = (categoryId) => {
  return `SELECT SUM(import) AS 'SUUM' FROM Expense
  WHERE categoryId = ?`;
};

// need select by category
// need select by date (month, week, day, year?)
