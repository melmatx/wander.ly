import { Image } from "expo-image";
import React, { memo } from "react";
import { View } from "react-native";
import { Card, Text } from "react-native-ui-lib";

import SocialActions from "./SocialActions";
import globalStyles, { colors, sizes } from "../assets/styles/globalStyles";

const PostItem = ({ item, onPress, children }) => {
  return (
    <Card
      backgroundColor={colors.dark}
      enableShadow={false}
      onPress={onPress}
      style={{ overflow: "hidden" }}
    >
      <Image source={item.image} style={{ height: 150 }} transition={100} />

      <View
        style={{
          paddingVertical: sizes.xlarge,
          paddingHorizontal: sizes.large,
        }}
      >
        <View style={{ rowGap: sizes.small }}>
          <Text h3 white>
            {item.place}
          </Text>
          <Text white>{item.content}</Text>
        </View>

        <View
          style={[
            globalStyles.center,
            globalStyles.spaceBetween,
            { marginTop: sizes.xxlarge, flexDirection: "row-reverse" },
          ]}
        >
          {children}

          <SocialActions likeCount={item.likes} awardCount={item.awards} />
        </View>
      </View>
    </Card>
  );
};

export default memo(PostItem);
