import { insertCategoryQuery } from "../../queries/insertQueries/insertCategoryQueries";

export const insertCategory = (db, name, description) => {
  const givenName = name.replace(/[^a-zA-Z\s]/g, "").trim();
  let givenDescription = description.replace(/[^a-zA-Z\s]/g, "").trim();
  if (description.length === 0) {
    givenDescription = "No description";
  }
  if (givenName.length > 0) {
    console.log(givenName);
    console.log(givenDescription);
    db.transaction(
      (tx) => {
        tx.executeSql(insertCategoryQuery(), [givenName, givenDescription]);
      },
      () => console.log("failed to add category"),
      () => console.log("inserted category successfully")
    );
  } else {
    console.log("No name");
  }
};
