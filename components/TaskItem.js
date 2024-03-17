import Ionicons from "@expo/vector-icons/Ionicons";
import { format, isAfter, isBefore } from "date-fns";
import React, { memo } from "react";
import { View } from "react-native";
import { Button, Text } from "react-native-ui-lib";

import globalStyles, { colors, sizes } from "../assets/styles/globalStyles";

const TaskItem = ({ item, onPress }) => {
  const isUnavailable = isBefore(new Date(), item.timeStart);
  const isExpired = isAfter(new Date(), item.timeEnd);
  return (
    <View
      style={[
        globalStyles.rowCenter,
        {
          backgroundColor: "black",
          padding: sizes.large,
          borderRadius: sizes.medium,
          columnGap: sizes.large,
          opacity:
            isExpired || isUnavailable ? 0.4 : item.isCompleted ? 0.6 : 1,
        },
      ]}
    >
      <Text emoji>{item.emoji} </Text>
      <View style={[globalStyles.flexFull, { rowGap: sizes.xsmall }]}>
        <Text
          h4
          white
          style={{
            textDecorationLine: item.isCompleted ? "line-through" : "none",
          }}
        >
          {item.title}
        </Text>
        <Text white>{item.description}</Text>
        <Text color="gray">
          {format(item.timeStart, "h:mm a")} - {format(item.timeEnd, "h:mm a")}
        </Text>
        {/* <Text color={"gray"}>{item.progress}</Text> */}
      </View>

      {item.isCompleted ? (
        <Ionicons name="checkmark-outline" size={35} color={colors.primary} />
      ) : (
        !(isExpired || isUnavailable) && (
          <Button link onPress={onPress}>
            <Ionicons name="arrow-forward-circle" size={40} color="white" />
          </Button>
        )
      )}
    </View>
  );
};

export default memo(TaskItem);
