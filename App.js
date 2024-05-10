import "react-native-gesture-handler";
import {
  NavigationContainer,
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme,
} from "@react-navigation/native";
import DrawerNavigator from "./src/components/DrawerNavigator";
import {
  ActivityIndicator,
  MD3LightTheme,
  MD3DarkTheme,
  PaperProvider,
  adaptNavigationTheme,
} from "react-native-paper";
import {
  useFonts,
  Podkova_400Regular,
  Podkova_500Medium,
  Podkova_600SemiBold,
  Podkova_700Bold,
  Podkova_800ExtraBold,
} from "@expo-google-fonts/podkova";

const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

const CombinedDefaultTheme = {
  ...MD3LightTheme,
  ...LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    ...LightTheme.colors,
  },
  fonts: {
    ...MD3LightTheme.fonts,
    displayLarge: {
      ...MD3LightTheme.fonts.displayLarge,
      fontFamily: "Podkova_800ExtraBold",
    },
    displayMedium: {
      ...MD3LightTheme.fonts.displayMedium,
      fontFamily: "Podkova_700Bold",
    },
    displaySmall: {
      ...MD3LightTheme.fonts.displaySmall,
      fontFamily: "Podkova_600SemiBold",
    },
    headlineLarge: {
      ...MD3LightTheme.fonts.headlineLarge,
      fontFamily: "Podkova_800ExtraBold",
    },
    headlineMedium: {
      ...MD3LightTheme.fonts.headlineMedium,
      fontFamily: "Podkova_700Bold",
    },
    headlineSmall: {
      ...MD3LightTheme.fonts.headlineSmall,
      fontFamily: "Podkova_600SemiBold",
    },
    titleLarge: {
      ...MD3LightTheme.fonts.titleLarge,
      fontFamily: "Podkova_800ExtraBold",
    },
    titleMedium: {
      ...MD3LightTheme.fonts.titleMedium,
      fontFamily: "Podkova_700Bold",
    },
    titleSmall: {
      ...MD3LightTheme.fonts.titleSmall,
      fontFamily: "Podkova_600SemiBold",
    },
    labelLarge: {
      ...MD3LightTheme.fonts.labelLarge,
      fontFamily: "Podkova_800ExtraBold",
    },
    labelMedium: {
      ...MD3LightTheme.fonts.labelMedium,
      fontFamily: "Podkova_700Bold",
    },
    labelSmall: {
      ...MD3LightTheme.fonts.labelSmall,
      fontFamily: "Podkova_600SemiBold",
    },
    bodyLarge: {
      ...MD3LightTheme.fonts.bodyLarge,
      fontFamily: "Podkova_500Medium",
    },
    bodyMedium: {
      ...MD3LightTheme.fonts.bodyMedium,
      fontFamily: "Podkova_400Regular",
    },
    bodySmall: {
      ...MD3LightTheme.fonts.bodySmall,
      fontFamily: "Podkova_400Regular",
    },
  },
};

const CombinedDarkTheme = {
  ...MD3DarkTheme,
  ...DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    ...DarkTheme.colors,
  },
  fonts: {
    ...MD3DarkTheme.fonts,
    displayLarge: {
      ...MD3DarkTheme.fonts.displayLarge,
      fontFamily: "Podkova_800ExtraBold",
    },
    displayMedium: {
      ...MD3DarkTheme.fonts.displayMedium,
      fontFamily: "Podkova_700Bold",
    },
    displaySmall: {
      ...MD3DarkTheme.fonts.displaySmall,
      fontFamily: "Podkova_600SemiBold",
    },
    headlineLarge: {
      ...MD3DarkTheme.fonts.headlineLarge,
      fontFamily: "Podkova_800ExtraBold",
    },
    headlineMedium: {
      ...MD3DarkTheme.fonts.headlineMedium,
      fontFamily: "Podkova_700Bold",
    },
    headlineSmall: {
      ...MD3DarkTheme.fonts.headlineSmall,
      fontFamily: "Podkova_600SemiBold",
    },
    titleLarge: {
      ...MD3LightTheme.fonts.titleLarge,
      fontFamily: "Podkova_800ExtraBold",
    },
    titleMedium: {
      ...MD3DarkTheme.fonts.titleMedium,
      fontFamily: "Podkova_700Bold",
    },
    titleSmall: {
      ...MD3DarkTheme.fonts.titleSmall,
      fontFamily: "Podkova_600SemiBold",
    },
    labelLarge: {
      ...MD3DarkTheme.fonts.labelLarge,
      fontFamily: "Podkova_800ExtraBold",
    },
    labelMedium: {
      ...MD3DarkTheme.fonts.labelMedium,
      fontFamily: "Podkova_700Bold",
    },
    labelSmall: {
      ...MD3DarkTheme.fonts.labelSmall,
      fontFamily: "Podkova_600SemiBold",
    },
    bodyLarge: {
      ...MD3DarkTheme.fonts.bodyLarge,
      fontFamily: "Podkova_500Medium",
    },
    bodyMedium: {
      ...MD3DarkTheme.fonts.bodyMedium,
      fontFamily: "Podkova_400Regular",
    },
    bodySmall: {
      ...MD3DarkTheme.fonts.bodySmall,
      fontFamily: "Podkova_400Regular",
    },
  },
};

export default function App() {
  // useFonts returns a boolean value
  let [fontsLoaded] = useFonts({
    Podkova_400Regular,
    Podkova_500Medium,
    Podkova_600SemiBold,
    Podkova_700Bold,
    Podkova_800ExtraBold,
  });

  if (!fontsLoaded) {
    return <ActivityIndicator animating={true} />;
  } else {
    /*
    return (
      <PaperProvider theme={CombinedDarkTheme}>
        <NavigationContainer theme={CombinedDarkTheme}>
          <DrawerNavigator />
        </NavigationContainer>
      </PaperProvider>
    );
       */
    // /*
    return (
      <PaperProvider theme={CombinedDefaultTheme}>
        <NavigationContainer theme={CombinedDefaultTheme}>
          <DrawerNavigator />
        </NavigationContainer>
      </PaperProvider>
    );
    // */
  }
}
