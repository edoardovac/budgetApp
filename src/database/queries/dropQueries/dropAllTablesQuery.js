export const dropAllTablesQuery = () => {
  return `DROP TABLE IF EXISTS Expense;
    DROP TABLE IF EXISTS Income;
    DROP TABLE IF EXISTS Category;`;
};
