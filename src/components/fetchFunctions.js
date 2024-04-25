import { selectExpenseSumByMonth } from "../database/dbFunctions/selectDbFunctions/selectExpenseFunctions";
import { selectIncomeSumByMonth } from "../database/dbFunctions/selectDbFunctions/selectIncomeFunctions";

export const fetchExpenseSumByMonth = (db, setExpensesSum) => {
  selectExpenseSumByMonth(db, setExpensesSum);
};

export const fetchIncomeSumByMonth = (db, setIncomesSum) => {
  selectIncomeSumByMonth(db, setIncomesSum);
};

export const fetchAllSumByMonth = (db, setExpensesSum, setIncomesSum) => {
  selectExpenseSumByMonth(db, setExpensesSum);
  selectIncomeSumByMonth(db, setIncomesSum);
};
