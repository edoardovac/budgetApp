import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { StatusBar } from "expo-status-bar";
import { formatDateStringYYYYMMDD } from "./formatDate";

export default function CalendarScreen() {
  return (
    <View style={styles.container}>
      <Text>This is the Calendar Screen</Text>
      <Text>{formatDateStringYYYYMMDD("2024-04-01").toISOString()}</Text>
      <StatusBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "yellow",
  },
});
