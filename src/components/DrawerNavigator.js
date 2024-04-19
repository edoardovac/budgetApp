import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "./HomeScreen";
import SettingScreen from "./SettingScreen";
import ChartsScreen from "./ChartsScreen";
import MapsScreen from "./MapsScreen";

export default function drawerNavigator() {
  const Drawer = createDrawerNavigator();

  return (
    <Drawer.Navigator
    /*screenOptions={{
        drawerStyle: {
          backgroundColor: "black",
        },
      }}*/
    >
      <Drawer.Screen name="Home Screen (DRAWER)" component={HomeScreen} />
      <Drawer.Screen name="Charts (DRAWER)" component={ChartsScreen} />
      <Drawer.Screen name="Maps (DRAWER)" component={MapsScreen} />
      <Drawer.Screen name="Settings (DRAWER)" component={SettingScreen} />
    </Drawer.Navigator>
  );
}
