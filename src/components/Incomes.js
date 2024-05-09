import { View, StyleSheet, FlatList } from "react-native";
import { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  selectAllIncomeByMonth,
  selectIncomeSumByMonth,
  selectIncomesSumFixed,
} from "../database/dbFunctions/selectDbFunctions/selectIncomeFunctions";
import { formatDate } from "./formatDate";
import IncomeForm from "./IncomeForm";
import SearchBar from "./SearchBar";
import SearchIncomeForm from "./SearchIncomeForm";
import {
  FAB,
  Text,
  List,
  Portal,
  Divider,
  useTheme,
  Snackbar,
} from "react-native-paper";
import DeleteDialogs from "./DeleteDialogs";
import { deleteIncomeById } from "../database/dbFunctions/deleteDbfunctions/deleteIncome";

export default function Incomes({ db }) {
  const [incomesMonth, setIncomesMonth] = useState([]);
  const [incomesSum, setIncomesSum] = useState(0);
  const [incomesSumFixed, setIncomesSumFixed] = useState(0);
  const [openIncomeForm, setOpenIncomeForm] = useState(false);
  const [openSeachForm, setOpenSeachForm] = useState(false);
  const [text, setText] = useState("");
  const [openFab, setOpenFab] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [snackBarDialog, setSnackBarDialog] = useState(
    "This is the snackbar dialog"
  );
  const [incomeDeleteItem, setIncomeDeleteItem] = useState();
  const [isSwitchOn, setIsSwitchOn] = useState(false);

  const { fonts } = useTheme();

  useEffect(() => {
    fetchIncomesAndSum();
    setOpenIncomeForm(false);
    setOpenSeachForm(false);
  }, []);

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
    if (isSwitchOn) {
      return search && income.fixed.includes("YES");
    } else {
      return search;
    }
  });

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  // handles opening/closing of the fab.group
  const onStateChange = ({ open }) => setOpenFab(open);

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
        <View style={styles.fab}>
          <FAB
            icon="trash-can-outline"
            label="Delete"
            onPress={() => {
              console.log("perdindirindina");
              setIncomeDeleteItem(item);
              handleCloseSnackBar();
              handleOpenDeleteDialog();
            }}
          />
          <FAB
            icon="lead-pencil"
            label="Modify"
            onPress={() => console.log("mazzi")}
          />
        </View>
      </List.Accordion>
      <Divider />
    </View>
  );

  if (openIncomeForm === true) {
    return (
      <IncomeForm
        db={db}
        handleCloseForm={handleCloseIncomeForm}
        handleOpenSnackBar={handleOpenSnackBar}
        setSnackBarDialog={setSnackBarDialog}
      />
    );
  }
  if (openSeachForm) {
    return <SearchIncomeForm db={db} handleCloseForm={handleCloseSearchForm} />;
  }
  return (
    <View style={styles.container}>
      <Text variant="bodyLarge" style={{ marginTop: 8, textAlign: "center" }}>
        TOTAL INCOMES THIS MONTH: {incomesSum.toFixed(2)} €
      </Text>
      <Text variant="bodyLarge" style={{ textAlign: "center" }}>
        RECURRING INCOMES: {incomesSumFixed.toFixed(2)} €
      </Text>
      <View style={styles.filterContainer}>
        <SearchBar
          text={text}
          setText={setText}
          placeholder={"Search this month..."}
          status={isSwitchOn}
          onToggleSwitch={onToggleSwitch}
        />
      </View>
      <FlatList
        data={searchedIncomes}
        renderItem={renderItem}
        keyExtractor={(item) => item.incomeId.toString()}
      />
      <Portal.Host>
        <Portal>
          <FAB.Group
            open={openFab}
            visible
            icon={openFab ? "menu-open" : "menu"}
            actions={[
              {
                icon: "plus",
                label: "Add a new Income",
                onPress: handleOpenIncomeForm,
              },
              {
                icon: "magnify",
                label: "Search all",
                onPress: handleOpenSearchForm,
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
      {incomeDeleteItem && (
        <DeleteDialogs
          openDialog={openDeleteDialog}
          handleCloseDialog={handleCloseDeleteDialog}
          item={incomeDeleteItem}
          origin="income"
          db={db}
          deleteItemById={deleteIncomeById}
          fetchItemsAndSum={fetchIncomesAndSum}
          setSnackBarDialog={setSnackBarDialog}
          handleOpenSnackBar={handleOpenSnackBar}
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
  },
  filterContainer: {
    marginTop: 8,
    marginBottom: 2,
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  switch: {
    marginLeft: 10,
  },
  fab: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginVertical: 5,
  },
});
