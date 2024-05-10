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
  return `SELECT SUM(import) AS value, type AS label
  FROM Expense
  WHERE date >= ? AND date <= ?
  GROUP BY type
  ORDER BY type;`;
};

export const selectIncomeSumByCategoryQuery = () => {
  return `SELECT SUM(Income.import) AS value, Category.name AS label
  FROM Income
  INNER JOIN Category ON Income.categoryId = Category.categoryId
  GROUP BY Category.name
  ORDER BY Category.categoryId;`;
};

// for piecharts
export const selectExpenseSumByCategoryPieQuery = () => {
  return `SELECT SUM(Expense.import) AS value, Category.name AS text
  FROM Expense
  INNER JOIN Category ON Expense.categoryId = Category.categoryId
  GROUP BY Category.name
  ORDER BY Category.categoryId;`;
};
