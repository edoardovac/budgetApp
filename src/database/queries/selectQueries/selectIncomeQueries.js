export const selectAllIncomeQuery = () => {
  return `SELECT incomeId, name, description, import, date, type, fixed, categroyId FROM Income
  ORDER BY date DESC, incomeId DESC;`;
};

// allowed values: 'CASH','DEBIT CARD','CREDIT CARD','CHECK',
// 'WIRE TRANSFER','BANK TRANSFER','CRYPTO','OTHER'
export const selectIncomeByTypeQuery = (type) => {
  return `SELECT incomeId, name, description, import, date, categoryId FROM Income
  WHERE type = ${type};`;
};

export const selectExpensesFixedQuery = () => {
  return `SELECT incomeId, name, description, import, date, type, fixed, categoryId FROM Income
  WHERE fixed = "YES";`;
};

export const selectExpensesNonFixedQuery = () => {
  return `SELECT incomeId, name, description, import, date, type, fixed, categoryId FROM Income
  WHERE fixed = "NO";`;
};

export const selectIncomesByMonthQuery = (dateStart, dateStop) => {
  return `SELECT incomeId, name, description, import, date, type, fixed, categoryId FROM Income
  WHERE fixed = "YES" OR (date >= '${dateStart}' AND date < '${dateStop}')
  ORDER BY date DESC, incomeId DESC;`;
};

export const selectIncomeSumByMonthQuery = (dateStart, dateStop) => {
  return `SELECT SUM(import) AS 'SUM' FROM Income
  WHERE fixed = "YES" OR (date >= '${dateStart}' AND date < '${dateStop}');`;
};

export const selectIncomeSumFixedQuery = () => {
  return `SELECT SUM(import) AS 'SUM' From Income
  WHERE fixed = "YES";`;
};
