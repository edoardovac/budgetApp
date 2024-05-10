import * as SQLite from "expo-sqlite";
import { useState } from "react";
import { BottomNavigation } from "react-native-paper";
import ChartsExpense from "./ChartsExpense";
import ChartsIncome from "./ChartsIncome";

const db = SQLite.openDatabase("budgetdb.db");

export default function ChartsNavigation() {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {
      key: "expenses",
      title: "Expenses",
      focusedIcon: "shopping",
      unfocusedIcon: "shopping-outline",
    },
    {
      key: "incomes",
      title: "Incomes",
      focusedIcon: "wallet",
      unfocusedIcon: "wallet-outline",
    },
  ]);

  const ExpensesChartsRoute = () => <ChartsExpense db={db} />;
  const IncomesChartsRoute = () => <ChartsIncome db={db} />;

  const renderScene = BottomNavigation.SceneMap({
    expenses: ExpensesChartsRoute,
    incomes: IncomesChartsRoute,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
}
