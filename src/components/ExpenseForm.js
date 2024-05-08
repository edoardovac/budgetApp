import { useEffect, useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { selectAllCategory } from "../database/dbFunctions/selectDbFunctions/selectCategoryFunctions";
import { TextInput, Text, FAB, useTheme } from "react-native-paper";
import DropDownPickers from "./DropDownPickers";
import AddDialogs from "./AddDialogs";

export default function ExpenseForm({
  db,
  handleCloseForm,
  handleOpenSnackBar,
  setSnackBarDialog,
}) {
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
  const [openAddDialog, setOpenAddDialog] = useState(false);

  const { fonts } = useTheme();

  useEffect(() => {
    selectAllCategory(db, setCategories);
  }, []);

  const handleOpenAddDialog = () => {
    setOpenAddDialog(true);
  };

  const handleCloseAddDialog = () => {
    setOpenAddDialog(false);
  };

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
      <AddDialogs
        openDialog={openAddDialog}
        handleCloseDialog={handleCloseAddDialog}
        name={name}
        description={description}
        givenImport={givenImport}
        date={date}
        pickerTypeValue={pickerTypeValue}
        pickerFixedValue={pickerFixedValue}
        pickerCategoryValue={pickerCategoryValue}
        db={db}
        handleCloseForm={handleCloseForm}
        origin={"expense"}
        handleOpenSnackBar={handleOpenSnackBar}
        setSnackBarDialog={setSnackBarDialog}
      />
      <View style={styles.fabContainer}>
        <FAB icon="cancel" label="Cancel" onPress={handleCloseForm} />
        <FAB
          icon={"check"}
          label="Add expense"
          onPress={() => {
            handleOpenAddDialog();
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
