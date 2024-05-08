import { Portal, Dialog, Text, IconButton } from "react-native-paper";
import { formatDate } from "./formatDate";

export default function DeleteDialogs({
  openDialog,
  handleCloseDialog,
  item,
  origin,
  db,
  deleteItemById,
  fetchItemsAndSum,
  setSnackBarDialog,
  handleOpenSnackBar,
}) {
  return (
    <Portal>
      <Dialog visible={openDialog} onDismiss={() => handleCloseDialog()}>
        <Dialog.Title>{`Delete ${item.name}?`}</Dialog.Title>
        <Dialog.Content>
          <Text variant="bodyLarge">{`Delete ${origin} ${
            item.name
          }, ${item.import.toFixed(2)}€ on ${formatDate(item.date)}?`}</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <IconButton icon="cancel" onPress={() => handleCloseDialog()} />
          <IconButton
            icon="check"
            onPress={() => {
              // delete query, close dialog, make snackbar visible
              deleteItemById(db, item.expenseId);
              fetchItemsAndSum();
              handleCloseDialog();
              setSnackBarDialog(`"${item.name}" deleted`);
              handleOpenSnackBar();
            }}
          />
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}
