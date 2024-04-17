import { selectAllExpenseQuery } from "../../queries/selectQueries/selectExpenseQueries";

export const selectAllExpense = (db) => {
  db.transaction(
    (tx) => {
      tx.executeSql(selectAllExpenseQuery());
    },
    (error) =>
      console.error("Error when selecting all in Expense table: ", error),
    () => console.log("All in Expense selected successfully")
  );
};
