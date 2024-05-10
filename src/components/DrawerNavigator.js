import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeNavigation from "./HomeNavigation";
import CategoryScreen from "./CategoryScreen";
import ChartsNavigation from "./ChartsNavigation";
import CalendarScreen from "./CalendarScreen";
import SettingScreen from "./SettingScreen";
import PaperDrawer from "./PaperDrawer";
import { useTheme } from "react-native-paper";

export default function drawerNavigator() {
  const { fonts, colors } = useTheme();
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
          color: colors.onSurfaceVariant,
          alignItems: "center",
        },
        headerStyle: { backgroundColor: colors.surfaceVariant },
      }}
    >
      <Drawer.Screen name="Home" component={HomeNavigation} />
      <Drawer.Screen name="Category" component={CategoryScreen} />
      <Drawer.Screen name="Charts" component={ChartsNavigation} />
      <Drawer.Screen name="Calendar" component={CalendarScreen} />
      <Drawer.Screen name="Settings" component={SettingScreen} />
    </Drawer.Navigator>
  );
}
