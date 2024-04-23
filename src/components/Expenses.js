import { View, Text, StyleSheet, FlatList } from "react-native";
import { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  selectAllExpenseMonth,
  selectExpenseSumByMonth,
} from "../database/dbFunctions/selectDbFunctions/selectExpenseFunctions";

export default function Expenses({ route, navigation }) {
  const { db } = route.params;
  const [expensesMonth, setExpensesMonth] = useState([]);
  const [expensesSum, setExpensesSum] = useState(0);

  useEffect(() => {
    selectAllExpenseMonth(db, setExpensesMonth);
    selectExpenseSumByMonth(db, setExpensesSum);
  }, []);

  return (
    <View style={styles.container}>
      <Text>TOTAL EXPENSES THIS MONTH: {expensesSum.toFixed(2)} €</Text>
      <Text>---</Text>
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
      <StatusBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "yellow",
  },
});
