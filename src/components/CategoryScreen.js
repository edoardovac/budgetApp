import { View, Text, StyleSheet, Button, FlatList } from "react-native";
import { StatusBar } from "expo-status-bar";
import * as SQLite from "expo-sqlite";
import { selectAllCategory } from "../database/dbFunctions/selectDbFunctions/selectCategoryFunctions";
import { useEffect } from "react";
import { useState } from "react";

const db = SQLite.openDatabase("budgetdb.db");

export default function CategoryScreen() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    console.log("Fetching Categories...");
    selectAllCategory(db, setCategories);
  };

  return (
    <View style={styles.container}>
      <Text>This is the Category Screen</Text>
      <Button title="refresh" onPress={() => fetchCategories()} />
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
      <StatusBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "purple",
  },
});
