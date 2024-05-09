export const selectAllIncomeQuery = () => {
  return `SELECT incomeId, Income.name, Income.description, import, date, type, fixed, Income.categoryId, Category.name AS categoryName
  FROM Income
  LEFT JOIN Category ON Income.categoryId = Category.categoryId
  ORDER BY date DESC, incomeId DESC;`;
};

// allowed values: 'CASH','DEBIT CARD','CREDIT CARD','CHECK',
// 'WIRE TRANSFER','BANK TRANSFER','CRYPTO','OTHER'
export const selectIncomeByTypeQuery = () => {
  return `SELECT incomeId, name, description, import, date, categoryId FROM Income
  WHERE type = ?;`;
};

export const selectExpensesFixedQuery = () => {
  return `SELECT incomeId, name, description, import, date, type, fixed, categoryId FROM Income
  WHERE fixed = "YES";`;
};

export const selectExpensesNonFixedQuery = () => {
  return `SELECT incomeId, name, description, import, date, type, fixed, categoryId FROM Income
  WHERE fixed = "NO";`;
};

export const selectIncomesByMonthQuery = () => {
  return `SELECT incomeId, Income.name, Income.description, import, date, type, fixed, Income.categoryId, Category.name AS categoryName
  FROM Income
  LEFT JOIN Category ON Income.categoryId = Category.categoryId
  WHERE fixed = "YES" OR (date >= ? AND date < ?)
  ORDER BY date DESC, incomeId DESC;`;
};

export const selectIncomeSumByMonthQuery = () => {
  return `SELECT SUM(import) AS 'SUM' FROM Income
  WHERE fixed = "YES" OR (date >= ? AND date < ?);`;
};

export const selectIncomeSumFixedQuery = () => {
  return `SELECT SUM(import) AS 'SUM' From Income
  WHERE fixed = "YES";`;
};

export const selectIncomeDateQuery = () => {
  return `SELECT date FROM Income;`;
};

export const selectIncomeDayQuery = () => {
  return `SELECT incomeId, Income.name, Income.description, import, date, type, fixed, Income.categoryId, Category.name AS categoryName
  FROM Income
  LEFT JOIN Category ON Income.categoryId = Category.categoryId
  WHERE date = ?
  ORDER BY date DESC, incomeId DESC;`;
};
