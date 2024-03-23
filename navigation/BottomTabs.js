import Ionicons from "@expo/vector-icons/Ionicons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BlurView } from "expo-blur";

import Routes from "./Routes";
import globalStyles from "../assets/styles/globalStyles";
import Community from "../screens/Community";
import Explore from "../screens/Explore";
import Profile from "../screens/Profile";
import Wallet from "../screens/Wallet";

const Tab = createBottomTabNavigator();

const tabIcons = {
  [Routes.EXPLORE]: {
    focusedIcon: "rocket",
    unfocusedIcon: "rocket-outline",
  },
  [Routes.COMMUNITY]: {
    focusedIcon: "globe",
    unfocusedIcon: "globe-outline",
  },
  [Routes.WALLET]: {
    focusedIcon: "wallet",
    unfocusedIcon: "wallet-outline",
  },
  [Routes.PROFILE]: {
    focusedIcon: "person",
    unfocusedIcon: "person-outline",
  },
};

const getTabBarIcon = (props, route) => {
  if (!tabIcons[route.name]) {
    return null;
  }

  const { focused, color, size } = props;
  const { focusedIcon, unfocusedIcon } = tabIcons[route.name];

  return (
    <Ionicons
      name={focused ? focusedIcon : unfocusedIcon}
      size={size}
      color={color}
    />
  );
};

const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "gray",
        tabBarIcon: (props) => getTabBarIcon(props, route),
        tabBarStyle: { position: "absolute" },
        tabBarBackground: () => (
          <BlurView tint="dark" intensity={70} style={globalStyles.flexFull} />
        ),
      })}
    >
      <Tab.Screen name={Routes.EXPLORE} component={Explore} />
      <Tab.Screen name={Routes.COMMUNITY} component={Community} />
      <Tab.Screen name={Routes.WALLET} component={Wallet} />
      <Tab.Screen name={Routes.PROFILE} component={Profile} />
    </Tab.Navigator>
  );
};

export default BottomTabs;
