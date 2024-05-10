//for barcharts
export const selectExpenseSumByCategoryQuery = () => {
  return `SELECT SUM(Expense.import) AS value, Category.name AS label
  FROM Expense
  INNER JOIN Category ON Expense.categoryId = Category.categoryId
  GROUP BY Category.name
  ORDER BY Category.categoryId;`;
};

export const selectExpenseSumByCategoryGivenTimeQuery = () => {
  return `SELECT SUM(Expense.import) AS value, Category.name AS label
  FROM Expense
  INNER JOIN Category ON Expense.categoryId = Category.categoryId
  WHERE date >= ? AND date <= ?
  GROUP BY Category.name
  ORDER BY Category.categoryId;`;
};

export const selectExpenseSumByTypeGivenTimeQuery = () => {
  return `SELECT SUM(import) AS value, UPPER(SUBSTR(type, 1, 1)) || LOWER (SUBSTR(type, 2)) AS label
  FROM Expense
  WHERE date >= ? AND date <= ?
  GROUP BY type
  ORDER BY type;`;
};

// income queries
export const selectIncomeSumByCategoryQuery = () => {
  return `SELECT SUM(Income.import) AS value, Category.name AS label
  FROM Income
  INNER JOIN Category ON Income.categoryId = Category.categoryId
  GROUP BY Category.name
  ORDER BY Category.categoryId;`;
};

export const selectIncomeSumByTypeGivenTimeQuery = () => {
  return `SELECT SUM(import) AS value, UPPER(SUBSTR(type, 1, 1)) || LOWER (SUBSTR(type, 2)) AS label
  FROM Income
  WHERE fixed = "YES" OR (date >= ? AND date < ?)
  GROUP BY type
  ORDER BY type;`;
};

export const selectIncomeSumByCategoryGivenTimeQuery = () => {
  return `SELECT SUM(Income.import) AS value, Category.name AS label
  FROM Income
  INNER JOIN Category ON Income.categoryId = Category.categoryId
  WHERE date >= ? AND date <= ?
  GROUP BY Category.name
  ORDER BY Category.categoryId;`;
};

///////////////////////////////////////////////////////////////////////////
// for piecharts
export const selectExpenseSumByCategoryPieQuery = () => {
  return `SELECT SUM(Expense.import) AS value, Category.name AS text
  FROM Expense
  INNER JOIN Category ON Expense.categoryId = Category.categoryId
  GROUP BY Category.name
  ORDER BY Category.categoryId;`;
};
