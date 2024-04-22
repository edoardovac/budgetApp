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
  return `SELECT expenseId, name, description, import, date, type, categoryId FROM Expense
  WHERE fixed IS NOT NULL;`;
};

export const selectExpensesNonFixedQuery = () => {
  return `SELECT expenseId, name, description, import, date, type, categoryId FROM Expense
  WHERE fixed IS NULL;`;
};

export const selectExpensesByMonthQuery = (dateStart, dateStop) => {
  return `SELECT expenseId, name, description, import, date, type, fixed, categoryId FROM Expense
  WHERE fixed IS NOT NULL OR (date >= '${dateStart}' AND date < '${dateStop}');`;
};

export const selectExpenseSumMonthQuery = (dateStart, dateStop) => {
  return `SELECT SUM(import) AS 'SUM' FROM Expense
    WHERE fixed IS NOT NULL OR (date >= '${dateStart}' AND date < '${dateStop}');`;
};

// need select by category
// need select by date (month, week, day, year?)
