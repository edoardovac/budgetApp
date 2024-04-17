import { populateAllTablesQuery } from "../queries/populateDbQueries/populateAllTablesQuery";
import {
  populateCategoryQuery,
  populateExpenseQuery,
  populateIncomeQuery,
} from "../queries/populateDbQueries/populateSingleTablesQueries";

export const populateAllTables = (db) => {
  db.transaction(
    (tx) => {
      tx.executeSql(populateAllTablesQuery());
    },
    (error) => console.error("Error when populating all the Tables: ", error),
    () => console.log("All tables populated dropped successfully")
  );
};

export const populateCategoryTable = (db) => {
  db.transaction(
    (tx) => {
      tx.executeSql(populateCategoryQuery());
    },
    (error) => console.error("Error when populating Catagory table: ", error),
    () => console.log("Category table populated dropped successfully")
  );
};

export const populateExpenseTable = (db) => {
  db.transaction(
    (tx) => {
      tx.executeSql(populateExpenseQuery());
    },
    (error) => console.error("Error when populating Expense table: ", error),
    () => console.log("Expense table populated dropped successfully")
  );
};

export const populateIncomeTable = (db) => {
  db.transaction(
    (tx) => {
      tx.executeSql(populateIncomeQuery());
    },
    (error) => console.error("Error when populating Income table: ", error),
    () => console.log("Income table populated dropped successfully")
  );
};
