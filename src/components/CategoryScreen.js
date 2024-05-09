import * as SQLite from "expo-sqlite";
import { View, StyleSheet, FlatList } from "react-native";
import {
  Text,
  FAB,
  Portal,
  List,
  Divider,
  useTheme,
  Snackbar,
} from "react-native-paper";
import { useState, useEffect, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { selectAllCategory } from "../database/dbFunctions/selectDbFunctions/selectCategoryFunctions";
import { deleteCategoryById } from "../database/dbFunctions/deleteDbfunctions/deleteCategory";
import CategoryForm from "./CategoryForm";
import SearchBar from "./SearchBar";
import DeleteDialogs from "./DeleteDialogs";

const db = SQLite.openDatabase("budgetdb.db");

export default function CategoryScreen() {
  const [categories, setCategories] = useState([]);
  const [openSeachForm, setOpenSeachForm] = useState(false);
  const [text, setText] = useState("");
  const [openFab, setOpenFab] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [snackBarDialog, setSnackBarDialog] = useState(
    "This is the snackbar dialog"
  );
  const [categoryDeleteItem, setCategoryDeleteItem] = useState();

  const { fonts } = useTheme();

  useEffect(() => {
    fetchCategories();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchCategories();
      setOpenSeachForm(false);
    }, [])
  );

  const fetchCategories = () => {
    selectAllCategory(db, setCategories);
  };

  const handleOpenCategoryForm = () => {
    setOpenSeachForm(true);
  };

  const handleCloseCategoryForm = () => {
    setOpenSeachForm(false);
    fetchCategories();
  };

  const searchedCategories = categories.filter((category) => {
    return category.name.toLowerCase().includes(text.toLowerCase());
  });

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
        title={`${item.name}`}
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
        <View style={styles.fab}>
          <FAB
            icon="trash-can-outline"
            label="Delete"
            onPress={() => {
              console.log("perdindirindina");
              setCategoryDeleteItem(item);
              handleCloseSnackBar();
              handleOpenDeleteDialog();
              console.log(categoryDeleteItem);
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

  if (openSeachForm) {
    return (
      <CategoryForm
        db={db}
        handleCloseForm={handleCloseCategoryForm}
        handleOpenSnackBar={handleOpenSnackBar}
        setSnackBarDialog={setSnackBarDialog}
      />
    );
  } else {
    return (
      <View style={styles.container}>
        <Text
          variant="headlineMedium"
          style={{ marginTop: 8, textAlign: "center" }}
        >
          MANAGE CATEGORIES
        </Text>
        <View style={styles.filterContainer}>
          <SearchBar
            text={text}
            setText={setText}
            placeholder={"Search this month..."}
            origin="category"
          />
        </View>
        <FlatList
          data={searchedCategories}
          renderItem={renderItem}
          keyExtractor={(item) => item.categoryId.toString()}
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
                  label: "Add a new Category",
                  onPress: handleOpenCategoryForm,
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
        {categoryDeleteItem && (
          <DeleteDialogs
            openDialog={openDeleteDialog}
            handleCloseDialog={handleCloseDeleteDialog}
            item={categoryDeleteItem}
            origin="category"
            db={db}
            deleteItemById={deleteCategoryById}
            fetchItemsAndSum={fetchCategories}
            setSnackBarDialog={setSnackBarDialog}
            handleOpenSnackBar={handleOpenSnackBar}
          />
        )}
        <StatusBar />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
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
