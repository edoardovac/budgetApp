import { View, StyleSheet, Alert } from "react-native";
import { Text, TextInput, FAB } from "react-native-paper";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  selectExpenseSumByCategory,
  selectExpenseSumByCategoryGivenTime,
} from "../database/dbFunctions/selectDbFunctions/groupByCategory";
import { BarChart } from "react-native-gifted-charts";
import DateTimePicker from "@react-native-community/datetimepicker";
import { formatDate } from "./formatDate";

export default function ChartsExpense({ db }) {
  const [expenseSumByCategory, setExpenseSumByCategory] = useState([]);
  const [date, setDate] = useState(new Date());
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [flag, setFlag] = useState();
  const [expenseSumByCategoryTime, setExpenseSumByCategoryTime] = useState([]);

  useEffect(() => {
    fetchExpenseSumByCategory();
  }, []);

  const fetchExpenseSumByCategory = () => {
    selectExpenseSumByCategory(db, setExpenseSumByCategory);
  };

  const fetchExpenseSumByCategoryTime = () => {
    selectExpenseSumByCategoryGivenTime(
      db,
      setExpenseSumByCategory,
      startDate,
      endDate
    );
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

  return (
    <View style={styles.container}>
      <Text
        variant="headlineSmall"
        style={{ marginVertical: 8, textAlign: "center" }}
      >
        All Expenses By Category
      </Text>
      {expenseSumByCategory.length > 0 && (
        <View>
          <BarChart
            data={expenseSumByCategory}
            isAnimated
            onPress={pressedColumn}
          />
        </View>
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
            fetchExpenseSumByCategoryTime();
          }}
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
});
