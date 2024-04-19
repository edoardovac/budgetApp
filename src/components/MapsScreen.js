import { View, Text, StyleSheet, Button } from "react-native";
import { StatusBar } from "expo-status-bar";

export default function MapsScreen() {
  return (
    <View style={styles.container}>
      <Text>This is the Maps Screen</Text>
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
