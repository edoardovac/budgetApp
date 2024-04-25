import { View, Text, StyleSheet, FlatList, Alert, Button } from "react-native";
import { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  selectAllIncomeByMonth,
  selectIncomeSumByMonth,
  selectIncomesSumFixed,
} from "../database/dbFunctions/selectDbFunctions/selectIncomeFunctions";
import { deleteIncomeById } from "../database/dbFunctions/deleteDbfunctions/deleteIncome";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ListItem } from "@rneui/themed";
import { formatDate } from "./formatDate";
import IncomeForm from "./IncomeForm";

export default function Incomes({ route, navigation }) {
  const { db } = route.params;
  const [incomesMonth, setIncomesMonth] = useState([]);
  const [incomesSum, setIncomesSum] = useState(0);
  const [incomesSumFixed, setIncomesSumFixed] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchIncomesAndSum();
  }, []);

  const fetchIncomesAndSum = () => {
    selectAllIncomeByMonth(db, setIncomesMonth);
    selectIncomeSumByMonth(db, setIncomesSum);
    selectIncomesSumFixed(db, setIncomesSumFixed);
  };

  const handleOpenForm = () => {
    setOpen(true);
  };

  const handleCloseForm = () => {
    setOpen(false);
    fetchIncomesAndSum();
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity>
      <ListItem
        bottomDivider
        onPress={() => {
          console.log(`${item.name}, id: ${item.incomeId}`);
          Alert.alert(
            `Delete ${item.name}?`,
            `Delete income ${item.name}, ${item.import.toFixed(
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
                  deleteIncomeById(db, item.incomeId);
                  fetchIncomesAndSum();
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
        <Text>ADD AN INCOME</Text>
        <IncomeForm db={db} handleCloseForm={handleCloseForm} />
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Text>TOTAL INCOMES THIS MONTH: {incomesSum.toFixed(2)} €</Text>
        <Text>---</Text>
        <FlatList
          data={incomesMonth}
          renderItem={renderItem}
          keyExtractor={(item) => item.incomeId.toString()}
        />
        <Button title="New Income" onPress={handleOpenForm} />
        <StatusBar />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});