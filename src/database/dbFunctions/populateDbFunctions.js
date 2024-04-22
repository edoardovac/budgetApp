import { populateAllTablesQuery } from "../queries/populateDbQueries/populateAllTablesQuery";
import {
  populateCategoryQuery,
  populateExpenseQuery,
  populateIncomeQuery,
} from "../queries/populateDbQueries/populateSingleTablesQueries";

export const populateAllTables = (db) => {
  console.log("Populating all tables...");
  populateCategoryTable(db);
  populateExpenseTable(db);
  populateIncomeTable(db);
};

export const populateCategoryTable = (db) => {
  db.transaction(
    (tx) => {
      tx.executeSql(populateCategoryQuery());
    },
    (error) => console.error("Error when populating Catagory table: ", error),
    () => console.log("Category table populated successfully")
  );
};

export const populateExpenseTable = (db) => {
  db.transaction(
    (tx) => {
      tx.executeSql(populateExpenseQuery());
    },
    (error) => console.error("Error when populating Expense table: ", error),
    () => console.log("Expense table populated successfully")
  );
};

export const populateIncomeTable = (db) => {
  db.transaction(
    (tx) => {
      tx.executeSql(populateIncomeQuery());
    },
    (error) => console.error("Error when populating Income table: ", error),
    () => console.log("Income table populated successfully")
  );
};
