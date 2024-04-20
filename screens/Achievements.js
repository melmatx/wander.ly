import { useHeaderHeight } from "@react-navigation/elements";
import { format } from "date-fns";
import { LinearGradient } from "expo-linear-gradient";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  StyleSheet,
  View,
} from "react-native";
import Share from "react-native-share";
import { GridList, Text } from "react-native-ui-lib";

import globalStyles, { colors, sizes } from "../assets/styles/globalStyles";
import AchievementItem from "../components/AchievementItem";
import BottomSheet from "../components/BottomSheet";
import InfoSheetContent from "../components/InfoSheetContent";
import { getBackendActor } from "../src/actor";
import useProfileStore from "../stores/useProfileStore";

const { width } = Dimensions.get("window");

const ITEM_WIDTH = 150;
const ITEM_HEIGHT = 150;

const Achievements = () => {
  const [achievements, setAchievements] = useState([]);
  const [selectedAchievement, setSelectedAchievement] = useState(null);
  const [isFetching, setIsFetching] = useState(false);

  const infoSheetRef = useRef(null);

  const identity = useProfileStore((state) => state.identity);
  const headerHeight = useHeaderHeight();

  useEffect(() => {
    const fetchAchievements = async () => {
      setIsFetching(true);
      try {
        // Fetch achievements from ICP
        const achievements =
          await getBackendActor(identity).getAllAchievements();

        setAchievements(achievements);
      } catch (error) {
        Alert.alert("Failed to fetch achievements", error);
      } finally {
        setIsFetching(false);
      }
    };

    fetchAchievements();
  }, [identity]);

  const onAchievementPress = useCallback((achievement) => {
    infoSheetRef.current?.expand();
    setSelectedAchievement(achievement);
  }, []);

  const handleAchievementButton = useCallback(() => {
    infoSheetRef.current?.close();
  }, []);

  const handleAchievementShare = useCallback(() => {
    if (!selectedAchievement) {
      return;
    }
    Share.open({ message: selectedAchievement.name, failOnCancel: false });
  }, [selectedAchievement]);

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

  if (isFetching) {
    return (
      <View style={globalStyles.flexFull}>
        <LinearGradient
          colors={["#0079FF", "rgba(0,0,0,0.3)"]}
          style={[StyleSheet.absoluteFill, { zIndex: -1, bottom: "80%" }]}
        />

        <View style={[globalStyles.flexCenter, { rowGap: sizes.large }]}>
          <ActivityIndicator size="large" />
          <Text style={{ color: colors.gray }}>Loading Achievements...</Text>
        </View>
      </View>
    );
  }

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
        <Text h1>Keep On Roaming</Text>
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
            onSharePress={handleAchievementShare}
          >
            {selectedAchievement.userAchievement[0] && (
              <Text color={colors.gray}>
                Completed at:{" "}
                {format(
                  selectedAchievement.userAchievement[0].completedAt,
                  "PPp"
                )}
              </Text>
            )}
          </InfoSheetContent>
        )}
      </BottomSheet>
    </View>
  );
};

export default Achievements;
