import Ionicons from "@expo/vector-icons/Ionicons";
import * as Burnt from "burnt";
import React, { useCallback, useLayoutEffect, useRef } from "react";
import { View } from "react-native";
import CircularProgress from "react-native-circular-progress-indicator";
import { Button, Text } from "react-native-ui-lib";

import globalStyles, { colors, sizes } from "../assets/styles/globalStyles";
import BottomSheet from "../components/BottomSheet";
import InfoSheetContent from "../components/InfoSheetContent";
import dashedStrokeConfig from "../consts/progressConfig";
import Routes from "../navigation/Routes";
import getGoalUnits from "../utils/getGoalUnits";

const ActiveTask = ({ navigation, route }) => {
  const { progress, maxValue, type, title, description, isCompleted } =
    route.params?.goal || {};

  const infoSheetRef = useRef(null);

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

  const onAnimationComplete = useCallback(() => {
    if (isCompleted) {
      Burnt.alert({
        title: "Goal Reached",
        message: "Congratulations! You've earned 10 points.",
        preset: "custom",
        icon: { ios: { name: "medal" } },
        duration: 1,
      });
    }
  }, [progress, maxValue]);

  const onInfoPress = useCallback(() => {
    infoSheetRef.current?.expand();
  }, []);

  const handleInfoButton = useCallback(() => {
    infoSheetRef.current?.close();
  }, []);

  const onFriendWalk = useCallback(() => {
    console.log("Walk with a friend");
  }, []);

  const onShare = useCallback(() => {
    navigation.navigate(Routes.SHARE_JOURNEY);
  }, [navigation]);

  return (
    <>
      <View style={[globalStyles.flexFull, { padding: sizes.large }]}>
        <View style={globalStyles.flexCenter}>
          <View style={{ height: "50%" }}>
            <CircularProgress
              value={progress}
              maxValue={maxValue}
              onAnimationComplete={onAnimationComplete}
              radius={150}
              delay={350}
              inActiveStrokeOpacity={0.5}
              activeStrokeWidth={15}
              inActiveStrokeWidth={20}
              progressValueStyle={{ fontWeight: "100", color: "white" }}
              activeStrokeSecondaryColor="yellow"
              inActiveStrokeColor={colors.dark}
              duration={1500}
              title={getGoalUnits(type, progress)}
              titleColor="white"
              dashedStrokeConfig={dashedStrokeConfig}
              progressFormatter={(value) => {
                "worklet";

                if (Number.isInteger(value)) {
                  return value.toString();
                } else {
                  return value.toFixed(1); // 1 decimal place
                }
              }}
            />
          </View>

          <View style={{ height: "15%" }}>
            <Text h4 color="gray" flex center>
              You need to walk {maxValue - progress} more{" "}
              {getGoalUnits(type, maxValue)} to reach your goal.
            </Text>
          </View>

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

            <Button backgroundColor={colors.dark} onPress={onShare}>
              <Ionicons name="camera" size={30} color="white" />
            </Button>
          </View>
        </View>
      </View>

      <BottomSheet ref={infoSheetRef} detached>
        <InfoSheetContent
          title={title}
          description={description}
          onButtonPress={handleInfoButton}
        />
      </BottomSheet>
    </>
  );
};

export default ActiveTask;
