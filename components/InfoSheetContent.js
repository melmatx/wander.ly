import React, { memo } from "react";
import { View } from "react-native";
import { Button, Text } from "react-native-ui-lib";

import globalStyles, { sizes } from "../assets/styles/globalStyles";

const InfoSheetContent = ({ title, description, onButtonPress, children }) => {
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
      <View style={{ rowGap: sizes.medium }}>
        <Text h1 white>
          {title}
        </Text>
        <Text white>{description}</Text>
      </View>

      {children}

      <Button label="Done" onPress={onButtonPress} />
    </View>
  );
};

export default memo(InfoSheetContent);
