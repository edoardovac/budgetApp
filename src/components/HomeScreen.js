import { View, Text, StyleSheet, FlatList, Button } from "react-native";
import { StatusBar } from "expo-status-bar";
import * as SQLite from "expo-sqlite";
import { useEffect, useState } from "react";
import { createAllTables } from "../database/dbFunctions/createDbFunctions";
import {
  selectAllExpenseMonth,
  selectExpenseSumByMonth,
} from "../database/dbFunctions/selectDbFunctions/selectExpenseFunctions";
import {
  selectAllIncomeByMonth,
  selectIncomeSumByMonth,
} from "../database/dbFunctions/selectDbFunctions/selectIncomeFunctions";

const db = SQLite.openDatabase("budgetdb.db");

export default function HomeScreen({ navigation }) {
  const [expensesMonth, setExpensesMonth] = useState([]);
  const [expensesSum, setExpensesSum] = useState(0);
  const [incomesMonth, setIncomesMonth] = useState([]);
  const [incomesSum, setIncomesSum] = useState(0);
  const [netBalance, setNetBalance] = useState(0);

  useEffect(() => {
    createAllTables(db);
    selectAllExpenseMonth(db, setExpensesMonth);
    selectExpenseSumByMonth(db, setExpensesSum);
    selectAllIncomeByMonth(db, setIncomesMonth);
    selectIncomeSumByMonth(db, setIncomesSum);
  }, []);

  useEffect(() => {
    setNetBalance(incomesSum - expensesSum);
  }, [incomesSum, expensesSum]);

  return (
    <View style={styles.container}>
      <View>
        <Text>MONEY TO SPEND THIS MONTH STILL: {netBalance.toFixed(2)} €</Text>
        <Text>---</Text>
      </View>
      <View>
        <Text>EXPENSES THIS MONTH: {expensesSum.toFixed(2)} €</Text>
        <FlatList
          data={expensesMonth}
          renderItem={({ item }) => (
            <View>
              <Text>
                {item.expenseId} - {item.name} - {item.import.toFixed(2)} € -
                date: {item.date} Fixed?{item.fixed}
              </Text>
            </View>
          )}
          keyExtractor={(item) => item.expenseId.toString()}
        />
      </View>
      <View>
        <Text>---</Text>
      </View>
      <View>
        <Text>INCOME THIS MONTH: {incomesSum.toFixed(2)} €</Text>
        <FlatList
          data={incomesMonth}
          renderItem={({ item }) => (
            <View>
              <Text>
                {item.incomeId} - {item.name} - {item.import.toFixed(2)} € -
                date:
                {item.date} {item.fixed}
              </Text>
            </View>
          )}
        />
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
