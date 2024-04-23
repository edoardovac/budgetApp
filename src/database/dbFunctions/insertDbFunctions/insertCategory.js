import { insertCategoryQuery } from "../../queries/insertQueries/insertCategory";

export const insertCategory = (name, description, db) => {
  const givenName = name.replace(/[^a-zA-Z\s]/g, "");
  const givenDescription = description.replace(/[^a-zA-Z\s]/g, "");
  if (givenName.length > 0) {
    console.log(givenName);
    db.transaction(
      (tx) => {
        tx.executeSql(insertCategoryQuery(), [givenName, givenDescription]);
      },
      () => console.log("failed to insert"),
      () => console.log("inserted eheh")
    );
  } else {
    console.log("No name");
  }
};
