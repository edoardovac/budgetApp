import { selectAllIncomeQuery } from "../../queries/selectQueries/selectIncomeQueries";

export const selectAllIncome = (db) => {
  db.transaction(
    (tx) => {
      tx.executeSql(selectAllIncomeQuery());
    },
    (error) =>
      console.error("Error when selecting all in Income table: ", error),
    () => console.log("All in Income selected successfully")
  );
};
