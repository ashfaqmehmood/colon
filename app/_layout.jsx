import React, { useEffect, useCallback, useState } from "react";
import { useFonts } from "expo-font";
import { SplashScreen, Stack, useRouter, useSegments } from "expo-router";
import { useAuthStore } from "../lib/store";
import AppLoader from "../components/AnimatedLoader";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  const { initialize, isLoading, isInitialized, isLoggedIn } = useAuthStore();
  const [appReady, setAppReady] = useState(false);

  const router = useRouter();
  const segments = useSegments();

  const handleNavigation = useCallback(() => {
    const inAuthGroup = segments[0] === "(authenticated)";

    if (isLoggedIn && !inAuthGroup) {
      router.replace("/(authenticated)/(tabs)/home");
    } else if (!isLoggedIn && inAuthGroup) {
      router.replace("");
    }
  }, [isLoggedIn, segments, router]);

  useEffect(() => {
    if (!isInitialized) {
      initialize();
    }
  }, [isInitialized, initialize]);

  useEffect(() => {
    if (fontsLoaded && !isLoading && isInitialized) {
      SplashScreen.hideAsync().then(() => {
        handleNavigation();
        setAppReady(true);
      });
    }
  }, [fontsLoaded, isLoading, isInitialized, handleNavigation]);

  if (!fontsLoaded || isLoading || !isInitialized) {
    return null;
  }

  return (
    <AppLoader isLoading={!appReady}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen
          name="(authenticated)/(tabs)"
          options={{ headerShown: false }}
        />
      </Stack>
    </AppLoader>
  );
}
