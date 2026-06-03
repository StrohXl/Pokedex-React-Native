import { useColorScheme } from "@/hooks/use-color-scheme";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  return (
    <SafeAreaProvider
      style={{
        backgroundColor: colorScheme === "dark" ? "#151718" : "#ddd",
      }}
    >
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: {
              backgroundColor: colorScheme === "dark" ? "#151718" : "#ddd",
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
