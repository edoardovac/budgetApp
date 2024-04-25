// cannot delete category if either expense, income or both exist
export const dropCategoryTableQuery = () => {
  return `DROP TABLE IF EXISTS Category;`;
};
export const dropExpenseTableQuery = () => {
  return `DROP TABLE IF EXISTS Expense;`;
};

export const dropIncomeTableQuery = () => {
  return `DROP TABLE IF EXISTS Income;`;
};
