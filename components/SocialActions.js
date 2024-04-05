import Ionicons from "@expo/vector-icons/Ionicons";
import React, { memo } from "react";
import { View } from "react-native";
import { Button, Text } from "react-native-ui-lib";

import globalStyles, { colors, sizes } from "../assets/styles/globalStyles";

const SocialActions = ({ isLiked, isAwarded, likeCount, awardCount }) => {
  return (
    <View
      style={[
        globalStyles.row,
        globalStyles.spaceBetween,
        {
          width: "30%",
          alignSelf: "flex-end",
        },
      ]}
    >
      <Button link>
        <View style={[globalStyles.rowCenter, { columnGap: sizes.xsmall }]}>
          <Ionicons
            name="heart"
            size={25}
            color={isLiked ? colors.red : colors.gray}
          />
          <Text color={colors.gray}>{likeCount}</Text>
        </View>
      </Button>

      <View style={[globalStyles.rowCenter, { columnGap: sizes.small }]}>
        <Ionicons
          name="star"
          size={25}
          color={isAwarded ? "gold" : colors.gray}
        />
        <Text color={colors.gray}>{awardCount}</Text>
      </View>
    </View>
  );
};

export default memo(SocialActions);
