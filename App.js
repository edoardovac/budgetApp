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

const updatedMD3LightTheme = {
  ...MD3LightTheme,
  colors: {
    primary: "rgb(0, 99, 154)",
    onPrimary: "rgb(255, 255, 255)",
    primaryContainer: "rgb(206, 229, 255)",
    onPrimaryContainer: "rgb(0, 29, 50)",
    secondary: "rgb(0, 104, 116)",
    onSecondary: "rgb(255, 255, 255)",
    secondaryContainer: "rgb(151, 240, 255)",
    onSecondaryContainer: "rgb(0, 31, 36)",
    tertiary: "rgb(95, 98, 0)",
    onTertiary: "rgb(255, 255, 255)",
    tertiaryContainer: "rgb(229, 234, 93)",
    onTertiaryContainer: "rgb(28, 29, 0)",
    error: "rgb(186, 26, 26)",
    onError: "rgb(255, 255, 255)",
    errorContainer: "rgb(255, 218, 214)",
    onErrorContainer: "rgb(65, 0, 2)",
    background: "rgb(252, 252, 255)",
    onBackground: "rgb(26, 28, 30)",
    surface: "rgb(252, 252, 255)",
    onSurface: "rgb(26, 28, 30)",
    surfaceVariant: "rgb(222, 227, 235)",
    onSurfaceVariant: "rgb(66, 71, 78)",
    outline: "rgb(114, 119, 127)",
    outlineVariant: "rgb(194, 199, 207)",
    shadow: "rgb(0, 0, 0)",
    scrim: "rgb(0, 0, 0)",
    inverseSurface: "rgb(47, 48, 51)",
    inverseOnSurface: "rgb(240, 240, 244)",
    inversePrimary: "rgb(150, 204, 255)",
    elevation: {
      level0: "transparent",
      level1: "rgb(239, 244, 250)",
      level2: "rgb(232, 240, 247)",
      level3: "rgb(224, 235, 244)",
      level4: "rgb(222, 234, 243)",
      level5: "rgb(217, 231, 241)",
    },
    surfaceDisabled: "rgba(26, 28, 30, 0.12)",
    onSurfaceDisabled: "rgba(26, 28, 30, 0.38)",
    backdrop: "rgba(44, 49, 55, 0.4)",
  },
};

const CombinedDefaultTheme = {
  ...updatedMD3LightTheme,
  ...LightTheme,
  colors: {
    ...LightTheme.colors,
    ...updatedMD3LightTheme.colors,
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
/*
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
*/
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
