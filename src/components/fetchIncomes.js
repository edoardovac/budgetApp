import {
  selectIncomeSumByCategoryGivenTime,
  selectIncomeSumByCategoryMonth,
  selectIncomeSumByTypeGivenTime,
  selectIncomeSumByTypeMonth,
} from "../database/dbFunctions/selectDbFunctions/groupByCategory";
import {
  selectIncomeDate,
  selectIncomeDay,
} from "../database/dbFunctions/selectDbFunctions/selectIncomeFunctions";

export const fetchIncomeDate = (db, setIncomeDates) => {
  selectIncomeDate(db, setIncomeDates);
};

export const fetchIncomeGivenDay = (db, setIncomeDateGiven, day) => {
  selectIncomeDay(db, setIncomeDateGiven, day);
};

export const fetchIncomeSumByCategory = (db, setDataChart) => {
  selectIncomeSumByCategoryMonth(db, setDataChart);
};

export const fetchIncomeSumByCategoryTime = (
  db,
  setDataChart,
  startDate,
  endDate
) => {
  selectIncomeSumByCategoryGivenTime(db, setDataChart, startDate, endDate);
};

export const fetchIncomeSumByType = (db, setDataChart) => {
  selectIncomeSumByTypeMonth(db, setDataChart);
};

export const fetchIncomeSumByTypeTime = (
  db,
  setDataChart,
  startDate,
  endDate
) => {
  selectIncomeSumByTypeGivenTime(db, setDataChart, startDate, endDate);
};
