import { deleteCategoryByIdQuery } from "../../queries/deleteQueries/deleteCategoryQueries";

export const deleteCategoryById = (db, categoryId) => {
  db.transaction(
    (tx) => {
      tx.executeSql(deleteCategoryByIdQuery(), [categoryId]);
    },
    () => console.log("Category not deleted"),
    () => console.log("Category deleted")
  );
};
