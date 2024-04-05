import Ionicons from "@expo/vector-icons/Ionicons";
import { BlurView } from "expo-blur";
import { ImageBackground } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import React, { forwardRef, memo, useCallback } from "react";
import { Platform, StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-ui-lib";

import globalStyles, { colors, sizes } from "../assets/styles/globalStyles";

const CommunityCard = forwardRef(({ item, onInfoPress }, buttonRef) => {
  const handleInfoPress = useCallback(() => {
    if (!item) {
      return;
    }
    onInfoPress(item);
  }, [item?.task, onInfoPress]);

  if (!item) {
    return null;
  }

  return (
    <BlurView
      tint="light"
      intensity={Platform.OS === "ios" ? 60 : 35}
      style={style.container}
      experimentalBlurMethod="dimezisBlurView"
    >
      <ImageBackground
        source={item.image}
        style={style.image}
        transition={100}
        cachePolicy="memory-disk"
      >
        <LinearGradient
          colors={["rgba(0,0,0,0.3)", "transparent"]}
          style={[StyleSheet.absoluteFill, { height: 100 }]}
        />

        <Button link onPress={handleInfoPress} ref={buttonRef}>
          <Ionicons name="information-circle" size={35} color="white" />
        </Button>
      </ImageBackground>

      <View style={[globalStyles.spaceBetween, { height: "25%" }]}>
        <Text h4 semibold numberOfLines={5}>
          {item.content}
        </Text>

        <Text h4 center color={colors.gray}>
          {item.place}
        </Text>
      </View>
    </BlurView>
  );
});

export const style = {
  container: {
    height: "85%",
    padding: sizes.xlarge,
    borderRadius: sizes.medium,
    overflow: "hidden",
  },
  image: {
    height: "70%",
    width: "100%",
    borderRadius: sizes.medium,
    overflow: "hidden",
    alignItems: "flex-end",
    padding: sizes.medium,
    marginBottom: sizes.xxlarge,
  },
};

export default memo(CommunityCard);
