import { Searchbar } from "react-native-paper";

export default function SearchBar({ text, setText, placeholder }) {
  return (
    <Searchbar placeholder={placeholder} onChangeText={setText} value={text} />
  );
}
