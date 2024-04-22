import "./polyfills";
import "./theme";

import { DarkTheme, NavigationContainer } from "@react-navigation/native";
import Mapbox from "@rnmapbox/maps";
import { useAssets } from "expo-asset";
import * as Linking from "expo-linking";
import * as SplashScreen from "expo-splash-screen";
import * as TaskManager from "expo-task-manager";
import { useEffect } from "react";
import { Alert } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useShallow } from "zustand/react/shallow";

import globalStyles from "./assets/styles/globalStyles";
import assetList from "./consts/assetList";
import MainNavigation from "./navigation/MainNavigation";
import useAuthStore from "./stores/useAuthStore";

SplashScreen.preventAutoHideAsync();

Mapbox.setAccessToken(process.env.EXPO_PUBLIC_MAPBOX_PUBLIC_TOKEN);

export default function App() {
  const { isReady, principal, getPrincipal, fetchKeyAndPrincipal, logout } =
    useAuthStore(
      useShallow((state) => ({
        isReady: state.isReady,
        principal: state.principal,
        getPrincipal: state.getPrincipal,
        fetchKeyAndPrincipal: state.fetchKeyAndPrincipal,
        logout: state.logout,
      }))
    );

  const [assets] = useAssets(assetList);

  useEffect(() => {
    const handleSetIdentity = async ({ url }) => {
      if (url && !principal) {
        const { queryParams } = Linking.parse(url);
        const delegation = queryParams.delegation;

        if (delegation) {
          getPrincipal(delegation);
          console.log("Done setting identity");
        }
      }
    };

    const subscription = Linking.addEventListener("url", handleSetIdentity);

    return () => {
      subscription.remove();
    };
  }, [principal]);

  useEffect(() => {
    (async () => {
      console.log("Fetching key and principal...");
      await fetchKeyAndPrincipal();

      console.log("Unregistering all tasks...");
      await TaskManager.unregisterAllTasksAsync();
    })();
  }, []);

  useEffect(() => {
    // Ask to logout after waiting in splash screen for 15 seconds
    const timer = setTimeout(() => {
      Alert.alert(
        "Error",
        "An error occurred while logging in. Please try again.",
        [
          {
            text: "OK",
            onPress: async () => {
              // Log out the previous user
              console.log("Logging out...");
              await logout();

              // Try to fetch key and principal again
              await fetchKeyAndPrincipal();
            },
          },
        ]
      );
    }, 15000);

    if (isReady && assets) {
      clearTimeout(timer);
    }

    return () => clearTimeout(timer);
  }, [assets, isReady]);

  if (!isReady || !assets) {
    return null;
  }

  return (
    <GestureHandlerRootView style={globalStyles.flexFull}>
      <NavigationContainer
        theme={DarkTheme}
        onReady={() => SplashScreen.hideAsync()}
      >
        <MainNavigation />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
