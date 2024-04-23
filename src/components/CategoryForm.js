import { useState } from "react";
import { View, StyleSheet, TextInput, Button } from "react-native";
import { insertCategory } from "../database/dbFunctions/insertDbFunctions/insertCategory";

export default function CategoryForm({ db }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleAdd = () => {};

  return (
    <View>
      <TextInput
        style={styles.input}
        onChangeText={setName}
        value={name}
        placeholder="Category Name"
        maxLength={50}
      />
      <TextInput
        style={styles.input}
        onChangeText={setDescription}
        value={description}
        placeholder="Description"
        maxLength={255}
      />
      <Button
        title="ADD CATEGORY"
        onPress={() => {
          console.log("Pressed add category button ...");
          insertCategory(name, description, db);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
