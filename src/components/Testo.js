import { View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";

export default function Testo() {
  const [openPickerFixed, setOpenPickerFixed] = useState(false);
  const [pickerFixedValue, setPickerFixedValue] = useState();
  const [pickerItemsFixed, setPickerItemsFixed] = useState([
    { label: "YES", value: "YES" },
    { label: "NO", value: "NO" },
  ]);

  const { fonts } = useTheme();

  return (
    <View>
      <DropDownPicker
        open={openPickerFixed}
        value={pickerFixedValue}
        items={pickerItemsFixed}
        setOpen={setOpenPickerFixed}
        setValue={setPickerFixedValue}
        setItems={setPickerItemsFixed}
        textStyle={{
          fontFamily: fonts.bodyLarge.fontFamily,
          fontWeight: fonts.bodyLarge.fontWeight,
        }}
        placeholder="CAZZI"
        placeholderStyle={{
          fontFamily: fonts.titleLarge.fontFamily,
          fontWeight: fonts.titleLarge.fontWeight,
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
      />
      <Text variant="displayLarge">Display Large</Text>
      <Text variant="displayMedium">Display Medium</Text>
      <Text variant="displaySmall">Display Small</Text>
      <Text variant="headlineLarge">Headline Large</Text>
      <Text variant="headlineMedium">Headline Medium</Text>
      <Text variant="headlineSmall">Headline Small</Text>
      <Text variant="titleLarge">Title Large</Text>
      <Text variant="titleMedium">Title Medium</Text>
      <Text variant="titleSmall">Title Small</Text>
      <Text variant="labelLarge">Label Large</Text>
      <Text variant="labelMedium">Label Medium</Text>
      <Text variant="labelSmall">Label Small</Text>
      <Text variant="bodyLarge">Body Large</Text>
      <Text variant="bodyMedium">Body Medium</Text>
      <Text variant="bodySmall">Body Small</Text>
    </View>
  );
}
