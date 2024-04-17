import { selectAllCategoryQuery } from "../../queries/selectQueries/selectCategoryQueries";

export const selectAllCategory = (db) => {
  db.transaction(
    (tx) => {
      tx.executeSql(selectAllCategoryQuery());
    },
    (error) =>
      console.error("Error when selecting all in Category table: ", error),
    () => console.log("All in Category selected successfully")
  );
};
