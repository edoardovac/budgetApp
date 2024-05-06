import { View, StyleSheet, FlatList } from "react-native";
import {
  Text,
  ToggleButton,
  FAB,
  Portal,
  List,
  Divider,
  useTheme,
  IconButton,
  Dialog,
  Snackbar,
  ActivityIndicator,
} from "react-native-paper";
import { useState } from "react";

import { formatDate } from "./formatDate";
import { deleteExpenseById } from "../database/dbFunctions/deleteDbfunctions/deleteExpense";
import ExpenseForm from "./ExpenseForm";
import SearchBar from "./SearchBar";
import SearchExpenseForm from "./SearchExpenseForm";

export default function ExpenseList({ db, givenItem }) {
  const { item } = givenItem;

  // need to set style for each item, to have them less spread out
  if (givenItem) {
    return (
      <View>
        <List.Accordion
          title={`${item.name} - ${item.import.toFixed(2)} €`}
          titleStyle={{
            fontFamily: fonts.titleMedium.fontFamily,
            fontWeight: fonts.titleMedium.fontWeight,
          }}
        >
          <List.Item
            description={`Date: ${formatDate(item.date)}`}
            descriptionStyle={{
              fontFamily: fonts.bodyLarge.fontFamily,
              fontWeight: fonts.bodyLarge.fontWeight,
            }}
          />
          <Divider />
          <List.Item
            description={`${item.description}`}
            descriptionStyle={{
              fontFamily: fonts.bodyLarge.fontFamily,
              fontWeight: fonts.bodyLarge.fontWeight,
            }}
          />
          <Divider />
          <List.Item
            description={`Type of transaction: ${item.type}`}
            descriptionStyle={{
              fontFamily: fonts.bodyLarge.fontFamily,
              fontWeight: fonts.bodyLarge.fontWeight,
            }}
          />
          <Divider />
          <List.Item
            description={`Recurring? ${item.fixed}`}
            descriptionStyle={{
              fontFamily: fonts.bodyLarge.fontFamily,
              fontWeight: fonts.bodyLarge.fontWeight,
            }}
          />
          <List.Item
            description={`Category: ${item.categoryId}`}
            descriptionStyle={{
              fontFamily: fonts.bodyLarge.fontFamily,
              fontWeight: fonts.bodyLarge.fontWeight,
            }}
          />
          <Divider />
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <IconButton
              icon="trash-can-outline"
              onPress={() => {
                console.log("perdindirindina");
                handleOpenDeleteDialog();
              }}
            />
            <IconButton
              icon="lead-pencil"
              onPress={() => console.log("mazzi")}
            />
          </View>
        </List.Accordion>
        <Divider />
      </View>
    );
  } else {
    return <ActivityIndicator />;
  }
}

/*<Portal>
          <Dialog
            visible={openDeleteDialog}
            onDismiss={handleCloseDeleteDialog()}
          >
            <Dialog.Title>{`Delete ${item.name}?`}</Dialog.Title>
            <Dialog.Content>
              <Text variant="bodyLarge">{`Delete expense ${
                item.name
              }, ${item.import.toFixed(2)}€ on ${formatDate(
                item.date
              )}?`}</Text>
            </Dialog.Content>
            <Dialog.Actions>
              <IconButton
                icon="cancel"
                onPress={() => setOpenDeleteDialog(false)}
              />
              <IconButton
                icon="check"
                onPress={() => {
                      // delete query, close dialog, make snackbar visible
                      deleteExpenseById(db, item.expenseId);
                      setOpenDeleteDialog(false);
                      setSnackBarOpen(true);
                    }}
                    />
                    </Dialog.Actions>
                  </Dialog>
                </Portal>
                */
