import { selectExpenseSumByCategoryQuery } from "../../queries/selectQueries/groupByCategoryQueries";

export const selectExpenseSumByCategory = (db, setExpenseSumByCategory) => {
  db.transaction(
    (tx) => {
      tx.executeSql(selectExpenseSumByCategoryQuery(), [], (_, { rows }) =>
        setExpenseSumByCategory(rows._array)
      );
    },
    (error) =>
      console.error("Error when selecting sum expenses by category: ", error),
    () => console.log("sum expenses by category selected successfully")
  );
};
