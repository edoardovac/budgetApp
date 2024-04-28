import {
  selectAllIncomeQuery,
  selectIncomeDateQuery,
  selectIncomesByMonthQuery,
  selectIncomeSumByMonthQuery,
  selectIncomeSumFixedQuery,
} from "../../queries/selectQueries/selectIncomeQueries";
import {
  currentDateStart,
  currentDateStop,
} from "../../../components/currentDate";
import { formatDateReverse } from "../../../components/formatDate";

export const selectAllIncome = (db, setIncomes) => {
  db.transaction(
    (tx) => {
      tx.executeSql(selectAllIncomeQuery(), [], (_, { rows }) =>
        setIncomes(rows._array)
      );
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
        selectIncomesByMonthQuery(),
        [dateStart, dateStop],
        (_, { rows }) => setIncomesMonth(rows._array)
      );
    },
    (error) => console.error("Error when selecting monthly Incomes: ", error),
    () => console.log("Monthly incomes selected successfully")
  );
};

export const selectIncomeSumByMonth = (db, setIncomesSum) => {
  const dateStart = currentDateStart();
  const dateStop = currentDateStop();
  db.transaction(
    (tx) => {
      tx.executeSql(
        selectIncomeSumByMonthQuery(),
        [dateStart, dateStop],
        (_, { rows }) => {
          const sum = rows.item(0)["SUM"];
          if (!sum) {
            setIncomesSum(0);
          } else {
            setIncomesSum(sum);
          }
        }
      );
    },
    (error) =>
      console.error("Error when selecting SUM of monthly Incomes: ", error),
    () => console.log("SUM of Monthly incomes selected successfully")
  );
};

export const selectIncomesSumFixed = (db, setIncomesSumFixed) => {
  db.transaction(
    (tx) => {
      tx.executeSql(selectIncomeSumFixedQuery(), [], (_, { rows }) => {
        const sum = rows.item(0)["SUM"];
        if (!sum) {
          setIncomesSumFixed(0);
        } else {
          setIncomesSumFixed(sum);
        }
      });
    },
    (error) =>
      console.error(
        "Error when selecting SUM of FIXED monthly Incomes: ",
        error
      ),
    () => console.log("SUM of FIXED monthly incomes selected successfully")
  );
};

export const selectIncomeDate = (db, setIncomeDate) => {
  db.transaction(
    (tx) => {
      tx.executeSql(selectIncomeDateQuery(), [], (_, { rows }) => {
        const currentDate = formatDateReverse(new Date());
        const incomeDot = { key: "income", color: "green" };
        const wantedResult = {
          [currentDate]: { selected: true, selectedColor: "lightblue" },
        };
        rows._array.forEach((row) => {
          wantedResult[row.date] = { dots: [incomeDot] };
        });
        setIncomeDate(wantedResult);
      });
    },
    (error) => console.error("Error when selecting all income dates: ", error),
    () => console.log("All income dates selected successfully")
  );
};
