import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import * as SQLite from "expo-sqlite";
import { useEffect } from "react";
import { createAllTables } from "./src/database/dbFunctions/createDbFunctions";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./src/components/HomeScreen";
import SettingScreen from "./src/components/SettingScreen";

const db = SQLite.openDatabase("budgetdb.db");

export default function App() {
  useEffect(() => {
    createAllTables(db);
  }, []);

  const Tab = createBottomTabNavigator();

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Settings" component={SettingScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
