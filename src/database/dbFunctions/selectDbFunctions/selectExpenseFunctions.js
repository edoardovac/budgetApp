import {
  currentDateStart,
  currentDateStop,
} from "../../../components/currentDate";
import {
  selectAllExpenseQuery,
  selectExpensesByMonthQuery,
  selectExpenseSumFixedQuery,
  selectExpenseSumMonthQuery,
} from "../../queries/selectQueries/selectExpenseQueries";

export const selectAllExpense = (db, setExpenses) => {
  db.transaction(
    (tx) => {
      tx.executeSql(selectAllExpenseQuery(), [], (_, { rows }) =>
        setExpenses(rows._array)
      );
    },
    (error) =>
      console.error("Error when selecting all in Expense table: ", error),
    () => console.log("All in Expense selected successfully")
  );
};

export const selectAllExpenseMonth = (db, setExpensesMonth) => {
  const dateStart = currentDateStart();
  const dateStop = currentDateStop();
  db.transaction(
    (tx) => {
      tx.executeSql(
        selectExpensesByMonthQuery(dateStart, dateStop),
        [],
        (_, { rows }) => setExpensesMonth(rows._array)
      );
    },
    (error) => console.error("Error when selecting monthly Expenses: ", error),
    () => console.log("Monthly expenses selected successfully")
  );
};

export const selectExpenseSumByMonth = (db, setExpensesSum) => {
  const dateStart = currentDateStart();
  const dateStop = currentDateStop();
  db.transaction(
    (tx) => {
      tx.executeSql(
        selectExpenseSumMonthQuery(dateStart, dateStop),
        [],
        (_, { rows }) => {
          const sum = rows.item(0)["SUM"];
          setExpensesSum(sum);
        }
      );
    },
    (error) =>
      console.error("Error when selecting SUM of monthly Expenses: ", error),
    () => console.log("SUM of Monthly expenses selected successfully")
  );
};

export const selectExpenseSumFixed = (db, setExpensesSumFixed) => {
  db.transaction(
    (tx) => {
      tx.executeSql(selectExpenseSumFixedQuery(), [], (_, { rows }) => {
        const sum = rows.item(0)["SUM"];
        setExpensesSumFixed(sum);
      });
    },
    (error) =>
      console.error(
        "Error when selecting SUM of FIXED monthly Expenses: ",
        error
      ),
    () => console.log("SUM of FIXED monthly expenses selected successfully")
  );
};
