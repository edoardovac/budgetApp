import { useEffect, useState, useCallback } from "react";
import { Button } from "@rneui/themed";
import { FlatList, StyleSheet, View, TextInput, Alert } from "react-native";
import { ListItem } from "@rneui/themed";
import { TouchableOpacity } from "react-native-gesture-handler";
import { selectAllExpense } from "../database/dbFunctions/selectDbFunctions/selectExpenseFunctions";
import SearchBar from "./SearchBar";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { selectAllCategory } from "../database/dbFunctions/selectDbFunctions/selectCategoryFunctions";
import { formatDate, formatDateStringYYYYMMDD } from "./formatDate";
import { deleteExpenseById } from "../database/dbFunctions/deleteDbfunctions/deleteExpense";

export default function SearchExpenseForm({ db, handleCloseForm }) {
  const [expenses, setExpenses] = useState([]);
  const [text, setText] = useState("");
  const [date, setDate] = useState(new Date());
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState("date");
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);
  const [type, setType] = useState("");
  const [flag, setFlag] = useState();

  console.log(expenses[0]);

  useEffect(() => {
    fetchExpenses();
    selectAllCategory(db, setCategories);
  }, []);

  const fetchExpenses = () => {
    selectAllExpense(db, setExpenses);
  };

  const searchedExpenses = expenses.filter((expense) => {
    const nameMatch = expense.name.toLowerCase().includes(text.toLowerCase());
    const dateMatch =
      (!startDate ||
        formatDateStringYYYYMMDD(expense.date) >= new Date(startDate)) &&
      (!endDate || formatDateStringYYYYMMDD(expense.date) <= new Date(endDate));
    const typeMatch = !type || expense.type === type;
    const categoryMatch = !categoryId || expense.categoryId === categoryId;

    return nameMatch && dateMatch && typeMatch && categoryMatch;
  });

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    if (flag === "start") {
      setStartDate(currentDate);
    } else if (flag === "end") {
      setEndDate(currentDate);
    }
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const resetSearch = () => {
    setText("");
    setStartDate("");
    setEndDate("");
    setType("");
    setCategoryId("");
  };

  const renderDateMessage = (origin) => {
    if (origin === "startDateInput") {
      if (!startDate) {
        return "Start date";
      } else {
        return formatDate(startDate);
      }
    } else if (origin === "endDateInput") {
      if (!endDate) {
        return "End date";
      } else {
        return formatDate(endDate);
      }
    }
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
                  fetchExpenses();
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

  return (
    <View style={styles.container}>
      <SearchBar
        text={text}
        setText={setText}
        placeholder={"Search income..."}
      />
      <View style={styles.dateContainer}>
        <Button
          title="Choose start date: "
          onPress={() => {
            setFlag("start");
            showDatepicker();
          }}
        />
        <TextInput
          style={styles.dateInput}
          value={renderDateMessage("startDateInput")}
          editable={false}
        />
      </View>
      <View style={styles.dateContainer}>
        <Button
          title="Choose end date:   "
          onPress={() => {
            setFlag("end");
            showDatepicker();
          }}
        />
        <TextInput
          style={styles.dateInput}
          value={renderDateMessage("endDateInput")}
          editable={false}
        />
      </View>
      <Picker
        selectedValue={type}
        onValueChange={(itemValue, itemIndex) => setType(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Select Type" value="" />
        <Picker.Item label="CASH" value="CASH" />
        <Picker.Item label="DEBIT CARD" value="DEBIT CARD" />
        <Picker.Item label="CREDIT CARD" value="CREDIT CARD" />
        <Picker.Item label="CHECK" value="CHECK" />
        <Picker.Item label="WIRE TRANSFER" value="WIRE TRANSFER" />
        <Picker.Item label="BANK TRANSFER" value="BANK TRANSFER" />
        <Picker.Item label="CRYPTO" value="CRYPTO" />
        <Picker.Item label="OTHER" value="OTHER" />
      </Picker>
      <Picker
        selectedValue={categoryId}
        onValueChange={(itemValue, itemIndex) => setCategoryId(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Select Category" value="" />
        {categories.map((category) => (
          <Picker.Item
            key={category.categoryId}
            label={category.name}
            value={category.categoryId}
          />
        ))}
      </Picker>
      <View style={styles.buttonContainer}>
        <Button title="Reset Search" onPress={resetSearch} />
        <Button title="Go back" onPress={handleCloseForm} />
      </View>
      <FlatList
        data={searchedExpenses}
        renderItem={renderItem}
        keyExtractor={(item) => item.expenseId.toString()}
      />
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          onChange={onChange}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  input: {
    height: 40,
    marginVertical: 8,
    borderWidth: 1,
    padding: 10,
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 8,
    marginBottom: 8,
  },
  dateInput: {
    flex: 1,
    height: 40,
    marginHorizontal: 8,
    borderWidth: 1,
    padding: 10,
  },
  picker: {
    height: 40,
    marginVertical: 8,
    borderWidth: 1,
  },
  buttonContainer: {
    marginVertical: 20,
  },
});
