import { useEffect, useState } from "react";
import {
  TextInput,
  View,
  StyleSheet,
  Button,
  Alert,
  ScrollView,
  Text,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { selectAllCategory } from "../database/dbFunctions/selectDbFunctions/selectCategoryFunctions";
import { formatDate } from "./formatDate";
import { insertExpense } from "../database/dbFunctions/insertDbFunctions/insertExpense";

export default function ExpenseForm({ db, handleCloseForm }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [givenImport, setGivenImport] = useState("");
  const [date, setDate] = useState(new Date());
  const [type, setType] = useState("");
  const [fixed, setFixed] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [categories, setCategories] = useState([]);

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
    <ScrollView contentContainerStyle={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={setName}
        value={name}
        placeholder="Expense Name"
        maxLength={50}
      />
      <TextInput
        style={styles.input}
        onChangeText={setDescription}
        value={description}
        placeholder="Expense Description"
        maxLength={255}
      />
      <TextInput
        style={styles.input}
        onChangeText={setGivenImport}
        value={givenImport}
        placeholder="Expense Import (€)"
        maxLength={255}
        keyboardType="numeric"
      />
      <View style={styles.dateContainer}>
        <Button onPress={showDatepicker} title="Choose date: " />
        <TextInput
          style={styles.dateInput}
          value={date.toLocaleDateString()}
          placeholder="Date"
          editable={false}
        />
      </View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          onChange={onChange}
        />
      )}
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
        selectedValue={fixed}
        onValueChange={(itemValue, itemIndex) => setFixed(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Is it a fixed monthly Expense?" value="" />
        <Picker.Item label="YES" value="YES" />
        <Picker.Item label="NO" value="NO" />
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
        <Button
          title="ADD EXPENSE"
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
            } else if (type.length == 0) {
              Alert.alert(
                "Type field is empty",
                "Please pick a Type for your expense"
              );
            } else if (fixed.length == 0) {
              Alert.alert(
                "Fixed field is empty",
                "Please select if your expense is recurring monthly or not"
              );
            } else if (categoryId.length == 0) {
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
                )}, in the ${categoryId} category?`,
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
                        type,
                        fixed,
                        categoryId
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
        <Text>---</Text>
        <Button title="CANCEL" onPress={handleCloseForm} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
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
