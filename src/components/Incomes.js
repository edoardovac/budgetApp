import { View, Text, StyleSheet, FlatList } from "react-native";
import { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  selectAllIncomeByMonth,
  selectIncomeSumByMonth,
} from "../database/dbFunctions/selectDbFunctions/selectIncomeFunctions";

export default function Incomes({ route, navigation }) {
  const { db } = route.params;
  const [incomesMonth, setIncomesMonth] = useState([]);
  const [incomesSum, setIncomesSum] = useState(0);

  useEffect(() => {
    selectAllIncomeByMonth(db, setIncomesMonth);
    selectIncomeSumByMonth(db, setIncomesSum);
  }, []);

  return (
    <View style={styles.container}>
      <Text>TOTAL EXPENSES THIS MONTH: {incomesSum.toFixed(2)} €</Text>
      <Text>---</Text>
      <FlatList
        data={incomesMonth}
        renderItem={({ item }) => (
          <View>
            <Text>
              {item.incomeId} - {item.name} - {item.import.toFixed(2)} € - date:
              {item.date} {item.fixed}
            </Text>
          </View>
        )}
      />
      <StatusBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
