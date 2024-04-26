import { useRef, useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";

export default function SearchBar({ text, setText, placeholder }) {
  return (
    <View>
      <TextInput
        style={styles.input}
        onChangeText={(textInput) => setText(textInput)}
        value={text}
        placeholder={placeholder}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    marginBottom: 12,
    marginRight: 8,
    borderWidth: 1,
    padding: 10,
  },
});
