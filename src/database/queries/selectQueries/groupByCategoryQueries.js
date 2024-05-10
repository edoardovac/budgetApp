//for barcharts
export const selectExpenseSumByCategoryQuery = () => {
  return `SELECT SUM(Expense.import) AS value, Category.name AS label
  FROM Expense
  INNER JOIN Category ON Expense.categoryId = Category.categoryId
  GROUP BY Category.name
  ORDER BY Category.categoryId;`;
};

export const selectExpenseSumByCategoryGivenTimeQuery = (
  startDate,
  endDate
) => {
  return `SELECT SUM(Expense.import) AS value, Category.name AS label
  FROM Expense
  INNER JOIN Category ON Expense.categoryId = Category.categoryId
  WHERE date BETWEEN ? AND ?
  GROUP BY Category.name
  ORDER BY Category.categoryId;`;
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
