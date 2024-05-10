import * as SQLite from "expo-sqlite";
import { View, StyleSheet } from "react-native";
import {
  Text,
  FAB,
  useTheme,
  Divider,
  Dialog,
  Portal,
  Button,
  Snackbar,
} from "react-native-paper";
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
import { useState } from "react";

const db = SQLite.openDatabase("budgetdb.db");

export default function SettingScreen() {
  const [showDialog, setShowDialog] = useState(false);
  const [openSnachBar, setOpenSnackBar] = useState(false);
  const [snackBarText, setSnackBarText] = useState("This is the snackbar text");

  const resetDatabase = () => {
    dropCategoryTable(db);
    dropExpenseTable(db);
    dropIncomeTable(db);
    createCategoryTable(db);
    createExpenseTable(db);
    createIncomeTable(db);
  };

  const { colors } = useTheme();

  const hideDialog = () => setShowDialog(false);

  const styles = StyleSheet.create({
    container: { flex: 1, paddingHorizontal: 16 },
    text: { marginTop: 8, textAlign: "center" },
    fabContainer: {
      marginVertical: 8,
    },
    fab: { marginBottom: 12 },
    divider: { marginVertical: 16 },
  });

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.text}>
        RESET DATABASE
      </Text>
      <View style={styles.fabContainer}>
        <FAB
          icon="restore-alert"
          label="Reset Database"
          onPress={() => {
            setShowDialog(true);
          }}
        />
      </View>
      <Divider style={styles.divider} bold={true} />
      <Text variant="headlineMedium" style={styles.text}>
        POPULATE DATABASE WITH MOCK-UP DATA
      </Text>
      <View style={styles.fabContainer}>
        <FAB
          icon="shopping-outline"
          label="Populate Expense"
          onPress={() => populateExpenseTable(db)}
          style={styles.fab}
        />
        <FAB
          icon="wallet-plus-outline"
          label="Populate Income"
          onPress={() => populateIncomeTable(db)}
          style={styles.fab}
        />
        <FAB
          icon="playlist-plus"
          label="Populate Category"
          onPress={() => {
            populateCategoryTable(db);
          }}
          style={styles.fab}
        />
      </View>
      <Portal>
        <Dialog
          visible={showDialog}
          onDismiss={hideDialog}
          theme={{ colors: { primary: colors.error } }}
        >
          <Dialog.Icon icon="alert" />
          <Dialog.Title style={{ textAlign: "center" }}>WARNING</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyLarge" style={{ textAlign: "center" }}>
              {"This action is irreversible.\nYou WILL loose all your data."}
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => hideDialog()}>Cancel</Button>
            <Button
              textColor={colors.error}
              onPress={() => {
                resetDatabase();
                setSnackBarText("Database reset");
                setOpenSnackBar(true);
              }}
            >
              I understand
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <Portal>
        <Snackbar
          visible={openSnachBar}
          onDismiss={() => setOpenSnackBar(false)}
        >
          {snackBarText}
        </Snackbar>
      </Portal>
    </View>
  );
}
