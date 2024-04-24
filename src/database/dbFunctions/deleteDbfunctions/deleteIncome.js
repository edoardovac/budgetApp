import { deleteIncomeByIdQuery } from "../../queries/deleteQueries/deleteIncomeQueries";

export const deleteIncomeById = (db, incomeId) => {
  db.transaction(
    (tx) => {
      tx.executeSql(deleteIncomeByIdQuery(), [incomeId], (_, results) => {
        console.log("Rows affected:", results.rowsAffected);
      });
    },
    () => console.log("Income not deleted"),
    () => console.log("Income deleted")
  );
};
