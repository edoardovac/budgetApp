import { View, Text, StyleSheet, Button, FlatList, Alert } from "react-native";
import { StatusBar } from "expo-status-bar";
import * as SQLite from "expo-sqlite";
import { selectAllCategory } from "../database/dbFunctions/selectDbFunctions/selectCategoryFunctions";
import { useEffect } from "react";
import { useState } from "react";
import CategoryForm from "./CategoryForm";
import { ListItem } from "@rneui/themed";
import { TouchableOpacity } from "react-native-gesture-handler";
import { deleteCategoryById } from "../database/dbFunctions/deleteDbfunctions/deleteCategory";

const db = SQLite.openDatabase("budgetdb.db");

export default function CategoryScreen() {
  const [categories, setCategories] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    console.log("Fetching Categories...");
    selectAllCategory(db, setCategories);
  };

  const handleOpenForm = () => {
    setOpen(true);
  };

  const handleCloseForm = () => {
    setOpen(false);
    fetchCategories();
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity>
      <ListItem
        bottomDivider
        onPress={() => {
          console.log(item.name);
          Alert.alert(`Delete ${item.name}?`, `Are you sure?`, [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel pressed"),
              style: "cancel",
            },
            {
              text: "DELETE",
              onPress: () => {
                console.log("DELETE PRESSED");
                deleteCategoryById(db, item.categoryId);
                fetchCategories();
              },
            },
          ]);
        }}
      >
        <ListItem.Content>
          <ListItem.Title>{item.name}</ListItem.Title>
          <ListItem.Subtitle>{item.description}</ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    </TouchableOpacity>
  );

  if (open === true) {
    return (
      <View>
        <Text>ADD A CATEGORY</Text>
        <CategoryForm db={db} handleCloseForm={handleCloseForm} />
        <Text>---</Text>
        <Button title="CANCEL" onPress={handleCloseForm} />
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <FlatList
          data={categories}
          renderItem={renderItem}
          keyExtractor={(item) => item.categoryId.toString()}
        />
        <Button title="New Category" onPress={handleOpenForm} />

        <StatusBar />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightgrey",
  },
});
