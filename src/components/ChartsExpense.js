import { View, StyleSheet, Alert } from "react-native";
import { Text, TextInput, FAB, Portal, Snackbar } from "react-native-paper";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  selectExpenseSumByCategoryGivenTime,
  selectExpenseSumByCategoryMonth,
} from "../database/dbFunctions/selectDbFunctions/groupByCategory";
import { BarChart } from "react-native-gifted-charts";
import DateTimePicker from "@react-native-community/datetimepicker";
import { formatDate, formatDateReverse } from "./formatDate";
import { currentDate } from "./currentDate";

export default function ChartsExpense({ db }) {
  const [expenseSumByCategory, setExpenseSumByCategory] = useState([]);
  const [date, setDate] = useState(new Date());
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [flag, setFlag] = useState();
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [snackBarDialog, setSnackBarDialog] = useState(
    "Filters have been reset"
  );
  const [headerText, setHeaderText] = useState("This Month");
  const [openFab, setOpenFab] = useState(false);

  useEffect(() => {
    fetchExpenseSumByCategory();
  }, []);

  const fetchExpenseSumByCategory = () => {
    selectExpenseSumByCategoryMonth(db, setExpenseSumByCategory);
  };

  const fetchExpenseSumByCategoryTime = () => {
    selectExpenseSumByCategoryGivenTime(
      db,
      setExpenseSumByCategory,
      startDate,
      endDate
    );
  };

  const handleOpenSnackBar = () => {
    setSnackBarOpen(true);
  };

  const handleCloseSnackBar = () => {
    setSnackBarOpen(false);
  };

  const pressedColumn = (item, index) => {
    console.log(item);
    Alert.alert("", `${item.label}: ${item.value} €`);
  };

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

  const handleResetFilterPress = () => {
    fetchExpenseSumByCategory();
    handleOpenSnackBar();
    setHeaderText("This month");
    setStartDate("");
    setEndDate("");
  };

  const handleApplyFilterPress = () => {
    fetchExpenseSumByCategoryTime();
    setHeaderText("Selected Period");
  };

  // handles opening/closing of the fab.group
  const onStateChange = ({ open }) => setOpenFab(open);

  return (
    <View style={styles.container}>
      <Text
        variant="headlineSmall"
        style={{ marginVertical: 8, textAlign: "center" }}
      >
        Expenses By Category
      </Text>
      <Text
        variant="titleMedium"
        style={{ marginVertical: 8, textAlign: "center" }}
      >
        {headerText}
      </Text>
      {expenseSumByCategory.length > 0 ? (
        <View>
          <BarChart
            data={expenseSumByCategory}
            isAnimated
            onPress={pressedColumn}
          />
        </View>
      ) : (
        <Text
          variant="bodyLarge"
          style={{ marginVertical: 20, textAlign: "center" }}
        >
          {`No data available between ${startDate} and ${endDate}`}
        </Text>
      )}
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
      <View style={styles.fabContainer}>
        <FAB
          icon={"filter"}
          label="Apply Filter"
          onPress={() => {
            handleApplyFilterPress();
          }}
        />
      </View>
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
      <Portal.Host>
        <Portal>
          <FAB.Group
            open={openFab}
            visible
            icon={openFab ? "menu-open" : "menu"}
            actions={[
              {
                icon: "filter-remove",
                label: "Reset Filters",
                onPress: handleResetFilterPress,
              },
            ]}
            onStateChange={onStateChange}
          />
        </Portal>
      </Portal.Host>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          onChange={onChange}
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
    marginTop: 10,
  },
  dateContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 8,
  },
  filterContainer: {
    marginBottom: 8,
  },
  input: {
    marginBottom: 8,
  },
  fabContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginVertical: 5,
  },
  text: {},
});
