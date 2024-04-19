import { View, Text, StyleSheet, Button } from "react-native";
import { StatusBar } from "expo-status-bar";

export default function ChartsScreen() {
  return (
    <View style={styles.container}>
      <Text>This is the Charts Screen</Text>
      <StatusBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightblue",
  },
});
