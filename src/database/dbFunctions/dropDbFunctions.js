import { dropAllTablesQuery } from "../queries/dropQueries/dropAllTablesQuery";
import {
  dropCategoryTableQuery,
  dropExpenseTableQuery,
  dropIncomeTableQuery,
} from "../queries/dropQueries/dropSingleTableQueries";

export const dropAllTables = (db) => {
  console.log("Dropping all tables...");
  dropIncomeTable(db);
  dropExpenseTable(db);
  dropCategoryTable(db);
};

export const dropCategoryTable = (db) => {
  db.transaction(
    (tx) => {
      tx.executeSql(dropCategoryTableQuery());
    },
    (error) => console.error("Error when deleting Category table: ", error),
    () => console.log("Category table dropped successfully")
  );
};

export const dropExpenseTable = (db) => {
  db.transaction(
    (tx) => {
      tx.executeSql(dropExpenseTableQuery());
    },
    (error) => console.error("Error when deleting Expense table: ", error),
    () => console.log("Expense table dropped successfully")
  );
};

export const dropIncomeTable = (db) => {
  db.transaction(
    (tx) => {
      tx.executeSql(dropIncomeTableQuery());
    },
    (error) => console.error("Error when deleting Income table: ", error),
    () => console.log("Income table dropped successfully")
  );
};
