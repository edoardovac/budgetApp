import { View, Text, StyleSheet, Button } from "react-native";
import { StatusBar } from "expo-status-bar";
import * as SQLite from "expo-sqlite";
import { useCallback, useEffect, useState } from "react";
import { createAllTables } from "../database/dbFunctions/createDbFunctions";
import { selectExpenseSumByMonth } from "../database/dbFunctions/selectDbFunctions/selectExpenseFunctions";
import { selectIncomeSumByMonth } from "../database/dbFunctions/selectDbFunctions/selectIncomeFunctions";
import { useFocusEffect } from "@react-navigation/native";
import { selectNetBalanceByMonth } from "../database/dbFunctions/selectDbFunctions/selectNetBalanceFunction";

const db = SQLite.openDatabase("budgetdb.db");

export default function HomeScreen({ navigation }) {
  const [expensesSum, setExpensesSum] = useState(0);
  const [incomesSum, setIncomesSum] = useState(0);
  const [netBalance, setNetBalance] = useState(0);

  useEffect(() => {
    createAllTables(db);
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchExpenseSumByMonth();
      fetchIncomeSumByMonth();
      fetchNetBalanceByMonth();
    }, [])
  );

  useEffect(() => {
    setNetBalance(incomesSum - expensesSum);
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
        <Text>MONEY TO SPEND THIS MONTH STILL: {netBalance.toFixed(2)} €</Text>
        <Text>---</Text>
      </View>
      <View>
        <Text>EXPENSES THIS MONTH: {expensesSum.toFixed(2)} €</Text>
      </View>
      <View>
        <Text>---</Text>
      </View>
      <View>
        <Text>INCOME THIS MONTH: {incomesSum.toFixed(2)} €</Text>
        <Text>---</Text>
        <Button
          title="Expenses"
          onPress={() =>
            navigation.navigate("Expenses", {
              db: db,
            })
          }
        />
        <Text>---</Text>
        <Button
          title="Incomes"
          onPress={() =>
            navigation.navigate("Incomes", {
              db: db,
            })
          }
        />
      </View>
      <StatusBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "green",
  },
});
