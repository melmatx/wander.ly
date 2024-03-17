import { createNativeStackNavigator } from "@react-navigation/native-stack";

import BottomTabs from "./BottomTabs";
import Routes from "./Routes";
import { colors } from "../assets/styles/globalStyles";
import Login from "../screens/Login";
import useAuthStore from "../stores/useAuthStore";

const Stack = createNativeStackNavigator();

const MainNavigation = () => {
  const identity = useAuthStore((state) => state.identity);

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, headerTintColor: colors.primary }}
    >
      {identity ? (
        <Stack.Screen name={Routes.HOME} component={BottomTabs} />
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
