import * as SQLite from "expo-sqlite";
import { View, Text, StyleSheet, Switch } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Calendar } from "react-native-calendars";
import { useState, useEffect } from "react";
import { selectExpenseDate } from "../database/dbFunctions/selectDbFunctions/selectExpenseFunctions";
import { selectIncomeDate } from "../database/dbFunctions/selectDbFunctions/selectIncomeFunctions";

const db = SQLite.openDatabase("budgetdb.db");

export default function CalendarScreen() {
  const [expenseDates, setExpenseDates] = useState({});
  const [incomeDates, setIncomeDates] = useState({});
  const [expenseDatesFlag, setExpenseDatesFlag] = useState(false);
  const [incomeDatesFlag, setIncomeDatesFlag] = useState(false);
  const [calendarFlag, setCalendarFlag] = useState(false);

  useEffect(() => {
    fetchAllDates();
  }, []);

  const fetchExpenseDate = () => {
    selectExpenseDate(db, setExpenseDates);
  };

  const fetchIncomeDate = () => {
    selectIncomeDate(db, setIncomeDates);
  };

  const fetchAllDates = () => {
    fetchExpenseDate();
    fetchIncomeDate();
  };

  useEffect(() => {
    if (Object.keys(expenseDates).length > 0) {
      setExpenseDatesFlag(true);
    }
  }, [expenseDates]);

  useEffect(() => {
    if (Object.keys(incomeDates).length > 0) {
      setIncomeDatesFlag(true);
    }
  }, [incomeDates]);

  const renderExpenseCalendar = () => {
    if (expenseDatesFlag) {
      return (
        <View>
          <Text>EXPENSES</Text>
          <Calendar
            markingType={"multi-dot"}
            markedDates={expenseDates}
            onDayPress={(day) => {
              console.log("selected day", day.dateString);
            }}
          />
        </View>
      );
    }
  };

  const renderIncomeCalendar = () => {
    if (incomeDatesFlag) {
      return (
        <View>
          <Text>INCOMES</Text>
          <Calendar
            markingType={"multi-dot"}
            markedDates={incomeDates}
            onDayPress={(day) => {
              console.log("selected day", day.dateString);
            }}
          />
        </View>
      );
    }
  };

  const renderCalendar = () => {
    if (calendarFlag) {
      return renderIncomeCalendar();
    } else {
      return renderExpenseCalendar();
    }
  };

  const switchCalendar = () => {
    setCalendarFlag(!calendarFlag);
  };

  return (
    <View style={styles.container}>
      {renderCalendar()}
      <View style={styles.switchContainer}>
        <Text>EXPENSES</Text>
        <Switch
          value={calendarFlag}
          onValueChange={switchCalendar}
          style={styles.switch}
        />
        <Text>INCOMES</Text>
      </View>
      <StatusBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "yellow",
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  switch: {
    marginLeft: 10,
  },
});
