import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./HomeScreen";
import SettingScreen from "./SettingScreen";

// stack navigator is the buttons one
// it remembers stuff
// is used for managing expense and income (?)

export default function HomeStackNavigator() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
    /*
      screenOptions={{
        headerStyle: {
        // header background color
          backgroundColor: "red",
        },
        // header text color
        headerTintColor: "black",
        // header text style
        headerTitleStyle: {
        },
      }}
    */
    >
      <Stack.Screen
        name="Screen1"
        component={HomeScreen}
        options={{
          title: "Home",
        }}
      />
      <Stack.Screen name="Screen2" component={SettingScreen} />
    </Stack.Navigator>
  );
}
