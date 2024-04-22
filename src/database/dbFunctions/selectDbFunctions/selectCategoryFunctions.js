import { selectAllCategoryQuery } from "../../queries/selectQueries/selectCategoryQueries";

export const selectAllCategory = (db, setCategories) => {
  db.transaction(
    (tx) => {
      tx.executeSql(selectAllCategoryQuery(), [], (_, { rows }) =>
        setCategories(rows._array)
      );
    },
    // if query fails
    (error) =>
      console.error("Error when selecting all in Category table: ", error),
    // if correct result
    () => console.log("All in Category selected successfully")
  );
};
