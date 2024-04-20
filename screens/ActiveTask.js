import Ionicons from "@expo/vector-icons/Ionicons";
import * as Burnt from "burnt";
import React, { useCallback, useLayoutEffect, useMemo, useRef } from "react";
import { View } from "react-native";
import CircularProgress from "react-native-circular-progress-indicator";
import { Button, Text } from "react-native-ui-lib";

import globalStyles, { colors, sizes } from "../assets/styles/globalStyles";
import BottomSheet from "../components/BottomSheet";
import InfoSheetContent from "../components/InfoSheetContent";
import dashedStrokeConfig from "../consts/progressConfig";
import TaskTypes from "../consts/taskTypes";
import useCurrentProgress from "../hooks/useCurrentProgress";
import Routes from "../navigation/Routes";
import convertAltValue from "../utils/convertAltValue";
import convertSecToMin from "../utils/convertSecToMin";
import getTaskUnit from "../utils/getTaskUnit";

const ActiveTask = ({ navigation, route }) => {
  const task = route.params?.task;

  const { currentProgress, completedAt } = useCurrentProgress();

  const infoSheetRef = useRef(null);

  const onAnimationComplete = useCallback(() => {
    if (completedAt) {
      Burnt.alert({
        title: "Goal Reached",
        message: "Congratulations! You've earned 10 points.",
        preset: "custom",
        icon: { ios: { name: "medal" } },
        duration: 1,
      });
    }
  }, [completedAt]);

  const onFriendWalk = useCallback(() => {
    console.log("Walk with a friend");
  }, []);

  const onShareTask = useCallback(() => {
    navigation.navigate(Routes.SHARE_JOURNEY, { taskId: task.id });
  }, [navigation, task.id]);

  const renderHint = useMemo(() => {
    const progress = convertAltValue(task.taskType, currentProgress);
    const maxValue = convertAltValue(task.taskType, task.maxValue);
    const remaining = maxValue - progress;
    const unit = getTaskUnit(task.taskType, remaining);

    return (
      <Text h4 color={colors.gray} flex center>
        You need to walk {remaining} more {unit} to reach your goal.
      </Text>
    );
  }, [currentProgress, task.maxValue, task.taskType]);

  const title = useMemo(
    () => getTaskUnit(task.taskType, currentProgress),
    [currentProgress, task.taskType]
  );

  const convertedProgress = useMemo(() => {
    if (task.taskType === TaskTypes.TIME) {
      return convertSecToMin(currentProgress);
    }

    return currentProgress;
  }, [currentProgress]);

  const progressFormatter = useCallback(
    (value) => {
      "worklet";

      // Workaround for the janky animation at start
      if (value <= 0) {
        return -1;
      }

      // Convert time to minutes
      if (task.taskType === TaskTypes.TIME) {
        return convertedProgress;
      }

      if (Number.isInteger(currentProgress)) {
        return value.toFixed(0); // no decimal places
      }

      return value.toFixed(1); // 1 decimal place
    },
    [convertedProgress]
  );

  const handleInfoButton = useCallback(() => {
    infoSheetRef.current?.close();
  }, []);

  const onInfoPress = useCallback(() => {
    infoSheetRef.current?.expand();
  }, []);

  const headerRight = useCallback(
    () => (
      <Button link onPress={onInfoPress}>
        <Ionicons
          name="information-circle-outline"
          size={30}
          color={colors.primary}
        />
      </Button>
    ),
    [onInfoPress]
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight,
    });
  }, [headerRight, navigation]);

  return (
    <>
      <View style={[globalStyles.flexFull, { padding: sizes.large }]}>
        <View style={globalStyles.flexCenter}>
          <View style={{ height: "50%" }}>
            <CircularProgress
              value={currentProgress}
              maxValue={task.maxValue}
              onAnimationComplete={onAnimationComplete}
              radius={150}
              inActiveStrokeOpacity={0.5}
              activeStrokeWidth={15}
              inActiveStrokeWidth={20}
              progressValueStyle={{ fontWeight: "100", color: "white" }}
              activeStrokeSecondaryColor="yellow"
              inActiveStrokeColor={colors.dark}
              title={title}
              titleColor="white"
              dashedStrokeConfig={dashedStrokeConfig}
              progressFormatter={progressFormatter}
            />
          </View>

          <View style={{ height: "15%" }}>{renderHint}</View>

          <View
            style={[
              globalStyles.rowCenter,
              globalStyles.spaceBetween,
              { width: "85%" },
            ]}
          >
            <Button
              label="Walk with a friend"
              style={{ columnGap: sizes.small }}
              onPress={onFriendWalk}
              enableShadow
            >
              <Ionicons name="people" size={30} color="white" />
            </Button>

            <Button backgroundColor={colors.dark} onPress={onShareTask}>
              <Ionicons name="camera" size={30} color="white" />
            </Button>
          </View>
        </View>
      </View>

      <BottomSheet ref={infoSheetRef} detached>
        <InfoSheetContent
          title={task.title}
          description={task.description}
          onButtonPress={handleInfoButton}
        />
      </BottomSheet>
    </>
  );
};

export default ActiveTask;
