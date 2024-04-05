import Ionicons from "@expo/vector-icons/Ionicons";
import React, { memo } from "react";
import { View } from "react-native";
import { Button, Text } from "react-native-ui-lib";

import globalStyles, { sizes } from "../assets/styles/globalStyles";

const InfoSheetContent = ({
  title,
  description,
  gap = sizes.medium,
  buttonLabel = "Done",
  onButtonPress,
  onSharePress,
  children,
}) => {
  return (
    <View
      style={[
        globalStyles.flexFull,
        globalStyles.spaceBetween,
        {
          rowGap: sizes.medium,
          padding: sizes.large,
        },
      ]}
    >
      <View style={{ rowGap: gap }}>
        <Text h1>{title}</Text>
        <Text>{description}</Text>
      </View>

      {children}

      <View style={globalStyles.rowCenter}>
        <Button
          label={buttonLabel}
          onPress={onButtonPress}
          style={globalStyles.flexFull}
        />

        {onSharePress && (
          <Button link style={{ padding: sizes.large }} onPress={onSharePress}>
            <Ionicons name="share-outline" size={25} color="white" />
          </Button>
        )}
      </View>
    </View>
  );
};

export default memo(InfoSheetContent);
