export const selectExpenseSumByCategoryQuery = () => {
  return `SELECT Category.name AS Category, SUM(Expense.import) AS Total_Expense
      FROM Expense
      INNER JOIN Category ON Expense.categoryId = Category.categoryId
      GROUP BY Category.name
      ORDER BY Category.categoryId;`;
};
