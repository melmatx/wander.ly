import Ionicons from "@expo/vector-icons/Ionicons";
import { format, isAfter, isBefore, isToday } from "date-fns";
import React, { memo, useCallback } from "react";
import { View } from "react-native";
import { Button, Text } from "react-native-ui-lib";

import globalStyles, { colors, sizes } from "../assets/styles/globalStyles";

const TaskItem = ({ item, onPress, isUser = true }) => {
  const isUnavailable = isBefore(new Date(), item.timeStart);
  const isExpired = isAfter(new Date(), item.timeEnd);
  const isDisabled = isExpired || isUnavailable;
  // const isDisabled = false;

  const renderActionButton = useCallback(() => {
    if (item.completedAt) {
      return (
        <Ionicons name="checkmark-outline" size={35} color={colors.primary} />
      );
    }

    if (isDisabled || !onPress) {
      return null;
    }

    return (
      <Button link onPress={onPress} activeOpacity={0.3}>
        <Ionicons name="arrow-forward-circle" size={40} color="white" />
      </Button>
    );
  }, [item.completedAt, isDisabled, onPress]);

  const renderDate = useCallback(() => {
    if (item.completedAt) {
      let completedAt = item.completedAt;

      // Check if the task was completed today
      if (isToday(item.completedAt)) {
        completedAt = format(item.completedAt, "h:mm a");
      } else {
        completedAt = format(item.completedAt, "MMM d, yyyy");
      }

      return <Text color={colors.gray}>Completed: {completedAt}</Text>;
    }

    return (
      <Text color={colors.gray}>
        {format(item.timeStart, "h:mm a")} - {format(item.timeEnd, "h:mm a")}
      </Text>
    );
  }, [item.completedAt, item.timeStart, item.timeEnd]);

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
            isUser && isDisabled ? 0.4 : isUser && item.completedAt ? 0.6 : 1,
        },
      ]}
    >
      <Text emoji>{item.emoji} </Text>
      <View style={[globalStyles.flexFull, { rowGap: sizes.xsmall }]}>
        <Text
          h4
          white
          style={{
            textDecorationLine:
              item.completedAt && isUser ? "line-through" : "none",
          }}
        >
          {item.title}
        </Text>
        <Text white>{item.description}</Text>

        {renderDate()}
      </View>

      {renderActionButton()}
    </View>
  );
};

export default memo(TaskItem);
