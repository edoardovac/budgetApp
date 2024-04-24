export const deleteIncomeByIdQuery = () => {
  return `DELETE FROM Income
        WHERE incomeId = ?;`;
};
