import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./HomeScreen";
import Expenses from "./Expenses";
import Incomes from "./Incomes";
import { useTheme } from "@react-navigation/native";

export default function HomeStackNavigator() {
  const { fonts } = useTheme();
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Expenses"
        component={Expenses}
        options={{
          headerTitleStyle: {
            fontFamily: fonts.titleMedium.fontFamily,
            fontWeight: fonts.titleMedium.fontWeight,
          },
        }}
      />
      <Stack.Screen
        name="Incomes"
        component={Incomes}
        options={{
          headerTitleStyle: {
            fontFamily: fonts.titleMedium.fontFamily,
            fontWeight: fonts.titleMedium.fontWeight,
          },
        }}
      />
    </Stack.Navigator>
  );
}
