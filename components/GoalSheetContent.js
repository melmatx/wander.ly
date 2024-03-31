import React, { useMemo } from "react";
import { View } from "react-native";
import { Button, Text } from "react-native-ui-lib";

import globalStyles, { colors, sizes } from "../assets/styles/globalStyles";
import getTaskProgress from "../utils/getTaskProgress";

const GoalSheetContent = ({ goal, onButtonPress }) => {
  const renderProgress = useMemo(() => {
    const { progress, maxValue, unit } = getTaskProgress(goal);

    return (
      <Text color={colors.gray}>
        Progress: {progress}/{maxValue} {unit}
      </Text>
    );
  }, [goal]);

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
      <View style={{ rowGap: sizes.small }}>
        <Text h1 white>
          {goal.title}
        </Text>
        <Text white>{goal.description}</Text>
      </View>

      {renderProgress}

      <Button
        label={goal.progress === 0 ? "Begin Task" : "Continue"}
        onPress={onButtonPress}
      />
    </View>
  );
};

export default GoalSheetContent;
