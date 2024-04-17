// cannot delete category if either expense, income or both exist
export const dropCategoryTableQuery = () => {
  return `DROP TABLE Category;`;
};
export const dropExpenseTableQuery = () => {
  return `DROP TABLE Expense;`;
};

export const dropIncomeTableQuery = () => {
  return `DROP TABLE Income;`;
};
