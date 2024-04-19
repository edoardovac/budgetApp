import "react-native-gesture-handler";
import { StyleSheet, Text, View } from "react-native";
import * as SQLite from "expo-sqlite";
import { useEffect } from "react";
import { createAllTables } from "./src/database/dbFunctions/createDbFunctions";
import { NavigationContainer } from "@react-navigation/native";
import DrawerNavigator from "./src/components/DrawerNavigator";

const db = SQLite.openDatabase("budgetdb.db");

export default function App() {
  // creates db if not already existing
  useEffect(() => {
    createAllTables(db);
  }, []);

  return (
    <NavigationContainer>
      <DrawerNavigator />
    </NavigationContainer>
  );
}
