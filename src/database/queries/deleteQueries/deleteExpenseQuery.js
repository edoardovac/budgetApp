export const deleteExpenseByIdQuery = () => {
  return `DELETE FROM Expense
      WHERE expenseId = ?;`;
};
