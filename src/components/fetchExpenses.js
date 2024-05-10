import {
  selectExpenseSumByCategoryGivenTime,
  selectExpenseSumByCategoryMonth,
  selectExpenseSumByTypeGivenTime,
  selectExpenseSumByTypeMonth,
} from "../database/dbFunctions/selectDbFunctions/groupByCategory";
import {
  selectExpenseDate,
  selectExpenseDay,
} from "../database/dbFunctions/selectDbFunctions/selectExpenseFunctions";

export const fetchExpenseDate = (db, setExpenseDates) => {
  selectExpenseDate(db, setExpenseDates);
};

export const fetchExpenseGivenDay = (db, setExpenseDateGiven, day) => {
  selectExpenseDay(db, setExpenseDateGiven, day);
};

export const fetchExpenseSumByCategory = (db, setDataChart) => {
  selectExpenseSumByCategoryMonth(db, setDataChart);
};

export const fetchExpenseSumByCategoryTime = (
  db,
  setDataChart,
  startDate,
  endDate
) => {
  selectExpenseSumByCategoryGivenTime(db, setDataChart, startDate, endDate);
};

export const fetchExpenseSumByType = (db, setDataChart) => {
  selectExpenseSumByTypeMonth(db, setDataChart);
};

export const fetchExpenseSumByTypeTime = (
  db,
  setDataChart,
  startDate,
  endDate
) => {
  selectExpenseSumByTypeGivenTime(db, setDataChart, startDate, endDate);
};

//charts screen first fetch method.
export const fetchExpenseSumByCategory = () => {
  selectExpenseSumByCategory(db, setExpenseSumByCategory);
};
