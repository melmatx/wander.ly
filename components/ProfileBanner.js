import { LinearGradient } from "expo-linear-gradient";
import React, { memo } from "react";
import { Text } from "react-native-ui-lib";

import globalStyles, { colors, sizes } from "../assets/styles/globalStyles";

const ProfileBanner = ({
  title,
  description,
  customTitle,
  customDescription,
  gradientColor,
  containerStyle,
}) => {
  return (
    <LinearGradient
      colors={[gradientColor, colors.dark]}
      locations={[0.1, 0.9]}
      style={[
        globalStyles.spaceBetween,
        {
          height: 150,
          padding: sizes.large,
          borderRadius: sizes.medium,
        },
        containerStyle,
      ]}
    >
      {customTitle || (
        <Text profile white>
          {title}
        </Text>
      )}
      {customDescription || (
        <Text h2 white>
          {description}
        </Text>
      )}
    </LinearGradient>
  );
};

export default memo(ProfileBanner);
