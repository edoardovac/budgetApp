import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeStackNavigator from "./HomeStackNavigator";
import SettingScreen from "./SettingScreen";
import ChartsScreen from "./ChartsScreen";
import CalendarScreen from "./CalendarScreen";
import CategoryScreen from "./CategoryScreen";
import PaperDrawer from "./PaperDrawer";
import { useTheme } from "@react-navigation/native";
import Testo from "./Testo";
import HomeNavigation from "./HomeNavigation";

export default function drawerNavigator() {
  const { fonts } = useTheme();
  const Drawer = createDrawerNavigator();

  return (
    <Drawer.Navigator
      drawerContent={({ navigation }) => (
        <PaperDrawer navigation={navigation} />
      )}
      screenOptions={{
        headerTitleStyle: {
          fontFamily: fonts.titleMedium.fontFamily,
          fontWeight: fonts.titleMedium.fontWeight,
        },
      }}
    >
      <Drawer.Screen name="Home" component={HomeStackNavigator} />
      <Drawer.Screen name="Category" component={CategoryScreen} />
      <Drawer.Screen name="Charts" component={ChartsScreen} />
      <Drawer.Screen name="Calendar" component={CalendarScreen} />
      <Drawer.Screen name="Settings" component={SettingScreen} />
      <Drawer.Screen name="Prova Testo" component={Testo} />
      <Drawer.Screen name="Bottom" component={HomeNavigation} />
    </Drawer.Navigator>
  );
}
