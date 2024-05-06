import { Drawer } from "react-native-paper";
import { useState } from "react";

export default function PaperDrawer(props) {
  const { navigation } = props;
  const [active, setActive] = useState("");

  return (
    <Drawer.Section title="Menu">
      <Drawer.Item
        label="Home"
        icon="home"
        active={active === "home"}
        onPress={() => {
          setActive("home");
          navigation.navigate("Home");
        }}
      />
      <Drawer.Item
        label="Categories"
        icon="format-list-bulleted"
        active={active === "category"}
        onPress={() => {
          setActive("category");
          navigation.navigate("Category");
        }}
      />
      <Drawer.Item
        label="Charts"
        icon="chart-bar"
        active={active === "charts"}
        onPress={() => {
          setActive("charts");
          navigation.navigate("Charts");
        }}
      />
      <Drawer.Item
        label="Calendar"
        icon="calendar"
        active={active === "calendar"}
        onPress={() => {
          setActive("calendar");
          navigation.navigate("Calendar");
        }}
      />
      <Drawer.Item
        label="Settings"
        icon="wrench"
        active={active === "settings"}
        onPress={() => {
          setActive("settings");
          navigation.navigate("Settings");
        }}
      />
      <Drawer.Item
        label="Prova Testo"
        icon="wrench"
        active={active === "testo"}
        onPress={() => {
          setActive("testo");
          navigation.navigate("Prova Testo");
        }}
      />
    </Drawer.Section>
  );
}
