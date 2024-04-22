export const selectAllIncomeQuery = () => {
  return `SELECT incomeId, name, description, import, date, type, fixed, categroyId FROM Income;`;
};

// allowed values: 'CASH','DEBIT CARD','CREDIT CARD','CHECK',
// 'WIRE TRANSFER','BANK TRANSFER','CRYPTO','OTHER'
export const selectIncomeByTypeQuery = (type) => {
  return `SELECT incomeId, name, description, import, date, categoryId FROM Income
  WHERE type = ${type};`;
};

export const selectExpensesFixedQuery = () => {
  return `SELECT incomeId, name, description, import, date, type, categoryId FROM Income
  WHERE fixed IS NOT NULL;`;
};

export const selectExpensesNonFixedQuery = () => {
  return `SELECT incomeId, name, description, import, date, type, categoryId FROM Income
  WHERE fixed IS NULL;`;
};

export const selectIncomesByMonthQuery = (dateStart, dateStop) => {
  return `SELECT incomeId, name, description, import, date, type, fixed, categoryId FROM Income
  WHERE fixed IS NOT NULL OR (date >= '${dateStart}' AND date < '${dateStop}');`;
};

export const selectIncomeSumByMonthQuery = (dateStart, dateStop) => {
  return `SELECT SUM(import) AS 'SUM' FROM Income
  WHERE fixed IS NOT NULL OR (date >= '${dateStart}' AND date < '${dateStop}');`;
};
