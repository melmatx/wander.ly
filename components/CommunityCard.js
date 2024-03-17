import { BlurView } from "expo-blur";
import { Image } from "expo-image";
import React, { memo } from "react";
import { View } from "react-native";
import { Text } from "react-native-ui-lib";

import globalStyles, { sizes } from "../assets/styles/globalStyles";

const CommunityCard = ({ card }) => {
  return (
    <BlurView tint="light" intensity={50} style={style.container}>
      <View style={[globalStyles.flexFull, globalStyles.spaceBetween]}>
        <View style={{ rowGap: sizes.medium }}>
          <Image source={card.image} style={style.image} transition={100} />
          <Text h4 semibold white numberOfLines={6}>
            {card.content}
          </Text>
        </View>
        <Text h3 center color="lightgray">
          {card.place}
        </Text>
      </View>
    </BlurView>
  );
};

export const style = {
  container: {
    height: "85%",
    padding: sizes.xlarge,
    borderRadius: sizes.xlarge,
    overflow: "hidden",
  },
  image: {
    height: "70%",
    width: "100%",
    marginVertical: sizes.xxlarge,
    borderRadius: sizes.large,
  },
};

export default memo(CommunityCard);
