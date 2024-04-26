import { selectNetBalanceByMonthQuery } from "../../queries/selectQueries/selectNetBalanceByMonthQuery";
import {
  currentDateStart,
  currentDateStop,
} from "../../../components/currentDate";

export const selectNetBalanceByMonth = (db, setNetBalance) => {
  const dateStart = currentDateStart();
  const dateStop = currentDateStop();
  db.transaction(
    (tx) => {
      tx.executeSql(
        selectNetBalanceByMonthQuery(),
        [dateStart, dateStop, dateStart, dateStop],
        (_, { rows }) => {
          const net = rows.item(0)["NET"];
          if (!net) {
            setNetBalance(0);
          } else {
            setNetBalance(net);
          }
        }
      );
    },
    (error) =>
      console.error("Error when selecting monthly net balance: ", error),
    () => console.log("Monthly net balance selected successfully")
  );
};
