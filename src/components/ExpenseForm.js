import { useEffect, useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { selectAllCategory } from "../database/dbFunctions/selectDbFunctions/selectCategoryFunctions";
import { formatDate } from "./formatDate";
import { insertExpense } from "../database/dbFunctions/insertDbFunctions/insertExpense";
import { TextInput, Text, FAB, useTheme } from "react-native-paper";
import DropDownPickers from "./DropDownPickers";

export default function ExpenseForm({ db, handleCloseForm }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [givenImport, setGivenImport] = useState("");
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [categories, setCategories] = useState([]);
  const [pickerFixedValue, setPickerFixedValue] = useState("");
  const [pickerTypeValue, setPickerTypeValue] = useState("");
  const [pickerCategoryValue, setPickerCategoryValue] = useState("");

  const { fonts } = useTheme();

  useEffect(() => {
    selectAllCategory(db, setCategories);
  }, []);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  return (
    <View style={styles.container}>
      <Text
        variant="headlineMedium"
        style={{ marginVertical: 8, textAlign: "center" }}
      >
        ADD AN EXPENSE
      </Text>
      <TextInput
        label={"Expense name"}
        style={styles.input}
        onChangeText={setName}
        value={name}
        //placeholder="Enter Name..."
        maxLength={50}
      />
      <TextInput
        label={"Expense description"}
        style={styles.input}
        onChangeText={setDescription}
        value={description}
        //placeholder="Enter Description..."
        maxLength={255}
      />
      <TextInput
        label={"Expense import (€)"}
        style={styles.input}
        onChangeText={setGivenImport}
        value={givenImport}
        //placeholder="Enter Import (€)..."
        maxLength={255}
        keyboardType="numeric"
      />
      <TextInput
        label={"Expense date: "}
        style={styles.input}
        value={date.toLocaleDateString()}
        editable={false}
        right={
          <TextInput.Icon
            icon="calendar"
            label="Select date"
            onPress={() => setShow(true)}
          />
        }
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
      <DropDownPickers
        pickerTypeValue={pickerTypeValue}
        pickerFixedValue={pickerFixedValue}
        pickerCategoryValue={pickerCategoryValue}
        setPickerTypeValue={setPickerTypeValue}
        setPickerFixedValue={setPickerFixedValue}
        setPickerCategoryValue={setPickerCategoryValue}
        categories={categories}
        origin="expense"
      />
      <View style={styles.fabContainer}>
        <FAB icon="cancel" label="Cancel" onPress={handleCloseForm} />
        <FAB
          icon={"check"}
          label="Add expense"
          onPress={() => {
            console.log("Pressed add expense button...");
            if (name.length == 0) {
              Alert.alert(
                "Name field is empty",
                "Please complete the Name field"
              );
            } else if (givenImport.length == 0) {
              Alert.alert(
                "Import field is empty",
                "Please complete the Import field"
              );
            } else if (pickerTypeValue.length == 0) {
              Alert.alert(
                "Type field is empty",
                "Please pick a Type for your expense"
              );
            } else if (pickerFixedValue.length == 0) {
              Alert.alert(
                "Fixed field is empty",
                "Please select if your expense is recurring monthly or not"
              );
            } else if (pickerCategoryValue.length == 0) {
              Alert.alert(
                "Category field is empty",
                "Please pick a Category for your expense"
              );
            } else {
              Alert.alert(
                "",
                `Do you want to add the expense ${name} ${parseFloat(
                  givenImport
                ).toFixed(2)} €, on ${formatDate(
                  date
                )}, in the ${pickerCategoryValue} category?`,
                [
                  {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel",
                  },
                  {
                    text: "ADD",
                    onPress: () => {
                      console.log("ADD");
                      insertExpense(
                        db,
                        name,
                        description,
                        givenImport,
                        date,
                        pickerTypeValue,
                        pickerFixedValue,
                        pickerCategoryValue
                      );
                      Alert.alert("Success", `${name} was added to the list`);
                      handleCloseForm();
                    },
                  },
                ]
              );
            }
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 16,
  },
  input: {
    marginBottom: 8,
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
  fabContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginVertical: 5,
  },
});
