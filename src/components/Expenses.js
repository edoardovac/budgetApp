import { View, Text, StyleSheet, FlatList, Alert, Button } from "react-native";
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

export default function Expenses({ route, navigation }) {
  const { db } = route.params;
  const [expensesMonth, setExpensesMonth] = useState([]);
  const [expensesSum, setExpensesSum] = useState(0);
  const [expensesSumFixed, setExpensesSumFixed] = useState(0);
  const [open, setOpen] = useState(false);

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

  const handleOpenForm = () => {
    setOpen(true);
  };

  const handleCloseForm = () => {
    setOpen(false);
    fetchExpensesAndSum();
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

  if (open === true) {
    return (
      <View>
        <Text>ADD AN EXPENSE</Text>
        <ExpenseForm db={db} handleCloseForm={handleCloseForm} />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Text>TOTAL EXPENSES THIS MONTH: {expensesSum.toFixed(2)} €</Text>
      <Text> FIXED EXPENSES: {expensesSumFixed.toFixed(2)} €</Text>
      <FlatList
        data={expensesMonth}
        renderItem={renderItem}
        keyExtractor={(item) => item.expenseId.toString()}
      />
      <Button title="New Expense" onPress={handleOpenForm} />
      <StatusBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "yellow",
  },
});
