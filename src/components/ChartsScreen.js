import { View, Text, StyleSheet, Button } from "react-native";
import { StatusBar } from "expo-status-bar";
import * as SQLite from "expo-sqlite";
import { useEffect, useState } from "react";
import { selectExpenseSumByCategory } from "../database/dbFunctions/selectDbFunctions/groupByCategory";

const db = SQLite.openDatabase("budgetdb.db");

export default function ChartsScreen() {
  const [expenseSumByCategory, setExpenseSumByCategory] = useState([]);

  useEffect(() => {
    fetchExpenseSumByCategory();
  }, []);

  const fetchExpenseSumByCategory = () => {
    selectExpenseSumByCategory(db, setExpenseSumByCategory);
  };

  console.log(expenseSumByCategory);

  return (
    <View style={styles.container}>
      <Text>This is the Charts Screen</Text>
      <StatusBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightblue",
  },
});
