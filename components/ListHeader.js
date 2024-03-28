import { useRoute } from "@react-navigation/native";
import React, { memo } from "react";
import { View } from "react-native";
import { Text } from "react-native-ui-lib";

import globalStyles, { colors, sizes } from "../assets/styles/globalStyles";

const ListHeader = ({ icon, description }) => {
  const route = useRoute();

  return (
    <View
      style={[
        globalStyles.center,
        { rowGap: sizes.medium, marginBottom: sizes.xlarge },
      ]}
    >
      <View style={{ height: 85, width: 85 }}>
        <View
          style={[
            globalStyles.flexCenter,
            {
              backgroundColor: colors.dark,
              borderRadius: 100,
            },
          ]}
        >
          {icon}
        </View>
      </View>

      <Text h1 bold white>
        {route.name}
      </Text>

      <Text h4 white>
        {description}
      </Text>
    </View>
  );
};

export default memo(ListHeader);
