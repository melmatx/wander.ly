import "./polyfills";
import "./theme";

import { DarkTheme, NavigationContainer } from "@react-navigation/native";
import Mapbox from "@rnmapbox/maps";
import { useAssets } from "expo-asset";
import * as Linking from "expo-linking";
import * as SplashScreen from "expo-splash-screen";
import * as TaskManager from "expo-task-manager";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useShallow } from "zustand/react/shallow";

import globalStyles from "./assets/styles/globalStyles";
import assetList from "./consts/assetList";
import MainNavigation from "./navigation/MainNavigation";
import useAuthStore from "./stores/useAuthStore";

SplashScreen.preventAutoHideAsync();

Mapbox.setAccessToken(process.env.EXPO_PUBLIC_MAPBOX_DOWNLOAD_TOKEN);

export default function App() {
  const { isReady, identity, setIdentity, fetchKeyAndIdentity } = useAuthStore(
    useShallow((state) => ({
      isReady: state.isReady,
      identity: state.identity,
      setIdentity: state.setIdentity,
      fetchKeyAndIdentity: state.fetchKeyAndIdentity,
    }))
  );

  const [assets] = useAssets(assetList);

  useEffect(() => {
    const handleSetIdentity = async ({ url }) => {
      if (url && !identity) {
        const { queryParams } = Linking.parse(url);
        const delegation = queryParams.delegation;

        if (delegation) {
          setIdentity(delegation);
          console.log("Done setting identity");
        }
      }
    };

    const subscription = Linking.addEventListener("url", handleSetIdentity);

    return () => {
      subscription.remove();
    };
  }, [identity]);

  useEffect(() => {
    fetchKeyAndIdentity();

    console.log("Unregistering all tasks");
    (async () => await TaskManager.unregisterAllTasksAsync())();
  }, []);

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
