export const selectNetBalanceByMonthQuery = () => {
  return `SELECT 
    (SELECT SUM(import) FROM Income
     WHERE fixed = "YES" OR (date >= ? AND date < ?)) - 
    (SELECT SUM(import) FROM Expense
     WHERE fixed = "YES" OR (date >= ? AND date < ?)) AS 'NET';`;
};
