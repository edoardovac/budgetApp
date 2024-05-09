import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { TextInput, Text, FAB } from "react-native-paper";
import AddDialogs from "./AddDialogs";

export default function CategoryForm({
  db,
  handleCloseForm,
  handleOpenSnackBar,
  setSnackBarDialog,
}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [openAddDialog, setOpenAddDialog] = useState(false);

  const handleOpenAddDialog = () => {
    setOpenAddDialog(true);
  };

  const handleCloseAddDialog = () => {
    setOpenAddDialog(false);
  };

  return (
    <View style={styles.container}>
      <Text
        variant="headlineMedium"
        style={{ marginVertical: 8, textAlign: "center" }}
      >
        ADD A CATEGORY
      </Text>
      <TextInput
        label={"Category name"}
        style={styles.input}
        onChangeText={setName}
        value={name}
        //placeholder="Category Name"
        maxLength={50}
      />
      <TextInput
        label={"Category description"}
        style={styles.input}
        onChangeText={setDescription}
        value={description}
        placeholder="Description"
        maxLength={255}
      />
      <AddDialogs
        openDialog={openAddDialog}
        handleCloseDialog={handleCloseAddDialog}
        name={name}
        description={description}
        db={db}
        handleCloseForm={handleCloseForm}
        origin="category"
        handleOpenSnackBar={handleOpenSnackBar}
        setSnackBarDialog={setSnackBarDialog}
      />
      <View style={styles.fabContainer}>
        <FAB icon="cancel" label="Cancel" onPress={handleCloseForm} />
        <FAB
          icon={"check"}
          label="Add expense"
          onPress={() => {
            handleOpenAddDialog();
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 16,
  },
  input: {
    marginBottom: 8,
  },
  fabContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginVertical: 5,
  },
});
