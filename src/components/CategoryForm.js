import { useState } from "react";
import { View, StyleSheet, TextInput, Button, Alert } from "react-native";
import { insertCategory } from "../database/dbFunctions/insertDbFunctions/insertCategory";

export default function CategoryForm({ db, handleCloseForm }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

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
          if (name.length > 0) {
            Alert.alert("", `Do you want to add ${name} to the list?`, [
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel",
              },
              {
                text: "ADD",
                onPress: () => {
                  insertCategory(name, description, db);
                  Alert.alert("Success", `${name} was added to the list`);
                  handleCloseForm();
                },
              },
            ]);
          } else {
            Alert.alert("Error", "Name field is empty");
          }
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
