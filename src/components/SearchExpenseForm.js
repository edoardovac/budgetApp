import { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { selectAllExpense } from "../database/dbFunctions/selectDbFunctions/selectExpenseFunctions";
import SearchBar from "./SearchBar";
import DateTimePicker from "@react-native-community/datetimepicker";
import { selectAllCategory } from "../database/dbFunctions/selectDbFunctions/selectCategoryFunctions";
import { formatDate, formatDateStringYYYYMMDD } from "./formatDate";
import { deleteExpenseById } from "../database/dbFunctions/deleteDbfunctions/deleteExpense";
import {
  FAB,
  Portal,
  TextInput,
  List,
  useTheme,
  Divider,
  Text,
  Snackbar,
} from "react-native-paper";
import DropDownPickers from "./DropDownPickers";
import DeleteDialogs from "./DeleteDialogs";

export default function SearchExpenseForm({ db, handleCloseForm }) {
  const [expenses, setExpenses] = useState([]);
  const [text, setText] = useState("");
  const [date, setDate] = useState(new Date());
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [flag, setFlag] = useState();
  const [categories, setCategories] = useState([]);
  const [openFab, setOpenFab] = useState(false);
  const [pickerFixedValue, setPickerFixedValue] = useState("");
  const [pickerTypeValue, setPickerTypeValue] = useState("");
  const [pickerCategoryValue, setPickerCategoryValue] = useState("");
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [snackBarDialog, setSnackBarDialog] = useState(
    "This is the snackbar dialog"
  );
  const [expenseDeleteItem, setExpenseDeleteItem] = useState();

  const { fonts } = useTheme();

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
    const typeMatch = !pickerTypeValue || expense.type === pickerTypeValue;
    const fixedMatch = !isSwitchOn || expense.fixed.includes("YES");
    const categoryMatch =
      !pickerCategoryValue || expense.categoryId === pickerCategoryValue;
    return nameMatch && dateMatch && typeMatch && fixedMatch && categoryMatch;
  });

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  // handles opening/closing of the fab.group
  const onStateChange = ({ open }) => setOpenFab(open);

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
    setPickerTypeValue("");
    setIsSwitchOn(false);
    setPickerCategoryValue("");
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
              setExpenseDeleteItem(item);
              handleCloseSnackBar();
              handleOpenDeleteDialog();
            }}
          />
          {1 == 2 && (
            <FAB
              icon="lead-pencil"
              label="Modify"
              onPress={() => console.log("mazzi")}
            />
          )}
        </View>
      </List.Accordion>
      <Divider />
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.filterContainer}>
        <SearchBar
          text={text}
          setText={setText}
          placeholder={"Search expense..."}
          status={isSwitchOn}
          onToggleSwitch={onToggleSwitch}
        />
      </View>
      <View style={styles.dateContainer}>
        <TextInput
          label={"Start date: "}
          style={styles.input}
          value={renderDateMessage("startDateInput")}
          editable={false}
          right={
            <TextInput.Icon
              icon="calendar"
              label="Select date"
              onPress={() => {
                setFlag("start");
                showDatepicker();
              }}
            />
          }
        />
        <TextInput
          label={"End date: "}
          style={styles.input}
          value={renderDateMessage("endDateInput")}
          editable={false}
          right={
            <TextInput.Icon
              icon="calendar"
              label="Select date"
              onPress={() => {
                setFlag("end");
                showDatepicker();
              }}
            />
          }
        />
      </View>
      {!openFab && (
        <DropDownPickers
          pickerTypeValue={pickerTypeValue}
          pickerFixedValue={pickerFixedValue}
          pickerCategoryValue={pickerCategoryValue}
          setPickerTypeValue={setPickerTypeValue}
          setPickerFixedValue={setPickerFixedValue}
          setPickerCategoryValue={setPickerCategoryValue}
          categories={categories}
          origin="income"
          fixed={false}
        />
      )}
      <FlatList
        data={searchedExpenses}
        renderItem={renderItem}
        keyExtractor={(item) => item.expenseId.toString()}
      />
      <Portal.Host>
        <Portal>
          <FAB.Group
            open={openFab}
            visible
            icon={openFab ? "menu-open" : "menu"}
            actions={[
              {
                icon: "filter-off",
                label: "Reset search",
                onPress: () => resetSearch(),
              },
              {
                icon: "arrow-left",
                label: "Go back",
                onPress: () => handleCloseForm(),
              },
            ]}
            onStateChange={onStateChange}
          />
        </Portal>
      </Portal.Host>
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
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          onChange={onChange}
        />
      )}
      {expenseDeleteItem && (
        <DeleteDialogs
          openDialog={openDeleteDialog}
          handleCloseDialog={handleCloseDeleteDialog}
          item={expenseDeleteItem}
          db={db}
          origin="expense"
          deleteItemById={deleteExpenseById}
          fetchItemsAndSum={fetchExpenses}
          setSnackBarDialog={setSnackBarDialog}
          handleOpenSnackBar={handleOpenSnackBar}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    marginTop: 10,
  },
  dateContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  filterContainer: {
    marginBottom: 8,
  },
  input: {
    marginBottom: 8,
  },
});
