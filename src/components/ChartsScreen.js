import { View, Text, StyleSheet, Button } from "react-native";
import { StatusBar } from "expo-status-bar";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("budgetdb.db");

export default function ChartsScreen() {
  const listTables = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';",
        [],
        (_, { rows }) => {
          console.log("Tables in the database:");
          rows._array.forEach((row) => console.log(row.name));
        }
      );
    });
  };

  // Function to display contents of a table
  const displayTableContents = (tableName) => {
    db.transaction((tx) => {
      tx.executeSql(`SELECT * FROM ${tableName};`, [], (_, { rows }) => {
        console.log(`Contents of table '${tableName}':`);
        rows._array.forEach((row) => console.log(row));
      });
    });
  };

  return (
    <View style={styles.container}>
      <Text>This is the Charts Screen</Text>
      <Button title="listTables()" onPress={() => listTables()} />
      <Button
        title="displayTableContents('Expense');"
        onPress={() => displayTableContents("Expense")}
      />
      <Button
        title="displayTableContents('Income');"
        onPress={() => displayTableContents("Income")}
      />
      <Button
        title="displayTableContents('Category');"
        onPress={() => displayTableContents("Category")}
      />
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
