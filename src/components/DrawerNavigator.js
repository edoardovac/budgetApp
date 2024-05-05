import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeStackNavigator from "./HomeStackNavigator";
import SettingScreen from "./SettingScreen";
import ChartsScreen from "./ChartsScreen";
import CalendarScreen from "./CalendarScreen";
import CategoryScreen from "./CategoryScreen";
import PaperDrawer from "./PaperDrawer";

export default function drawerNavigator() {
  const Drawer = createDrawerNavigator();

  return (
    <Drawer.Navigator
      drawerContent={({ navigation }) => (
        <PaperDrawer navigation={navigation} />
      )}
    >
      <Drawer.Screen name="Home" component={HomeStackNavigator} />
      <Drawer.Screen name="Category" component={CategoryScreen} />
      <Drawer.Screen name="Charts" component={ChartsScreen} />
      <Drawer.Screen name="Calendar" component={CalendarScreen} />
      <Drawer.Screen name="Settings" component={SettingScreen} />
    </Drawer.Navigator>
  );
}
