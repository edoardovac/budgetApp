import { useState } from "react";
import HomeScreen from "./HomeScreen";
import { BottomNavigation } from "react-native-paper";
import Testo from "./Testo";

export default function HomeNavigation() {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {
      key: "home",
      title: "Home",
      focusedIcon: "home",
      unfocusedIcon: "home-outline",
    },
    {
      key: "testo",
      title: "Testo",
      focusedIcon: "shopping",
      unfocusedIcon: "shopping-outline",
    },
  ]);

  const HomeRoute = () => <HomeScreen />;
  const TestoRoute = () => <Testo />;

  const renderScene = BottomNavigation.SceneMap({
    home: HomeRoute,
    //expense: ExpenseRoute,
    testo: TestoRoute,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
}
