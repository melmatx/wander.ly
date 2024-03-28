import { useRoute } from "@react-navigation/native";
import React, { memo } from "react";
import { View } from "react-native";
import { Text } from "react-native-ui-lib";

import globalStyles, { sizes } from "../assets/styles/globalStyles";

const AppHeader = ({ routeName, children }) => {
  const route = useRoute();

  return (
    <View style={{ padding: sizes.large }}>
      <View style={[globalStyles.rowCenter, globalStyles.spaceBetween]}>
        <Text h1 white>
          {routeName || route.name}
        </Text>

        {children}
      </View>
    </View>
  );
};

export default memo(AppHeader);
