import Ionicons from "@expo/vector-icons/Ionicons";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import React, { memo } from "react";
import { View } from "react-native";

import globalStyles from "../assets/styles/globalStyles";

const GradientIcon = ({
  icon,
  colors,
  size,
  spacing = 0,
  style,
  maskedViewProps,
  gradientProps,
}) => {
  return (
    <MaskedView
      style={{ height: size, width: size, ...style }}
      maskElement={
        <View
          style={[globalStyles.flexCenter, { backgroundColor: "transparent" }]}
        >
          <Ionicons name={icon} size={size - spacing} />
        </View>
      }
      {...maskedViewProps}
    >
      <LinearGradient
        colors={colors}
        style={globalStyles.flexFull}
        {...gradientProps}
      />
    </MaskedView>
  );
};

export default memo(GradientIcon);
