import { View, StyleSheet, Alert } from "react-native";
import {
  Text,
  TextInput,
  FAB,
  Portal,
  Snackbar,
  SegmentedButtons,
  useTheme,
} from "react-native-paper";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  selectExpenseSumByCategoryGivenTime,
  selectExpenseSumByCategoryMonth,
  selectExpenseSumByTypeGivenTime,
  selectExpenseSumByTypeMonth,
} from "../database/dbFunctions/selectDbFunctions/groupByCategory";
import { BarChart } from "react-native-gifted-charts";
import DateTimePicker from "@react-native-community/datetimepicker";
import { formatDate } from "./formatDate";

export default function ChartsExpense({ db }) {
  const [dataChart, setDataChart] = useState([]);
  const [date, setDate] = useState(new Date());
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [flag, setFlag] = useState();
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [snackBarDuration, setSnackBarDuration] = useState(3000);
  const [snackBarDialog, setSnackBarDialog] = useState(
    "Filters have been reset"
  );
  const [labelText, setLabelText] = useState("This Month");
  const [openFab, setOpenFab] = useState(false);
  const [segmentedValue, setSegmentedValue] = useState("Category");

  const { fonts, colors } = useTheme();

  useEffect(() => {
    fetchExpenseSumByCategory();
  }, []);

  const fetchExpenseSumByCategory = () => {
    selectExpenseSumByCategoryMonth(db, setDataChart);
  };

  const fetchExpenseSumByCategoryTime = () => {
    selectExpenseSumByCategoryGivenTime(db, setDataChart, startDate, endDate);
  };

  const fetchExpenseSumByType = () => {
    selectExpenseSumByTypeMonth(db, setDataChart);
  };

  const fetchExpenseSumByTypeTime = () => {
    selectExpenseSumByTypeGivenTime(db, setDataChart, startDate, endDate);
  };

  const handleOpenSnackBar = () => {
    setSnackBarOpen(true);
  };

  const handleCloseSnackBar = () => {
    setSnackBarOpen(false);
    setSnackBarDuration(3000);
  };

  const pressedColumn = (item, index) => {
    setSnackBarDuration(6000);
    setSnackBarDialog(`${item.label}: ${item.value} €`);
    handleOpenSnackBar();
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

  // reset filters
  const handleResetFilterPress = () => {
    if (segmentedValue == "Category") {
      fetchExpenseSumByCategory();
    } else if (segmentedValue == "Type") {
      fetchExpenseSumByType();
    }
    setSnackBarDialog("Filters have been reset");
    handleOpenSnackBar();
    setLabelText("This month");
    setStartDate("");
    setEndDate("");
  };

  // applies filters
  const handleApplyFilterPress = () => {
    if (segmentedValue == "Category") {
      fetchExpenseSumByCategoryTime();
    } else if (segmentedValue == "Type") {
      fetchExpenseSumByTypeTime();
    }
    setLabelText("Selected Period");
  };

  // handles opening/closing of the fab.group
  const onStateChange = ({ open }) => setOpenFab(open);

  return (
    <View style={styles.container}>
      <Text
        variant="headlineSmall"
        style={{ marginVertical: 8, textAlign: "center" }}
      >
        Expenses By {segmentedValue}
      </Text>
      <Text
        variant="titleMedium"
        style={{ marginVertical: 8, textAlign: "center" }}
      >
        {labelText}
      </Text>
      {dataChart.length > 0 ? (
        <View>
          <BarChart
            data={dataChart}
            isAnimated
            onPress={pressedColumn}
            xAxisLabelTextStyle={{
              fontFamily: fonts.bodyMedium.fontFamily,
              fontWeight: fonts.bodyMedium.fontWeight,
              color: colors.onBackground,
            }}
            yAxisTextStyle={{
              fontFamily: fonts.bodySmall.fontFamily,
              fontWeight: fonts.bodySmall.fontWeight,
              fontSize: fonts.bodySmall.fontSize,
              color: colors.onBackground,
            }}
            frontColor={colors.onPrimaryContainer}
            barStyle={{
              borderWidth: 1,
              borderColor: "black",
            }}
            backgroundColor={colors.primaryContainer}
          />
        </View>
      ) : (
        <Text
          variant="bodyLarge"
          style={{ marginVertical: 20, textAlign: "center" }}
        >
          {`No data available between ${"\n"}${formatDate(
            startDate
          )} and ${formatDate(endDate)}`}
        </Text>
      )}
      <SegmentedButtons
        value={segmentedValue}
        onValueChange={setSegmentedValue}
        buttons={[
          {
            value: "Category",
            label: "Category",
            onPress: () => {
              if (!startDate || !endDate) {
                handleCloseSnackBar();
                fetchExpenseSumByCategory();
                setStartDate("");
                setEndDate("");
              } else {
                handleCloseSnackBar();
                fetchExpenseSumByCategoryTime();
              }
            },
            showSelectedCheck: true,
          },
          {
            value: "Type",
            label: "Transaction type",
            onPress: () => {
              if (!startDate || !endDate) {
                handleCloseSnackBar();
                fetchExpenseSumByType();
                setStartDate("");
                setEndDate("");
              } else {
                handleCloseSnackBar();
                fetchExpenseSumByTypeTime();
              }
            },
            showSelectedCheck: true,
          },
        ]}
        style={{ marginTop: 8 }}
      />
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
          duration={snackBarDuration}
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
    marginTop: 8,
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
