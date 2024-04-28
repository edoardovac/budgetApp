import { View, Text, StyleSheet, Alert } from "react-native";
import { StatusBar } from "expo-status-bar";
import * as SQLite from "expo-sqlite";
import { useEffect, useState } from "react";
import { selectExpenseSumByCategory } from "../database/dbFunctions/selectDbFunctions/groupByCategory";
import {
  BarChart,
  LineChart,
  PieChart,
  PopulationPyramid,
} from "react-native-gifted-charts";

const db = SQLite.openDatabase("budgetdb.db");

export default function ChartsScreen() {
  const [expenseSumByCategory, setExpenseSumByCategory] = useState([]);

  useEffect(() => {
    fetchExpenseSumByCategory();
  }, []);

  const fetchExpenseSumByCategory = () => {
    selectExpenseSumByCategory(db, setExpenseSumByCategory);
  };

  const pressedColumn = (item, index) => {
    console.log(item);
    Alert.alert("", `${item.label}: ${item.value} €`);
  };

  return (
    <View style={styles.container}>
      <Text>All Expenses By Category</Text>
      {expenseSumByCategory.length > 0 && (
        <View>
          <BarChart
            data={expenseSumByCategory}
            isAnimated
            onPress={pressedColumn}
          />
          <Text>---</Text>
          <PieChart
            data={expenseSumByCategory}
            onPress={pressedColumn}
            focusOnPress
          />
        </View>
      )}
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
