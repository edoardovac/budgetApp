import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Alert,
  Button,
  Switch,
} from "react-native";
import { useState, useCallback } from "react";
import { StatusBar } from "expo-status-bar";
import {
  selectAllExpenseMonth,
  selectExpenseSumByMonth,
  selectExpenseSumFixed,
} from "../database/dbFunctions/selectDbFunctions/selectExpenseFunctions";
import { useFocusEffect } from "@react-navigation/native";
import { ListItem } from "@rneui/themed";
import { TouchableOpacity } from "react-native-gesture-handler";
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
  const [fixedFilter, setFixedFilter] = useState(false);

  useFocusEffect(
    useCallback(() => {
      fetchExpensesAndSum();
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
    if (fixedFilter) {
      return search && expenses.fixed.includes("YES");
    } else {
      return search;
    }
  });

  const switchFixedFilter = () => {
    setFixedFilter(!fixedFilter);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity>
      <ListItem
        bottomDivider
        onPress={() => {
          console.log(item.name);
          Alert.alert(
            `Delete ${item.name}?`,
            `Delete expense ${item.name}, ${item.import.toFixed(
              2
            )}€ on ${formatDate(item.date)}`,
            [
              {
                text: "Cancel",
                onPress: () => console.log("Cancel pressed"),
                style: "cancel",
              },
              {
                text: "DELETE",
                onPress: () => {
                  console.log("DELETE PRESSED");
                  deleteExpenseById(db, item.expenseId);
                  fetchExpensesAndSum();
                },
              },
            ]
          );
        }}
      >
        <ListItem.Content>
          <ListItem.Title>
            {item.name} - {item.import.toFixed(2)} €
          </ListItem.Title>
          <ListItem.Subtitle>
            {formatDate(item.date)} fixed? {item.fixed}
          </ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    </TouchableOpacity>
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
      <Text>TOTAL EXPENSES THIS MONTH: {expensesSum.toFixed(2)} €</Text>
      <Text> FIXED EXPENSES: {expensesSumFixed.toFixed(2)} €</Text>
      <FlatList
        data={searchedExpenses}
        renderItem={renderItem}
        keyExtractor={(item) => item.expenseId.toString()}
        ListHeaderComponent={
          <View style={styles.filterContainer}>
            <SearchBar
              text={text}
              setText={setText}
              placeholder={"Search this month..."}
              style={{ flex: 1 }}
            />
            <View style={styles.switchContainer}>
              <Text>Fixed?</Text>
              <Switch
                value={fixedFilter}
                onValueChange={switchFixedFilter}
                style={styles.switch}
              />
            </View>
          </View>
        }
      />
      <Button title="Search all" onPress={handleOpenSearchForm} />
      <Button title="New Expense" onPress={handleOpenExpenseForm} />
      <StatusBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "yellow",
  },
  filterContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  switch: {
    marginLeft: 10,
  },
});
