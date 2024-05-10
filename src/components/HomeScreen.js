import { View, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { selectExpenseSumByMonth } from "../database/dbFunctions/selectDbFunctions/selectExpenseFunctions";
import { selectIncomeSumByMonth } from "../database/dbFunctions/selectDbFunctions/selectIncomeFunctions";
import { selectNetBalanceByMonth } from "../database/dbFunctions/selectDbFunctions/selectNetBalanceFunction";
import { Text, useTheme } from "react-native-paper";
import { useEffect, useState } from "react";
import { PieChart } from "react-native-gifted-charts";

export default function HomeScreen({ db }) {
  const [expensesSum, setExpensesSum] = useState(0);
  const [incomesSum, setIncomesSum] = useState(0);
  const [netBalance, setNetBalance] = useState(0);
  const [progress, setProgress] = useState(0);
  const [pieData, setPieData] = useState([]);

  const { colors } = useTheme();

  useEffect(() => {
    fetchExpenseSumByMonth();
    fetchIncomeSumByMonth();
    fetchNetBalanceByMonth();
  }, []);

  useEffect(() => {
    setNetBalance(incomesSum - expensesSum);
    if (incomesSum !== 0) {
      const calculatedProgress = (
        Math.min(Math.max(expensesSum / incomesSum, 0), 1) * 100
      ).toFixed(0);
      setProgress(calculatedProgress);
      calculatePieData(calculatedProgress);
    } else {
      setProgress(0);
    }
  }, [incomesSum, expensesSum]);

  const calculatePieData = (calculatedProgress) => {
    const floatProgress = parseFloat(calculatedProgress);
    setPieData([
      { value: 100 - floatProgress, color: colors.surfaceVariant },
      { value: floatProgress, color: colors.primary, focused: true },
    ]);
  };

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
      <Text variant="headlineMedium" style={styles.text}>
        Welcome back!
      </Text>
      {pieData ? (
        <View style={styles.chartContainer}>
          <PieChart
            donut
            innerRadius={80}
            data={pieData}
            sectionAutoFocus
            centerLabelComponent={() => (
              <View>
                <Text variant="titleSmall" style={styles.text}>
                  Monthly Balance:
                </Text>
                <Text variant="headlineMedium" style={styles.text}>
                  {`${netBalance.toFixed(2)} €`}
                </Text>
                <Text variant="titleMedium" style={styles.text}>
                  {`(${progress} %)`}
                </Text>
              </View>
            )}
          />
        </View>
      ) : (
        <View>
          <Text variant="titleSmall" style={styles.text}>
            No data available. If you haven't done yet, add some incomes and
            expenses!
          </Text>
        </View>
      )}
      <View>
        <Text variant="titleSmall" style={styles.text}>
          EXPENSES THIS MONTH:
        </Text>
        <Text variant="headlineSmall" style={styles.text}>
          {`${expensesSum.toFixed(2)} €`}
        </Text>
      </View>
      <View>
        <Text variant="titleSmall" style={styles.text}>
          INCOMES THIS MONTH:
        </Text>
        <Text variant="headlineSmall" style={styles.text}>
          {`${incomesSum.toFixed(2)} €`}
        </Text>
      </View>
      <StatusBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    marginTop: 10,
    justifyContent: "space-around",
  },
  chartContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginVertical: 12,
  },
  text: {
    textAlign: "center",
  },
});
