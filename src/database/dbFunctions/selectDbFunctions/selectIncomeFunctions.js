import {
  selectAllIncomeQuery,
  selectIncomesByMonthQuery,
  selectIncomeSumByMonthQuery,
} from "../../queries/selectQueries/selectIncomeQueries";
import {
  currentDateStart,
  currentDateStop,
} from "../../../components/currentDate";

export const selectAllIncome = (db) => {
  db.transaction(
    (tx) => {
      tx.executeSql(selectAllIncomeQuery());
    },
    (error) =>
      console.error("Error when selecting all in Income table: ", error),
    () => console.log("All in Income selected successfully")
  );
};

export const selectAllIncomeByMonth = (db, setIncomesMonth) => {
  const dateStart = currentDateStart();
  const dateStop = currentDateStop();
  db.transaction(
    (tx) => {
      tx.executeSql(
        selectIncomesByMonthQuery(dateStart, dateStop),
        [],
        (_, { rows }) => setIncomesMonth(rows._array)
      );
    },
    (error) => console.error("Error when selecting monthly Incomes: ", error),
    () => console.log("Monthly incomes selected successfully")
  );
};

export const selectIncomeSumByMonth = (db, setIncomesSum) => {
  const dateStart = currentDateStart();
  console.log(dateStart);
  const dateStop = currentDateStop();
  console.log(dateStop);
  db.transaction(
    (tx) => {
      tx.executeSql(
        selectIncomeSumByMonthQuery(dateStart, dateStop),
        [],
        (_, { rows }) => {
          const sum = rows.item(0)["SUM"];
          setIncomesSum(sum);
        }
      );
    },
    (error) =>
      console.error("Error when selecting SUM of monthly Incomes: ", error),
    () => console.log("SUM of Monthly incomes selected successfully")
  );
};
