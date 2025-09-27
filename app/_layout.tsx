import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { Platform, Text, View } from "react-native";
import { ErrorBoundary } from "./error-boundary";

export const unstable_settings = {
  initialRouteName: "index",
};

export default function RootLayout() {
  const [isReady, setIsReady] = useState(Platform.OS === 'web');

  useEffect(() => {
    if (Platform.OS !== 'web') {
      // For mobile platforms, wait a bit then set ready
      const timer = setTimeout(() => {
        setIsReady(true);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, []);

  if (!isReady) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
        <Text style={{ fontSize: 16, color: '#333' }}>Loading...</Text>
      </View>
    );
  }

  return (
    <ErrorBoundary>
      <RootLayoutNav />
    </ErrorBoundary>
  );
}

function RootLayoutNav() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="results" />
    </Stack>
  );
}