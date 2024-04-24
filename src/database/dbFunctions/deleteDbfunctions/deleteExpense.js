import { deleteExpenseByIdQuery } from "../../queries/deleteQueries/deleteExpenseQuery";

export const deleteExpenseById = (db, expenseId) => {
  db.transaction(
    (tx) => {
      tx.executeSql(deleteExpenseByIdQuery(), [expenseId], (_, results) => {
        console.log("Rows affected:", results.rowsAffected);
      });
    },
    () => console.log("Expense not deleted"),
    () => console.log("Expense deleted")
  );
};
