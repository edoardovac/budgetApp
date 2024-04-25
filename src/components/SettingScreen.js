import * as SQLite from "expo-sqlite";
import { View, Text, StyleSheet, Button } from "react-native";
import {
  populateCategoryTable,
  populateExpenseTable,
  populateIncomeTable,
} from "../database/dbFunctions/populateDbFunctions";
import {
  dropCategoryTable,
  dropExpenseTable,
  dropIncomeTable,
} from "../database/dbFunctions/dropDbFunctions";
import {
  createCategoryTable,
  createExpenseTable,
  createIncomeTable,
} from "../database/dbFunctions/createDbFunctions";

const db = SQLite.openDatabase("budgetdb.db");

export default function SettingScreen() {
  return (
    <View style={styles.container}>
      <Text>DROP</Text>
      <Button title="Drop Category" onPress={() => dropCategoryTable(db)} />
      <Text>---</Text>
      <Button title="Drop Income" onPress={() => dropIncomeTable(db)} />
      <Text>---</Text>
      <Button title="Drop Expense" onPress={() => dropExpenseTable(db)} />
      <Text>CREATE</Text>
      <Button title="Create Category" onPress={() => createCategoryTable(db)} />
      <Text>---</Text>
      <Button title="Create Income" onPress={() => createIncomeTable(db)} />
      <Text>---</Text>
      <Button title="Create Expense" onPress={() => createExpenseTable(db)} />
      <Text>POPULATE</Text>
      <Button
        title="Populate Category"
        onPress={() => populateCategoryTable(db)}
      />
      <Text>---</Text>
      <Button title="Populate Income" onPress={() => populateIncomeTable(db)} />
      <Text>---</Text>
      <Button
        title="Populate Expense"
        onPress={() => populateExpenseTable(db)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red",
  },
});
