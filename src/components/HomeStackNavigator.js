import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./HomeScreen";
import Expenses from "./Expenses";
import Incomes from "./Incomes";

export default function HomeStackNavigator() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="Expenses" component={Expenses} />
      <Stack.Screen name="Incomes" component={Incomes} />
    </Stack.Navigator>
  );
}
