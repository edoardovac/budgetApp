import DropDownPicker from "react-native-dropdown-picker";
import { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { useTheme } from "react-native-paper";

export function DropDownPickers({
  pickerTypeValue,
  pickerFixedValue,
  pickerCategoryValue,
  setPickerTypeValue,
  setPickerFixedValue,
  setPickerCategoryValue,
  categories,
  origin,
}) {
  const [openPickerType, setOpenPickerType] = useState(false);
  const [openPickerFixed, setOpenPickerFixed] = useState(false);
  const [openPickerCategory, setOpenPickerCategory] = useState(false);
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
  const [pickerItemsFixed, setPickerItemsFixed] = useState([
    { label: "Yes", value: "YES" },
    { label: "No", value: "NO" },
  ]);
  const [pickerItemsCategory, setPickerItemsCategory] = useState([]);
  const [zIndexTypePicker, setZIndexTypePicker] = useState(3000);
  const [zIndexFixedPicker, setZIndexFixedPicker] = useState(2000);
  const [zIndexCategoryPicker, setZIndexCategoryPicker] = useState(2000);

  const { fonts } = useTheme();

  useEffect(() => {
    setPickerItemsCategory(correctCategoryItems);
  }, [categories]);

  const correctCategoryItems = () =>
    categories.map((category) => ({
      label: category.name,
      value: category.categoryId,
    }));

  const handleZIndexPickers = () => {
    if (openPickerType) {
      setZIndexTypePicker(3000);
      setZIndexFixedPicker(2000);
      setZIndexCategoryPicker(2000);
    } else if (openPickerFixed) {
      setZIndexTypePicker(2000);
      setZIndexFixedPicker(3000);
      setZIndexCategoryPicker(2000);
    } else if (openPickerCategory) {
      setZIndexFixedPicker(2000);
      setZIndexTypePicker(2000);
      setZIndexCategoryPicker(3000);
    }
  };

  const styles = StyleSheet.create({
    container: {
      marginBottom: 8,
    },
    text: {
      fontFamily: fonts.bodyLarge.fontFamily,
      fontWeight: fonts.bodyLarge.fontWeight,
      paddingHorizontal: 16,
    },
    textInput: {
      fontFamily: fonts.titleLarge.fontFamily,
      fontWeight: fonts.titleLarge.fontWeight,
    },
  });

  return (
    <View>
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
        textStyle={styles.text}
        placeholder="Select type of transaction"
        placeholderStyle={styles.text}
        searchable={true}
        searchTextInputProps={{
          maxLength: 25,
        }}
        searchPlaceholder="Search..."
        searchTextInputStyle={styles.textInput}
        style={styles.container}
      />
      <DropDownPicker
        open={openPickerFixed}
        value={pickerFixedValue}
        items={pickerItemsFixed}
        setOpen={setOpenPickerFixed}
        setValue={setPickerFixedValue}
        setItems={setPickerItemsFixed}
        zIndex={zIndexFixedPicker}
        onOpen={() => {
          setOpenPickerType(false);
          setOpenPickerCategory(false);
          handleZIndexPickers();
        }}
        textStyle={styles.text}
        placeholder={`Is it a recurring ${origin}?`}
        placeholderStyle={styles.text}
        style={styles.container}
      />
      <DropDownPicker
        open={openPickerCategory}
        value={pickerCategoryValue}
        items={pickerItemsCategory}
        setOpen={setOpenPickerCategory}
        setValue={setPickerCategoryValue}
        setItems={setPickerItemsCategory}
        zIndex={zIndexCategoryPicker}
        onOpen={() => {
          setOpenPickerType(false);
          setOpenPickerFixed(false);
          handleZIndexPickers();
        }}
        textStyle={styles.text}
        placeholder="Select a category"
        placeholderStyle={styles.text}
        searchable={true}
        searchTextInputProps={{
          maxLength: 25,
        }}
        searchPlaceholder="Search..."
        searchTextInputStyle={styles.textInput}
        style={styles.container}
      />
    </View>
  );
}
