import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "./HomeScreen";
import SettingScreen from "./SettingScreen";
import ChartsScreen from "./ChartsScreen";
import MapsScreen from "./MapsScreen";
import CategoryScreen from "./CategoryScreen";

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
      <Drawer.Screen
        name="Home Screen (DRAWER)"
        component={HomeScreen}
        // icon not showing for some reason
        /*options={{
          title: "Home (DRAWER)",
          drawerIcon: () => {
            <Icon name="home" color="#ff0000" size={30} />;
          },
        }}*/
      />
      <Drawer.Screen name="Charts (DRAWER)" component={ChartsScreen} />
      <Drawer.Screen name="Category (DRAWER)" component={CategoryScreen} />
      <Drawer.Screen name="Maps (DRAWER)" component={MapsScreen} />
      <Drawer.Screen name="Settings (DRAWER)" component={SettingScreen} />
    </Drawer.Navigator>
  );
}
