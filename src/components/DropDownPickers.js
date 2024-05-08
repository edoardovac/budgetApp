import DropDownPicker from "react-native-dropdown-picker";
import { useState } from "react";

export function DropDownPickerType() {
  const [pickerItemsType, setPickerItemsType] = useState([
    {
      label: "Cash",
      value: "CASH",
    },
    {
      label: "Debit Card",
      value: "DEBIT CARD",
    },
    {
      label: "Credit Card",
      value: "CREDIT CARD",
    },
    {
      label: "Check",
      value: "CHECK",
    },
    {
      label: "Wire Transfer",
      value: "WIRE TRANSFER",
    },
    {
      label: "Bank Transfer",
      value: "BANK TRANSFER",
    },
    {
      label: "Crypto",
      value: "CRYPTO",
    },
    {
      label: "Other",
      value: "OTHER",
    },
  ]);
  return (
    <DropDownPicker
      open={openPickerType}
      value={pickerTypeValue}
      items={pickerItemsType}
      setOpen={setOpenPickerType}
      setValue={setPickerTypeValue}
      setItems={setPickerItemsType}
      zIndex={zIndexTypePicker}
      onOpen={() => {
        setOpenPickerFixed(false);
        setOpenPickerCategory(false);
        handleZIndexPickers();
      }}
      textStyle={{
        fontFamily: fonts.bodyLarge.fontFamily,
        fontWeight: fonts.bodyLarge.fontWeight,
        paddingHorizontal: 16,
      }}
      placeholder="Select type of transaction"
      placeholderStyle={{
        fontFamily: fonts.bodyLarge.fontFamily,
        fontWeight: fonts.bodyLarge.fontWeight,
        paddingHorizontal: 16,
      }}
      searchable={true}
      searchTextInputProps={{
        maxLength: 25,
      }}
      searchPlaceholder="Search..."
      searchTextInputStyle={{
        fontFamily: fonts.titleLarge.fontFamily,
        fontWeight: fonts.titleLarge.fontWeight,
      }}
      style={{ marginBottom: 8 }}
    />
  );
}
