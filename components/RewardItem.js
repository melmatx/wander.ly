import { Image } from "expo-image";
import React, { memo } from "react";
import { View } from "react-native";
import { Button, Text } from "react-native-ui-lib";

import globalStyles, { colors, sizes } from "../assets/styles/globalStyles";

const RewardItem = ({ item, image, onPress }) => {
  return (
    <Button link onPress={onPress}>
      <View
        style={[
          globalStyles.rowCenter,
          {
            padding: sizes.large,
            columnGap: sizes.large,
            backgroundColor: colors.dark,
            borderRadius: sizes.medium,
          },
        ]}
      >
        <Image
          source={image}
          style={{
            height: 50,
            width: 80,
          }}
          contentFit="contain"
        />

        <View style={{ rowGap: sizes.small, flex: 1 }}>
          <Text h4>{item.name}</Text>
          <Text color={colors.gray}>{item.points} pts</Text>
        </View>
      </View>
    </Button>
  );
};

export default memo(RewardItem);
