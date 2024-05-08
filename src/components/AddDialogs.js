import { Portal, Dialog, Text, IconButton } from "react-native-paper";
import { formatDate } from "./formatDate";
import { insertExpense } from "../database/dbFunctions/insertDbFunctions/insertExpense";
import { insertIncome } from "../database/dbFunctions/insertDbFunctions/insertIncome";

export default function AddDialogs({
  openDialog,
  handleCloseDialog,
  name,
  description,
  givenImport,
  date,
  pickerTypeValue,
  pickerFixedValue,
  pickerCategoryValue,
  db,
  handleCloseForm,
  origin,
  handleOpenSnackBar,
  setSnackBarDialog,
}) {
  const insertFunction = () => {
    if (origin == "expense") {
      insertExpense(
        db,
        name,
        description,
        givenImport,
        date,
        pickerTypeValue,
        pickerFixedValue,
        pickerCategoryValue
      );
    } else if (origin == "income") {
      insertIncome(
        db,
        name,
        description,
        givenImport,
        date,
        pickerTypeValue,
        pickerFixedValue,
        pickerCategoryValue
      );
    }
  };

  const dialogActionsError = () => (
    <Dialog.Actions>
      <IconButton icon="check" onPress={() => handleCloseDialog()} />
    </Dialog.Actions>
  );

  const dialogActionConfirm = () => (
    <Dialog.Actions>
      <IconButton icon="cancel" onPress={() => handleCloseDialog()} />
      <IconButton
        icon="check"
        onPress={() => {
          console.log("ADD");
          insertFunction();
          setSnackBarDialog(`"${name}" added`);
          handleOpenSnackBar();
          handleCloseDialog();
          handleCloseForm();
        }}
      />
    </Dialog.Actions>
  );

  if (name.length == 0) {
    return (
      <Portal>
        <Dialog visible={openDialog} onDismiss={() => handleCloseDialog()}>
          <Dialog.Title>{`Name field is empty`}</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyLarge">Please complete the Name field</Text>
          </Dialog.Content>
          {dialogActionsError()}
        </Dialog>
      </Portal>
    );
  } else if (description.length > 255) {
    return (
      <Portal>
        <Dialog visible={openDialog} onDismiss={() => handleCloseDialog()}>
          <Dialog.Title>{`Description field is too long`}</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyLarge">Please modify the description field</Text>
          </Dialog.Content>
          {dialogActionsError()}
        </Dialog>
      </Portal>
    );
  } else if (givenImport.length == 0) {
    return (
      <Portal>
        <Dialog visible={openDialog} onDismiss={() => handleCloseDialog()}>
          <Dialog.Title>{`Import field is empty`}</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyLarge">Please complete the import field</Text>
          </Dialog.Content>
          {dialogActionsError()}
        </Dialog>
      </Portal>
    );
  } else if (pickerTypeValue.length == 0) {
    return (
      <Portal>
        <Dialog visible={openDialog} onDismiss={() => handleCloseDialog()}>
          <Dialog.Title>{`Type field is empty`}</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyLarge">
              Please pick a Type for your {origin}
            </Text>
          </Dialog.Content>
          {dialogActionsError()}
        </Dialog>
      </Portal>
    );
  } else if (pickerFixedValue.length == 0) {
    return (
      <Portal>
        <Dialog visible={openDialog} onDismiss={() => handleCloseDialog()}>
          <Dialog.Title>{`Recurring field is empty`}</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyLarge">
              Please select if your {origin} is recurring monthly or not
            </Text>
          </Dialog.Content>
          {dialogActionsError()}
        </Dialog>
      </Portal>
    );
  } else if (pickerCategoryValue.length == 0) {
    return (
      <Portal>
        <Dialog visible={openDialog} onDismiss={() => handleCloseDialog()}>
          <Dialog.Title>{`Category field is empty`}</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyLarge">
              Please pick a Category for your {origin}
            </Text>
          </Dialog.Content>
          {dialogActionsError()}
        </Dialog>
      </Portal>
    );
  } else {
    return (
      <Portal>
        <Dialog visible={openDialog} onDismiss={() => handleCloseDialog()}>
          <Dialog.Title>{`Add ${origin}?`}</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyLarge">
              {`Do you want to add the ${origin} ${name} ${parseFloat(
                givenImport
              ).toFixed(2)} €, on ${formatDate(
                date
              )}, in the ${pickerCategoryValue} category?`}
            </Text>
          </Dialog.Content>
          {dialogActionConfirm()}
        </Dialog>
      </Portal>
    );
  }
}
