import { View, StyleSheet, FlatList } from "react-native";
import {
  Text,
  FAB,
  Portal,
  List,
  Divider,
  useTheme,
  IconButton,
  Dialog,
  Snackbar,
} from "react-native-paper";
import { useState, useCallback } from "react";
import { StatusBar } from "expo-status-bar";
import {
  selectAllExpenseMonth,
  selectExpenseSumByMonth,
  selectExpenseSumFixed,
} from "../database/dbFunctions/selectDbFunctions/selectExpenseFunctions";
import { useFocusEffect } from "@react-navigation/native";
import { formatDate } from "./formatDate";
import { deleteExpenseById } from "../database/dbFunctions/deleteDbfunctions/deleteExpense";
import ExpenseForm from "./ExpenseForm";
import SearchBar from "./SearchBar";
import SearchExpenseForm from "./SearchExpenseForm";
import Dialogs from "./Dialogs";

export default function Expenses({ route, navigation }) {
  const { db } = route.params;
  const [expensesMonth, setExpensesMonth] = useState([]);
  const [expensesSum, setExpensesSum] = useState(0);
  const [expensesSumFixed, setExpensesSumFixed] = useState(0);
  const [openExpenseForm, setOpenExpenseForm] = useState(false);
  const [openSeachForm, setOpenSeachForm] = useState(false);
  const [text, setText] = useState("");
  const [openFab, setOpenFab] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [snackBarDialog, setSnackBarDialog] = useState(
    "This is the snackbar dialog"
  );
  const [expenseDeleteItem, setExpenseDeleteItem] = useState();
  const [isSwitchOn, setIsSwitchOn] = useState(false);

  const { fonts } = useTheme();

  useFocusEffect(
    useCallback(() => {
      fetchExpensesAndSum();
      setOpenExpenseForm(false);
      setOpenSeachForm(false);
    }, [])
  );

  const fetchExpensesAndSum = () => {
    selectAllExpenseMonth(db, setExpensesMonth);
    selectExpenseSumByMonth(db, setExpensesSum);
    selectExpenseSumFixed(db, setExpensesSumFixed);
  };

  const handleOpenExpenseForm = () => {
    setOpenExpenseForm(true);
  };

  const handleCloseExpenseForm = () => {
    setOpenExpenseForm(false);
    fetchExpensesAndSum();
  };

  const handleOpenSearchForm = () => {
    setOpenSeachForm(true);
  };

  const handleCloseSearchForm = () => {
    setOpenSeachForm(false);
  };

  const searchedExpenses = expensesMonth.filter((expenses) => {
    const search = expenses.name.toLowerCase().includes(text.toLowerCase());
    if (isSwitchOn) {
      return search && expenses.fixed.includes("YES");
    } else {
      return search;
    }
  });

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  // handles opening/closing of the fab.group
  const onStateChange = ({ open }) => setOpenFab(open);

  const handleOpenDeleteDialog = () => {
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const handleOpenSnackBar = () => {
    setSnackBarOpen(true);
  };

  const handleCloseSnackBar = () => {
    setSnackBarOpen(false);
  };

  const renderItem = ({ item }) => (
    // need to set style for each item, to have them less spread out
    <View>
      <List.Accordion
        title={`${item.name} - ${item.import.toFixed(2)} €`}
        description={`${item.description}`}
        titleStyle={{
          fontFamily: fonts.titleLarge.fontFamily,
          fontWeight: fonts.titleLarge.fontWeight,
        }}
        descriptionStyle={{
          fontFamily: fonts.labelLarge.fontFamily,
          fontWeight: fonts.labelLarge.fontWeight,
        }}
      >
        <Text variant="bodyMedium" style={{ paddingHorizontal: 24 }}>
          {"Date: " +
            formatDate(item.date) +
            "\n" +
            "Type of transaction: " +
            item.type +
            "\n" +
            "Recurring? " +
            item.fixed +
            "\n" +
            "Category: " +
            item.categoryName}
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            marginVertical: 5,
          }}
        >
          <FAB
            icon="trash-can-outline"
            label="Delete"
            onPress={() => {
              console.log("perdindirindina");
              setExpenseDeleteItem(item);
              handleCloseSnackBar();
              handleOpenDeleteDialog();
            }}
          />
          <FAB
            icon="lead-pencil"
            label="Modify"
            onPress={() => console.log("mazzi")}
          />
        </View>
      </List.Accordion>
      <Divider />
    </View>
  );

  console.log(expenseDeleteItem);

  if (openExpenseForm === true) {
    return <ExpenseForm db={db} handleCloseForm={handleCloseExpenseForm} />;
  }
  if (openSeachForm) {
    return (
      <SearchExpenseForm db={db} handleCloseForm={handleCloseSearchForm} />
    );
  }

  return (
    <View style={styles.container}>
      <Text variant="bodyLarge" style={{ marginTop: 8, textAlign: "center" }}>
        TOTAL EXPENSES THIS MONTH: {expensesSum.toFixed(2)} €
      </Text>
      <Text variant="bodyLarge" style={{ textAlign: "center" }}>
        RECURRING EXPENSES: {expensesSumFixed.toFixed(2)} €
      </Text>
      <View style={styles.filterContainer}>
        <SearchBar
          text={text}
          setText={setText}
          placeholder={"Search this month..."}
          status={isSwitchOn}
          onToggleSwitch={onToggleSwitch}
        />
      </View>
      <FlatList
        data={searchedExpenses}
        renderItem={renderItem}
        keyExtractor={(item) => item.expenseId.toString()}
      />
      <Portal>
        <FAB.Group
          open={openFab}
          visible
          icon={openFab ? "menu-open" : "menu"}
          actions={[
            { icon: "plus", label: "Add", onPress: handleOpenExpenseForm },
            {
              icon: "magnify",
              label: "Search all",
              onPress: handleOpenSearchForm,
            },
          ]}
          onStateChange={onStateChange}
        />
      </Portal>
      <Portal>
        <Snackbar
          visible={snackBarOpen}
          onDismiss={() => handleCloseSnackBar()}
          action={{
            label: "Close",
            onPress: () => {
              handleCloseSnackBar();
            },
          }}
          duration={3000}
        >
          {snackBarDialog}
        </Snackbar>
      </Portal>
      {expenseDeleteItem && (
        <Dialogs
          openDialog={openDeleteDialog}
          handleCloseDialog={handleCloseDeleteDialog}
          item={expenseDeleteItem}
          origin="expense"
          db={db}
          deleteItemById={deleteExpenseById}
          fetchItemsAndSum={fetchExpensesAndSum}
          setSnackBarDialog={setSnackBarDialog}
          handleOpenSnackBar={handleOpenSnackBar}
        />
      )}
      <StatusBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  filterContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    marginBottom: 2,
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 16,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
