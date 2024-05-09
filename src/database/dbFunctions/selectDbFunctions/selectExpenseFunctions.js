import {
  currentDateStart,
  currentDateStop,
} from "../../../components/currentDate";
import { formatDateReverse } from "../../../components/formatDate";
import {
  selectAllExpenseQuery,
  selectExpenseDateQuery,
  selectExpensesByMonthQuery,
  selectExpenseSumFixedQuery,
  selectExpenseSumMonthQuery,
  selectExpenseDayQuery,
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
        selectExpensesByMonthQuery(),
        [dateStart, dateStop],
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
        selectExpenseSumMonthQuery(),
        [dateStart, dateStop],
        (_, { rows }) => {
          const sum = rows.item(0)["SUM"];
          if (!sum) {
            setExpensesSum(0);
          } else {
            setExpensesSum(sum);
          }
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
        if (!sum) {
          setExpensesSumFixed(0);
        } else {
          setExpensesSumFixed(sum);
        }
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

export const selectExpenseDate = (db, setExpenseDates) => {
  db.transaction(
    (tx) => {
      tx.executeSql(selectExpenseDateQuery(), [], (_, { rows }) => {
        const currentDate = formatDateReverse(new Date());
        const expenseDot = { key: "expense", color: "red" };
        const wantedResult = {
          [currentDate]: { selected: true, selectedColor: "lightblue" },
        };
        rows._array.forEach((row) => {
          wantedResult[row.date] = { dots: [expenseDot] };
        });
        setExpenseDates(wantedResult);
      });
    },
    (error) =>
      console.error("Error when selecting all expenses dates: ", error),
    () => console.log("All expense dates selected successfully")
  );
};

export const selectExpenseDay = (db, setExpenseDateGiven, givenDate) => {
  db.transaction(
    (tx) => {
      tx.executeSql(selectExpenseDayQuery(), [givenDate], (_, { rows }) =>
        setExpenseDateGiven(rows._array)
      );
    },
    (error) =>
      console.error("Error when selecting expenses on given day: ", error),
    () => console.log("expenses on given day selected successfully")
  );
};
