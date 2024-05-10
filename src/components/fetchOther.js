import { fetchExpenseDate } from "./fetchExpenses";
import { fetchIncomeDate } from "./fetchIncomes";

export const fetchAllDates = (db, setExpenseDates, setIncomeDates) => {
  fetchExpenseDate(db, setExpenseDates);
  fetchIncomeDate(db, setIncomeDates);
};
