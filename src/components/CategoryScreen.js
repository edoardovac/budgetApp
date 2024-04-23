import { View, Text, StyleSheet, Button, FlatList } from "react-native";
import { StatusBar } from "expo-status-bar";
import * as SQLite from "expo-sqlite";
import { selectAllCategory } from "../database/dbFunctions/selectDbFunctions/selectCategoryFunctions";
import { useEffect } from "react";
import { useState } from "react";
import CategoryForm from "./CategoryForm";

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

  if (open === true) {
    return (
      <View>
        <Text>Totally not a placeholder text</Text>
        <CategoryForm db={db} />
        <Text>---</Text>
        <Button title="CANCEL" onPress={() => handleCloseForm()} />
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Text>---</Text>
        <View>
          <FlatList
            data={categories}
            renderItem={({ item }) => (
              <View>
                <Text>
                  {item.categoryId} - {item.name}
                </Text>
                <Text>{item.description}</Text>
              </View>
            )}
            keyExtractor={(item) => item.categoryId.toString()}
          />
        </View>
        <Text>---</Text>
        <Button
          title="New Category"
          onPress={() => {
            handleOpenForm();
          }}
        />
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
