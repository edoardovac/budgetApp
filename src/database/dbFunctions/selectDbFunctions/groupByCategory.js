import { formatDateReverse } from "../../../components/formatDate";
import {
  selectExpenseSumByCategoryGivenTimeQuery,
  selectExpenseSumByCategoryQuery,
} from "../../queries/selectQueries/groupByCategoryQueries";

export const selectExpenseSumByCategory = (db, setExpenseSumByCategory) => {
  db.transaction(
    (tx) => {
      tx.executeSql(selectExpenseSumByCategoryQuery(), [], (_, { rows }) =>
        setExpenseSumByCategory(rows._array)
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
