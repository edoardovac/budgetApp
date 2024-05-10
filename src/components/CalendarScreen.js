import * as SQLite from "expo-sqlite";
import { View, StyleSheet, FlatList } from "react-native";
import {
  Text,
  List,
  Divider,
  SegmentedButtons,
  useTheme,
} from "react-native-paper";
import { StatusBar } from "expo-status-bar";
import { Calendar } from "react-native-calendars";
import { useState, useEffect } from "react";
import {
  selectExpenseDate,
  selectExpenseDay,
} from "../database/dbFunctions/selectDbFunctions/selectExpenseFunctions";
import {
  selectIncomeDate,
  selectIncomeDay,
} from "../database/dbFunctions/selectDbFunctions/selectIncomeFunctions";
import { formatDate, formatDateStringYYYYMMDDToString } from "./formatDate";

const db = SQLite.openDatabase("budgetdb.db");

export default function CalendarScreen() {
  const [expenseDates, setExpenseDates] = useState({});
  const [incomeDates, setIncomeDates] = useState({});
  const [expenseDatesFlag, setExpenseDatesFlag] = useState(false);
  const [incomeDatesFlag, setIncomeDatesFlag] = useState(false);
  const [calendarFlag, setCalendarFlag] = useState(false);
  const [expenseDateGiven, setExpenseDateGiven] = useState([]);
  const [incomeDateGiven, setIncomeDateGiven] = useState([]);
  const [segmentedValue, setSegmentedValue] = useState("expense");
  const [dateMessage, setDateMessage] = useState("No date selected");

  console.log(segmentedValue);

  const { fonts } = useTheme();

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

  const fetchExpenseGivenDay = (day) => {
    console.log(day);
    selectExpenseDay(db, setExpenseDateGiven, day);
    console.log("porca madonna");
  };

  const fetchIncomeGivenDay = (day) => {
    selectIncomeDay(db, setIncomeDateGiven, day);
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
          <Text variant="headlineMedium" style={{ textAlign: "center" }}>
            EXPENSES
          </Text>
          <Calendar
            markingType={"multi-dot"}
            markedDates={expenseDates}
            onDayPress={(day) => {
              console.log("selected day", day.dateString);
              setDateMessage(formatDateStringYYYYMMDDToString(day.dateString));
              fetchExpenseGivenDay(day.dateString);
            }}
            theme={{
              textDayFontFamily: fonts.bodyLarge.fontFamily,
              textMonthFontFamily: fonts.headlineLarge.fontFamily,
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
          <Text variant="headlineMedium" style={{ textAlign: "center" }}>
            INCOMES
          </Text>
          <Calendar
            markingType={"multi-dot"}
            markedDates={incomeDates}
            onDayPress={(day) => {
              console.log("selected day", day.dateString);
              setDateMessage(formatDateStringYYYYMMDDToString(day.dateString));
              fetchIncomeGivenDay(day.dateString);
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
      </List.Accordion>
      <Divider />
    </View>
  );

  return (
    <View style={styles.container}>
      {renderCalendar()}
      <Text
        variant="headlineSmall"
        style={{ marginTop: 8, textAlign: "center" }}
      >
        {dateMessage}
      </Text>
      <SegmentedButtons
        value={segmentedValue}
        onValueChange={setSegmentedValue}
        buttons={[
          {
            value: "expense",
            label: "Expenses",
            onPress: () => {
              setCalendarFlag(false);
              setIncomeDateGiven([]);
              setDateMessage("No date selected");
            },
            showSelectedCheck: true,
          },
          {
            value: "income",
            label: "Incomes",
            onPress: () => {
              setCalendarFlag(true);
              setExpenseDateGiven([]);
              setDateMessage("No date selected");
            },
            showSelectedCheck: true,
          },
        ]}
        style={{ marginTop: 8 }}
      />
      {!calendarFlag && (
        <FlatList
          data={expenseDateGiven}
          renderItem={renderItem}
          keyExtractor={(item) => item.expenseId.toString()}
        />
      )}
      {calendarFlag && (
        <FlatList
          data={incomeDateGiven}
          renderItem={renderItem}
          keyExtractor={(item) => item.incomeId.toString()}
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
    marginVertical: 8,
  },
  filterContainer: {
    marginVertical: 8,
  },
  fab: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginVertical: 5,
  },
});
