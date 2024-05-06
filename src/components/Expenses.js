import { View, StyleSheet, FlatList } from "react-native";
import {
  Text,
  ToggleButton,
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

export default function Expenses({ route, navigation }) {
  const { db } = route.params;
  const [expensesMonth, setExpensesMonth] = useState([]);
  const [expensesSum, setExpensesSum] = useState(0);
  const [expensesSumFixed, setExpensesSumFixed] = useState(0);
  const [openExpenseForm, setOpenExpenseForm] = useState(false);
  const [openSeachForm, setOpenSeachForm] = useState(false);
  const [text, setText] = useState("");
  const [status, setStatus] = useState("unchecked");
  const [openFab, setOpenFab] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [snackBarOpen, setSnackBarOpen] = useState(false);

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
    if (status === "checked") {
      return search && expenses.fixed.includes("YES");
    } else {
      return search;
    }
  });

  // "fixed?" toggle button
  const onButtonToggle = (value) => {
    setStatus(status === "checked" ? "unchecked" : "checked");
  };

  // handles opening/closing of the fab.group
  const onStateChange = ({ open }) => setOpenFab(open);

  const handleOpenDeleteDialog = () => {
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  //const onDismissSnackBar = () => setSnackBarOpen(false);

  const renderItem = ({ item }) => (
    // need to set style for each item, to have them less spread out
    <View>
      <List.Accordion
        title={`${item.name} - ${item.import.toFixed(2)} €`}
        titleStyle={{
          fontFamily: fonts.titleMedium.fontFamily,
          fontWeight: fonts.titleMedium.fontWeight,
        }}
      >
        <List.Item
          description={`Date: ${formatDate(item.date)}`}
          descriptionStyle={{
            fontFamily: fonts.bodyLarge.fontFamily,
            fontWeight: fonts.bodyLarge.fontWeight,
          }}
        />
        <Divider />
        <List.Item
          description={`${item.description}`}
          descriptionStyle={{
            fontFamily: fonts.bodyLarge.fontFamily,
            fontWeight: fonts.bodyLarge.fontWeight,
          }}
        />
        <Divider />
        <List.Item
          description={`Type of transaction: ${item.type}`}
          descriptionStyle={{
            fontFamily: fonts.bodyLarge.fontFamily,
            fontWeight: fonts.bodyLarge.fontWeight,
          }}
        />
        <Divider />
        <List.Item
          description={`Recurring? ${item.fixed}`}
          descriptionStyle={{
            fontFamily: fonts.bodyLarge.fontFamily,
            fontWeight: fonts.bodyLarge.fontWeight,
          }}
        />
        <List.Item
          description={`Category: ${item.categoryId}`}
          descriptionStyle={{
            fontFamily: fonts.bodyLarge.fontFamily,
            fontWeight: fonts.bodyLarge.fontWeight,
          }}
        />
        <Divider />
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <IconButton
            icon="trash-can-outline"
            onPress={() => {
              console.log("perdindirindina");
              handleOpenDeleteDialog();
            }}
          />
          <IconButton icon="lead-pencil" onPress={() => console.log("mazzi")} />
        </View>
      </List.Accordion>
      <Divider />
    </View>
  );

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
      <Text variant="bodyLarge">
        TOTAL EXPENSES THIS MONTH: {expensesSum.toFixed(2)} €
      </Text>
      <Text variant="bodyLarge">
        FIXED EXPENSES: {expensesSumFixed.toFixed(2)} €
      </Text>
      <View style={styles.filterContainer}>
        <View style={styles.switchContainer}>
          <Text variant="labelLarge">Fixed?</Text>
          <ToggleButton
            icon="check"
            value="fixed?"
            status={status}
            onPress={onButtonToggle}
          />
        </View>
        <SearchBar
          text={text}
          setText={setText}
          placeholder={"Search this month..."}
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
          icon={openFab ? "calendar-today" : "plus"}
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
      <StatusBar />
    </View>
  );
}

/*        <Snackbar
          visible={snackBarOpen}
          onDismiss={onDismissSnackBar}
          action={{
            label: "Close",
            onPress: () => {
              setSnackBarOpen(false);
            },
          }}
        >
          Element deleted
        </Snackbar>*/

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  filterContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
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
