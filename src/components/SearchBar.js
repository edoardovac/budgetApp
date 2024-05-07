import { Searchbar, Text, Switch } from "react-native-paper";
import { View } from "react-native";

export default function SearchBar({
  text,
  setText,
  placeholder,
  status,
  onToggleSwitch,
  origin,
}) {
  return (
    <Searchbar
      mode="bar"
      placeholder={placeholder}
      onChangeText={setText}
      value={text}
      right={() =>
        origin != "category" && (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              padding: 4,
            }}
          >
            <Text variant="labelMedium">Recurring?</Text>
            <Switch value={status} onValueChange={onToggleSwitch} />
          </View>
        )
      }
    />
  );
}
