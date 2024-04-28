import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Alert,
  Button,
  Switch,
} from "react-native";
import { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import {
  selectAllIncomeByMonth,
  selectIncomeSumByMonth,
  selectIncomesSumFixed,
} from "../database/dbFunctions/selectDbFunctions/selectIncomeFunctions";
import { deleteIncomeById } from "../database/dbFunctions/deleteDbfunctions/deleteIncome";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ListItem } from "@rneui/themed";
import { formatDate } from "./formatDate";
import IncomeForm from "./IncomeForm";
import SearchBar from "./SearchBar";
import SearchIncomeForm from "./SearchIncomeForm";

export default function Incomes({ route, navigation }) {
  const { db } = route.params;
  const [incomesMonth, setIncomesMonth] = useState([]);
  const [incomesSum, setIncomesSum] = useState(0);
  const [incomesSumFixed, setIncomesSumFixed] = useState(0);
  const [openIncomeForm, setOpenIncomeForm] = useState(false);
  const [openSeachForm, setOpenSeachForm] = useState(false);
  const [text, setText] = useState("");
  const [fixedFilter, setFixedFilter] = useState(false);

  useFocusEffect(
    useCallback(() => {
      fetchIncomesAndSum();
      setOpenIncomeForm(false);
      setOpenSeachForm(false);
    }, [])
  );

  const fetchIncomesAndSum = () => {
    selectAllIncomeByMonth(db, setIncomesMonth);
    selectIncomeSumByMonth(db, setIncomesSum);
    selectIncomesSumFixed(db, setIncomesSumFixed);
  };

  const handleOpenIncomeForm = () => {
    setOpenIncomeForm(true);
  };

  const handleCloseIncomeForm = () => {
    setOpenIncomeForm(false);
    fetchIncomesAndSum();
  };

  const handleOpenSearchForm = () => {
    setOpenSeachForm(true);
  };

  const handleCloseSearchForm = () => {
    setOpenSeachForm(false);
  };

  const searchedIncomes = incomesMonth.filter((income) => {
    const search = income.name.toLowerCase().includes(text.toLowerCase());
    if (fixedFilter) {
      return search && income.fixed.includes("YES");
    } else {
      return search;
    }
  });

  const switchFixedFilter = () => {
    setFixedFilter(!fixedFilter);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity>
      <ListItem
        bottomDivider
        onPress={() => {
          console.log(`${item.name}, id: ${item.incomeId}`);
          Alert.alert(
            `Delete ${item.name}?`,
            `Delete income ${item.name}, ${item.import.toFixed(
              2
            )}€ on ${formatDate(item.date)}`,
            [
              {
                text: "Cancel",
                onPress: () => console.log("Cancel pressed"),
                style: "cancel",
              },
              {
                text: "DELETE",
                onPress: () => {
                  console.log("DELETE PRESSED");
                  deleteIncomeById(db, item.incomeId);
                  fetchIncomesAndSum();
                },
              },
            ]
          );
        }}
      >
        <ListItem.Content>
          <ListItem.Title>
            {item.name} - {item.import.toFixed(2)} €
          </ListItem.Title>
          <ListItem.Subtitle>
            {formatDate(item.date)} fixed? {item.fixed}
          </ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    </TouchableOpacity>
  );

  if (openIncomeForm === true) {
    return <IncomeForm db={db} handleCloseForm={handleCloseIncomeForm} />;
  }
  if (openSeachForm) {
    return <SearchIncomeForm db={db} handleCloseForm={handleCloseSearchForm} />;
  }
  return (
    <View style={styles.container}>
      <Text>TOTAL INCOMES THIS MONTH: {incomesSum.toFixed(2)} €</Text>
      <Text> FIXED INCOMES: {incomesSumFixed.toFixed(2)} €</Text>
      <Text>---</Text>
      <FlatList
        data={searchedIncomes}
        renderItem={renderItem}
        keyExtractor={(item) => item.incomeId.toString()}
        ListHeaderComponent={
          <View style={styles.filterContainer}>
            <SearchBar
              text={text}
              setText={setText}
              placeholder={"Search this month..."}
              style={{ flex: 1 }}
            />
            <View style={styles.switchContainer}>
              <Text>Fixed?</Text>
              <Switch
                value={fixedFilter}
                onValueChange={switchFixedFilter}
                style={styles.switch}
              />
            </View>
          </View>
        }
      />
      <Button title="Search all" onPress={handleOpenSearchForm} />
      <Button title="New Income" onPress={handleOpenIncomeForm} />
      <StatusBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  filterContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  switch: {
    marginLeft: 10,
  },
});
