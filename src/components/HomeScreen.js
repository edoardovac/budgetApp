import { View, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { selectExpenseSumByMonth } from "../database/dbFunctions/selectDbFunctions/selectExpenseFunctions";
import { selectIncomeSumByMonth } from "../database/dbFunctions/selectDbFunctions/selectIncomeFunctions";
import { selectNetBalanceByMonth } from "../database/dbFunctions/selectDbFunctions/selectNetBalanceFunction";
import { ProgressBar, Text } from "react-native-paper";
import { useEffect, useState } from "react";

export default function HomeScreen({ db }) {
  const [expensesSum, setExpensesSum] = useState(0);
  const [incomesSum, setIncomesSum] = useState(0);
  const [netBalance, setNetBalance] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    fetchExpenseSumByMonth();
    fetchIncomeSumByMonth();
    fetchNetBalanceByMonth();
  }, []);

  useEffect(() => {
    setNetBalance(incomesSum - expensesSum);
    if (incomesSum !== 0) {
      const calculatedProgress =
        Math.min(Math.max(expensesSum / incomesSum, 0), 1) * 100;
      setProgress(calculatedProgress);
    } else {
      setProgress(0);
    }
  }, [incomesSum, expensesSum]);

  const fetchExpenseSumByMonth = () => {
    selectExpenseSumByMonth(db, setExpensesSum);
  };

  const fetchIncomeSumByMonth = () => {
    selectIncomeSumByMonth(db, setIncomesSum);
  };

  const fetchNetBalanceByMonth = () => {
    selectNetBalanceByMonth(db, setNetBalance);
  };

  return (
    <View style={styles.container}>
      <View>
        <Text variant="headlineMedium">
          MONEY TO SPEND THIS MONTH STILL: {netBalance.toFixed(2)} €
        </Text>
        <Text>---</Text>
      </View>
      <View>
        <Text variant="headlineSmall">
          EXPENSES THIS MONTH: {expensesSum.toFixed(2)} €
        </Text>
      </View>
      <View>
        <Text>---</Text>
      </View>
      <View>
        <Text variant="headlineSmall">
          INCOME THIS MONTH: {incomesSum.toFixed(2)} €
        </Text>
        <Text>---</Text>

        <Text variant="headlineSmall" style={{ marginRight: 10 }}>
          Expenses over Incomes:
        </Text>
        <ProgressBar progress={progress / 100} color={"red"} />
      </View>
      <StatusBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
});
