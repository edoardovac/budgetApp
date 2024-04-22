import "react-native-gesture-handler";
import { StyleSheet, Text, View } from "react-native";
import * as SQLite from "expo-sqlite";
import { useEffect } from "react";
import { createAllTables } from "./src/database/dbFunctions/createDbFunctions";
import { NavigationContainer } from "@react-navigation/native";
import DrawerNavigator from "./src/components/DrawerNavigator";

export default function App() {
  const db = SQLite.openDatabase("budgetdb.db");

  return (
    <NavigationContainer>
      <DrawerNavigator />
    </NavigationContainer>
  );
}
