import { useState, useEffect } from "react";
import * as SQLite from "expo-sqlite";
import HomeScreen from "./HomeScreen";
import { BottomNavigation, useTheme } from "react-native-paper";
import Expenses from "./Expenses";
import Incomes from "./Incomes";
import { createAllTables } from "../database/dbFunctions/createDbFunctions";

const db = SQLite.openDatabase("budgetdb.db");

export default function HomeNavigation() {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {
      key: "home",
      title: "Home",
      focusedIcon: "home",
      unfocusedIcon: "home-outline",
    },
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
  const HomeRoute = () => <HomeScreen db={db} />;
  const ExpensesRoute = () => <Expenses db={db} />;
  const IncomesRoute = () => <Incomes db={db} />;

  const { colors } = useTheme();

  const renderScene = BottomNavigation.SceneMap({
    home: HomeRoute,
    expenses: ExpensesRoute,
    incomes: IncomesRoute,
  });

  useEffect(() => {
    createAllTables(db);
  }, []);

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
      activeIndicatorStyle={{ backgroundColor: colors.primaryContainer }}
    />
  );
}
