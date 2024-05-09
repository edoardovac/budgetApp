import { View } from "react-native";
import { Text } from "react-native-paper";
import { Calendar } from "react-native-calendars";
import { formatDateStringYYYYMMDDToString } from "./formatDate";

export const renderExpenseCalendar = (
  expenseDatesFlag,
  expenseDates,
  fonts,
  fetchExpenseGivenDay
) => {
  if (expenseDatesFlag) {
    return (
      <View>
        <Text
          variant="headlineMedium"
          style={{ marginTop: 8, textAlign: "center" }}
        >
          EXPENSES
        </Text>
        <Calendar
          markingType={"multi-dot"}
          markedDates={expenseDates}
          onDayPress={(day) => {
            console.log(day.dateString);
            fetchExpenseGivenDay(
              formatDateStringYYYYMMDDToString(day.dateString)
            );
          }}
          theme={{
            textMonthFontFamily: fonts.labelLarge.fontFamily,
            textDayFontFamily: fonts.bodyLarge.fontFamily,
          }}
        />
      </View>
    );
  }
};

export const renderIncomeCalendar = (
  incomeDatesFlag,
  incomeDates,
  fonts,
  fetchIncomeGivenDay
) => {
  if (incomeDatesFlag) {
    return (
      <View>
        <Text
          variant="headlineMedium"
          style={{ marginTop: 8, textAlign: "center" }}
        >
          INCOMES
        </Text>
        <Calendar
          markingType={"multi-dot"}
          markedDates={incomeDates}
          onDayPress={(day) => {
            console.log("selected day", day.dateString);
            fetchIncomeGivenDay(
              formatDateStringYYYYMMDDToString(day.dateString)
            );
          }}
          style={{
            fontFamily: fonts.titleMedium.fontFamily,
            fontWeight: fonts.titleMedium.fontWeight,
          }}
        />
      </View>
    );
  }
};
