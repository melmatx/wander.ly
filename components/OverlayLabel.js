import React, { memo } from "react";
import { StyleSheet, View } from "react-native";

import { style as communityCardStyle } from "./CommunityCard";
import globalStyles from "../assets/styles/globalStyles";

const OverlayLabel = ({ children }) => {
  return (
    <View
      style={[
        StyleSheet.absoluteFill,
        globalStyles.flexCenter,
        communityCardStyle.container,
        style.container,
      ]}
    >
      {children}
    </View>
  );
};

export const style = {
  container: {
    opacity: 0.9,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
};

export default memo(OverlayLabel);
