import { useColorScheme } from "@/hooks/use-color-scheme";
import {
    DarkTheme,
    DefaultTheme,
    ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import {
    SafeAreaProvider,
    useSafeAreaInsets,
} from "react-native-safe-area-context";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const insets = useSafeAreaInsets();
  const paddingHorizontal = 15;

  return (
    <SafeAreaProvider
      style={{
        backgroundColor: colorScheme === "dark" ? "#151718" : "#fff",
      }}
    >
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: {
              backgroundColor: colorScheme === "dark" ? "#151718" : "#fff",
            },
          }}
        >
          <Stack.Screen name="index" />
          <Stack.Screen name="pokemon/[id].tsx" />
        </Stack>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
