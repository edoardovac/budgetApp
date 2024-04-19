import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import StackNavigator from "./StackNavigator";
import ChartsScreen from "./ChartsScreen";

// tab navigator is the bar at the bottom

// this is used for the charts navigation, NEEDS TO BE CHANGED

export default function TabNavigator() {
  // creates the Tab navigator
  const Tab = createBottomTabNavigator();

  // redorects and names are WRONG
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={StackNavigator} />
      <Tab.Screen name="Settings" component={StackNavigator} />
      <Tab.Screen name="Charts" component={ChartsScreen} />
    </Tab.Navigator>
  );
}
