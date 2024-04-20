import { useHeaderHeight } from "@react-navigation/elements";
import { LinearGradient } from "expo-linear-gradient";
import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  StyleSheet,
  View,
} from "react-native";
import { Text } from "react-native-ui-lib";

import globalStyles, { colors, sizes } from "../assets/styles/globalStyles";
import RewardItem from "../components/RewardItem";
import { getBackendActor } from "../src/actor";
import useProfileStore from "../stores/useProfileStore";

const Rewards = () => {
  const [rewards, setRewards] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  const identity = useProfileStore((state) => state.identity);
  const headerHeight = useHeaderHeight();

  useEffect(() => {
    const fetchRewards = async () => {
      setIsFetching(true);
      try {
        // Fetch rewards from ICP
        const rewards = await getBackendActor(identity).getAllRewards();

        setRewards(rewards);
      } catch (error) {
        Alert.alert("Failed to fetch rewards", error);
      } finally {
        setIsFetching(false);
      }
    };

    fetchRewards();
  }, [identity]);

  const renderItem = useCallback(
    ({ item }) => (
      <RewardItem
        item={item}
        image={require("../assets/images/gcash.png")}
        onPress={() => console.log("Redeem Reward")}
      />
    ),
    []
  );

  if (isFetching) {
    return (
      <View style={globalStyles.flexFull}>
        <LinearGradient
          colors={[colors.primary, "rgba(0,0,0,0.3)"]}
          style={[StyleSheet.absoluteFill, { zIndex: -1, bottom: "80%" }]}
        />

        <View style={[globalStyles.flexCenter, { rowGap: sizes.large }]}>
          <ActivityIndicator size="large" />
          <Text style={{ color: colors.gray }}>Loading Rewards...</Text>
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
        colors={[colors.primary, "rgba(0,0,0,0.3)"]}
        style={[StyleSheet.absoluteFill, { zIndex: -1, bottom: "80%" }]}
      />

      <View
        style={{
          paddingBottom: sizes.xxlarge,
          rowGap: sizes.small,
        }}
      >
        <Text h1>Exchange Center</Text>
        <Text color={colors.gray}>
          Rewards for your hard work and dedication.
        </Text>
      </View>

      <FlatList
        data={rewards}
        renderItem={renderItem}
        contentContainerStyle={{
          rowGap: sizes.xlarge,
        }}
      />
    </View>
  );
};

export default Rewards;
