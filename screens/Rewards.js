import { useHeaderHeight } from "@react-navigation/elements";
import { LinearGradient } from "expo-linear-gradient";
import React, { useCallback } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Text } from "react-native-ui-lib";

import globalStyles, { colors, sizes } from "../assets/styles/globalStyles";
import RewardItem from "../components/RewardItem";
import rewards from "../consts/sampleRewards";

const Rewards = () => {
  const headerHeight = useHeaderHeight();

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
        <Text h1 white>
          Exchange Center
        </Text>
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
