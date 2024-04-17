import { createAllTablesQuery } from "../queries/createQueries/createAllTablesQuery";
import {
  createCategoryTableQuery,
  createExpenseTableQuery,
  createIncomeTableQuery,
} from "../queries/createQueries/createSingleTableQueries";

export const createAllTables = (db) => {
  db.transaction(
    (tx) => {
      tx.executeSql(createAllTablesQuery());
    },
    (error) => console.error("Error when creating DB", error),
    () => console.log("Db created successfully")
  );
};

export const createCategoryTable = (db) => {
  db.transaction(
    (tx) => {
      tx.executeSql(createCategoryTableQuery());
    },
    (error) => console.error("Error when creating the Category table", error),
    () => console.log("Category table created successfully")
  );
};

export const createExpenseTable = (db) => {
  db.transaction(
    (tx) => {
      tx.executeSql(createExpenseTableQuery());
    },
    (error) => console.error("Error when creating the Expense table", error),
    () => console.log("Expense table created successfully")
  );
};

export const createIncomeTable = (db) => {
  db.transaction(
    (tx) => {
      tx.executeSql(createIncomeTableQuery());
    },
    (error) => console.error("Error when creating the Income table", error),
    () => console.log("Income table created successfully")
  );
};
