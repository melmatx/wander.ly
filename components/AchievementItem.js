import React, { memo } from "react";
import { View } from "react-native";
import { Button, Text } from "react-native-ui-lib";

import globalStyles, { colors, sizes } from "../assets/styles/globalStyles";

const AchievementItem = ({ item, height, onPress }) => {
  return (
    <Button link onPress={onPress}>
      <View
        style={[
          globalStyles.flexCenter,
          {
            height,
            width: "100%",
            backgroundColor: colors.dark,
            borderRadius: sizes.medium,
            padding: sizes.large,
            rowGap: sizes.large,
          },
        ]}
      >
        <Text achievement center>
          {item.emoji}
        </Text>
        <Text semibold white center>
          {item.name}
        </Text>
      </View>
    </Button>
  );
};

export default memo(AchievementItem);