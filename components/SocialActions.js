import Ionicons from "@expo/vector-icons/Ionicons";
import React, { memo, useCallback } from "react";
import { View } from "react-native";
import { Button, Text } from "react-native-ui-lib";

import globalStyles, { colors, sizes } from "../assets/styles/globalStyles";
import LikeTypes from "../consts/likeTypes";
import usePostActions from "../hooks/usePostActions";

const SocialActions = ({ item }) => {
  const { likeOrDislikePost, awardPost } = usePostActions({ item });

  const handleLikeOrDislikePost = useCallback(async () => {
    await likeOrDislikePost({
      type: item.isLiked ? LikeTypes.DISLIKE : LikeTypes.LIKE,
    });
  }, [item.isLiked, likeOrDislikePost]);

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
      <Button link onPress={handleLikeOrDislikePost}>
        <View style={[globalStyles.rowCenter, { columnGap: sizes.xsmall }]}>
          <Ionicons
            name="heart"
            size={25}
            color={item.isLiked ? colors.red : colors.gray}
          />
          <Text color={colors.gray}>{item.likes.toString()}</Text>
        </View>
      </Button>

      <Button link onPress={awardPost}>
        <View style={[globalStyles.rowCenter, { columnGap: sizes.small }]}>
          <Ionicons
            name="star"
            size={25}
            color={item.isAwarded ? "gold" : colors.gray}
          />
          <Text color={colors.gray}>{item.awards.toString()}</Text>
        </View>
      </Button>
    </View>
  );
};

export default memo(SocialActions);
