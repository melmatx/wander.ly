import React, { memo } from "react";
import { ScrollView } from "react-native";
import { Chip } from "react-native-ui-lib";

import { colors, sizes } from "../assets/styles/globalStyles";

const ChipHeader = ({
  data,
  selected,
  onPress,
  activeColor = colors.dark,
  inactiveColor = "rgba(255,255,255,0.2)",
}) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        columnGap: sizes.medium,
      }}
    >
      {data.map((item) => (
        <Chip
          key={`chip-${item}`}
          label={item}
          labelStyle={{
            fontSize: 15,
            paddingVertical: sizes.medium,
          }}
          containerStyle={{
            borderWidth: 0,
            backgroundColor: selected === item ? activeColor : inactiveColor,
          }}
          activeOpacity={0.8}
          onPress={() => onPress(item)}
        />
      ))}
    </ScrollView>
  );
};

export default memo(ChipHeader);
