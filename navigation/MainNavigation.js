import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text } from "react-native-ui-lib";

import BottomTabs from "./BottomTabs";
import Routes from "./Routes";
import { colors } from "../assets/styles/globalStyles";
import Achievements from "../screens/Achievements";
import ActiveTask from "../screens/ActiveTask";
import Login from "../screens/Login";
import Rewards from "../screens/Rewards";
import ScanCode from "../screens/ScanCode";
import ShareJourney from "../screens/ShareJourney";
import useAuthStore from "../stores/useAuthStore";

const Stack = createNativeStackNavigator();

const MainNavigation = () => {
  const identity = useAuthStore((state) => state.identity);

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, headerTintColor: colors.primary }}
    >
      {identity ? (
        <>
          <Stack.Screen name={Routes.HOME} component={BottomTabs} />

          <Stack.Group
            screenOptions={{
              headerShown: true,
              headerTitle: ({ children }) => (
                <Text h3 white>
                  {children}
                </Text>
              ),
            }}
          >
            <Stack.Screen
              name={Routes.ACTIVE_TASK}
              component={ActiveTask}
              options={{ animation: "fade_from_bottom" }}
            />
            <Stack.Screen
              name={Routes.SHARE_JOURNEY}
              component={ShareJourney}
              options={{
                headerBlurEffect: "regular",
                headerTransparent: true,
              }}
            />
            <Stack.Screen name={Routes.SCAN_CODE} component={ScanCode} />
            <Stack.Screen name={Routes.ACHIEVEMENTS} component={Achievements} />
            <Stack.Screen name={Routes.REWARDS} component={Rewards} />
          </Stack.Group>
        </>
      ) : (
        <Stack.Screen
          name={Routes.LOGIN}
          component={Login}
          options={{
            animationTypeForReplace: "pop",
          }}
        />
      )}
    </Stack.Navigator>
  );
};

export default MainNavigation;
