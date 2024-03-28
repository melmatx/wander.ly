import { useHeaderHeight } from "@react-navigation/elements";
import { LinearGradient } from "expo-linear-gradient";
import React, { useCallback, useRef, useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { GridList, Text } from "react-native-ui-lib";

import globalStyles, { colors, sizes } from "../assets/styles/globalStyles";
import AchievementItem from "../components/AchievementItem";
import BottomSheet from "../components/BottomSheet";
import InfoSheetContent from "../components/InfoSheetContent";
import achievements from "../consts/sampleAchievements";

const { width } = Dimensions.get("window");

const ITEM_WIDTH = 150;
const ITEM_HEIGHT = 150;

const Achievements = () => {
  const [selectedAchievement, setSelectedAchievement] = useState(null);

  const infoSheetRef = useRef(null);

  const headerHeight = useHeaderHeight();

  const onAchievementPress = useCallback((achievement) => {
    infoSheetRef.current?.expand();
    setSelectedAchievement(achievement);
  }, []);

  const handleAchievementButton = useCallback(() => {
    infoSheetRef.current?.close();
  }, []);

  const renderItem = useCallback(
    ({ item }) => (
      <AchievementItem
        item={item}
        height={ITEM_HEIGHT}
        onPress={() => onAchievementPress(item)}
      />
    ),
    [onAchievementPress]
  );

  return (
    <View
      style={[
        globalStyles.flexFull,
        { padding: sizes.large, paddingTop: headerHeight + sizes.large },
      ]}
    >
      <LinearGradient
        colors={["#0079FF", "rgba(0,0,0,0.3)"]}
        style={[StyleSheet.absoluteFill, { zIndex: -1, bottom: "80%" }]}
      />

      <View
        style={{
          paddingTop: sizes.small,
          paddingBottom: sizes.xxlarge,
          rowGap: sizes.small,
        }}
      >
        <Text h1 white>
          Keep On Roaming
        </Text>
        <Text color={colors.gray}>
          Achievements for completing your goals, going to businesses, and more.
        </Text>
      </View>

      <GridList
        data={achievements}
        containerWidth={width - sizes.large * 2}
        maxItemWidth={ITEM_WIDTH}
        renderItem={renderItem}
      />

      <BottomSheet ref={infoSheetRef} detached>
        {selectedAchievement && (
          <InfoSheetContent
            title={selectedAchievement.name}
            description={selectedAchievement.description}
            onButtonPress={handleAchievementButton}
          />
        )}
      </BottomSheet>
    </View>
  );
};

export default Achievements;
