import React from "react";
import { View } from "react-native";
import { Button, Text } from "react-native-ui-lib";

import globalStyles, { sizes } from "../assets/styles/globalStyles";
import getGoalUnits from "../utils/getGoalUnits";

const GoalSheetContent = ({ goal, onButtonPress }) => {
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

      <Text color="gray">
        Progress: {goal.progress}/{goal.maxValue}{" "}
        {getGoalUnits(goal.type, goal.maxValue)}
      </Text>

      <Button
        label={goal.progress === 0 ? "Begin Task" : "Continue"}
        onPress={onButtonPress}
      />
    </View>
  );
};

export default GoalSheetContent;
