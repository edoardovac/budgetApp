import * as SQLite from "expo-sqlite";
import { View, StyleSheet } from "react-native";
import { Text, FAB } from "react-native-paper";
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
  const resetDatabase = () => {
    dropCategoryTable(db);
    dropExpenseTable(db);
    dropIncomeTable(db);
    createCategoryTable(db);
    createExpenseTable(db);
    createIncomeTable(db);
  };

  return (
    <View style={styles.container}>
      <Text variant="bodyLarge" style={{ marginTop: 8, textAlign: "center" }}>
        RESET DATABASE
      </Text>
      <FAB
        icon="trash-can-outline"
        label="Reset Database"
        onPress={() => {
          resetDatabase();
        }}
      />
      <Text variant="bodyLarge" style={{ marginTop: 8, textAlign: "center" }}>
        POPULATE DATABASE WITH MOCK-UP DATA
      </Text>
      <FAB
        icon="trash-can-outline"
        label="Populate Category"
        onPress={() => {
          populateCategoryTable(db);
        }}
      />
      <FAB
        icon="lead-pencil"
        label="Populate Income"
        onPress={() => populateIncomeTable(db)}
      />
      <FAB
        icon="lead-pencil"
        label="Populate Expense"
        onPress={() => populateExpenseTable(db)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 16 },
  fab: {
    justifyContent: "space-evenly",
    marginVertical: 5,
  },
});

/*
      <Text variant="bodyLarge" style={{ marginTop: 8, textAlign: "center" }}>
        DROP
      </Text>
      <View style={styles.fab}>
        <FAB
          icon="trash-can-outline"
          label="Drop Category"
          onPress={() => {
            dropCategoryTable(db);

            createCategoryTable(db);
          }}
        />
        <FAB
          icon="lead-pencil"
          label="Drop Income"
          onPress={() => dropIncomeTable(db)}
        />
        <FAB
          icon="lead-pencil"
          label="Drop Expense"
          onPress={() => dropExpenseTable(db)}
        />
      </View>
      <Text variant="bodyLarge" style={{ marginTop: 8, textAlign: "center" }}>
        CREATE
      </Text>
      <FAB
        icon="trash-can-outline"
        label="Create Category"
        onPress={() => {
          createCategoryTable(db);
        }}
      />
      <FAB
        icon="lead-pencil"
        label="Create Income"
        onPress={() => createIncomeTable(db)}
      />
      <FAB
        icon="lead-pencil"
        label="Create Expense"
        onPress={() => createExpenseTable(db)}
      />
      */
