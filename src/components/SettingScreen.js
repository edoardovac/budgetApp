import * as SQLite from "expo-sqlite";
import { View, Text, StyleSheet, Button } from "react-native";
import {
  populateAllTables,
  populateCategoryTable,
  populateExpenseTable,
  populateIncomeTable,
} from "../database/dbFunctions/populateDbFunctions";
import {
  dropAllTables,
  dropCategoryTable,
  dropExpenseTable,
  dropIncomeTable,
} from "../database/dbFunctions/dropDbFunctions";
import {
  createAllTables,
  createExpenseTable,
  createIncomeTable,
} from "../database/dbFunctions/createDbFunctions";
import { createCategoryTable } from "../database/dbFunctions/createDbFunctions";

const db = SQLite.openDatabase("budgetdb.db");

export default function SettingScreen() {
  return (
    <View style={styles.container}>
      <Text>This is the Setting Screen</Text>
      <Button title="Populate DB" onPress={() => populateAllTables(db)} />
      <Button title="Drop all tables" onPress={() => dropAllTables(db)} />
      <Button title="Create all tables" onPress={() => createAllTables(db)} />
      <Text>---</Text>
      <Button title="Create CATEGORY" onPress={() => createCategoryTable(db)} />
      <Text>---</Text>
      <Button title="Create EXPENSE" onPress={() => createExpenseTable(db)} />
      <Text>---</Text>
      <Button title="Create INCOME" onPress={() => createIncomeTable(db)} />
      <Text>---</Text>
      <Button title="Drop INCOME" onPress={() => dropIncomeTable(db)} />
      <Text>---</Text>
      <Button title="Drop EXPENSE" onPress={() => dropExpenseTable(db)} />
      <Text>---</Text>
      <Button title="Drop Category" onPress={() => dropCategoryTable(db)} />
      <Text>---</Text>
      <Button title="Drop ALL" onPress={() => dropAllTables(db)} />
      <Text>---</Text>
      <Button
        title="populate category"
        onPress={() => populateCategoryTable(db)}
      />
      <Text>---</Text>
      <Button
        title="populate expense"
        onPress={() => populateExpenseTable(db)}
      />
      <Text>---</Text>
      <Button title="populate income" onPress={() => populateIncomeTable(db)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red",
  },
});
