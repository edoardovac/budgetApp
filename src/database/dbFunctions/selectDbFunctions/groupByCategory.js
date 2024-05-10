import {
  currentDateStart,
  currentDateStop,
} from "../../../components/currentDate";
import { formatDateReverse } from "../../../components/formatDate";
import {
  selectExpenseSumByCategoryGivenTimeQuery,
  selectExpenseSumByTypeGivenTimeQuery,
  selectIncomeSumByCategoryGivenTimeQuery,
  selectIncomeSumByTypeGivenTimeQuery,
} from "../../queries/selectQueries/groupByCategoryQueries";

// expenses by category
export const selectExpenseSumByCategoryMonth = (
  db,
  setExpenseSumByCategory
) => {
  const dateStart = currentDateStart();
  const dateStop = currentDateStop();
  db.transaction(
    (tx) => {
      tx.executeSql(
        selectExpenseSumByCategoryGivenTimeQuery(),
        [dateStart, dateStop],
        (_, { rows }) => setExpenseSumByCategory(rows._array)
      );
    },
    (error) =>
      console.error("Error when selecting sum expenses by category: ", error),
    () => console.log("sum expenses by category selected successfully")
  );
};

export const selectExpenseSumByCategoryGivenTime = (
  db,
  setExpenseSumByCategory,
  startDate,
  endDate
) => {
  const givenStart = formatDateReverse(startDate);
  const givenEnd = formatDateReverse(endDate);
  console.log("format start " + givenStart);
  db.transaction(
    (tx) => {
      tx.executeSql(
        selectExpenseSumByCategoryGivenTimeQuery(),
        [givenStart, givenEnd],
        (_, { rows }) => setExpenseSumByCategory(rows._array)
      );
    },
    (error) =>
      console.error("Error when selecting sum expenses by category: ", error),
    () => console.log("sum expenses by category selected successfully")
  );
};

// expenses by type
export const selectExpenseSumByTypeMonth = (db, setExpenseSum) => {
  const dateStart = currentDateStart();
  const dateStop = currentDateStop();
  db.transaction(
    (tx) => {
      tx.executeSql(
        selectExpenseSumByTypeGivenTimeQuery(),
        [dateStart, dateStop],
        (_, { rows }) => setExpenseSum(rows._array)
      );
    },
    (error) =>
      console.error("Error when selecting sum expenses by type: ", error),
    () => console.log("sum expenses by type selected successfully")
  );
};

export const selectExpenseSumByTypeGivenTime = (
  db,
  setExpenseSum,
  startDate,
  endDate
) => {
  const givenStart = formatDateReverse(startDate);
  const givenEnd = formatDateReverse(endDate);
  console.log("format start " + givenStart);
  db.transaction(
    (tx) => {
      tx.executeSql(
        selectExpenseSumByTypeGivenTimeQuery(),
        [givenStart, givenEnd],
        (_, { rows }) => setExpenseSum(rows._array)
      );
    },
    (error) =>
      console.error("Error when selecting sum expenses by category: ", error),
    () => console.log("sum expenses by category selected successfully")
  );
};

// incomes by category
export const selectIncomeSumByCategoryMonth = (db, setIncomeSumByCategory) => {
  const dateStart = currentDateStart();
  const dateStop = currentDateStop();
  db.transaction(
    (tx) => {
      tx.executeSql(
        selectIncomeSumByCategoryGivenTimeQuery(),
        [dateStart, dateStop],
        (_, { rows }) => setIncomeSumByCategory(rows._array)
      );
    },
    (error) =>
      console.error("Error when selecting sum incomes by category: ", error),
    () => console.log("sum incomes by category selected successfully")
  );
};

export const selectIncomeSumByCategoryGivenTime = (
  db,
  setIncomeSumByCategory,
  startDate,
  endDate
) => {
  const givenStart = formatDateReverse(startDate);
  const givenEnd = formatDateReverse(endDate);
  console.log("format start " + givenStart);
  db.transaction(
    (tx) => {
      tx.executeSql(
        selectIncomeSumByCategoryGivenTimeQuery(),
        [givenStart, givenEnd],
        (_, { rows }) => setIncomeSumByCategory(rows._array)
      );
    },
    (error) =>
      console.error("Error when selecting sum incomes by category: ", error),
    () => console.log("sum incomes by category selected successfully")
  );
};

// incomes by type
export const selectIncomeSumByTypeMonth = (db, setIncomeSum) => {
  const dateStart = currentDateStart();
  const dateStop = currentDateStop();
  db.transaction(
    (tx) => {
      tx.executeSql(
        selectIncomeSumByTypeGivenTimeQuery(),
        [dateStart, dateStop],
        (_, { rows }) => setIncomeSum(rows._array)
      );
    },
    (error) =>
      console.error("Error when selecting sum incomes by category: ", error),
    () => console.log("sum incomes by category selected successfully")
  );
};

export const selectIncomeSumByTypeGivenTime = (
  db,
  setIncomeSum,
  startDate,
  endDate
) => {
  const givenStart = formatDateReverse(startDate);
  const givenEnd = formatDateReverse(endDate);
  console.log("format start " + givenStart);
  db.transaction(
    (tx) => {
      tx.executeSql(
        selectIncomeSumByTypeGivenTimeQuery(),
        [givenStart, givenEnd],
        (_, { rows }) => setIncomeSum(rows._array)
      );
    },
    (error) =>
      console.error("Error when selecting sum expenses by category: ", error),
    () => console.log("sum expenses by category selected successfully")
  );
};
