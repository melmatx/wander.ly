import React, { useCallback } from "react";
import { FlatList, View } from "react-native";
import { Text } from "react-native-ui-lib";

import globalStyles, { colors, sizes } from "../assets/styles/globalStyles";
import RewardItem from "../components/RewardItem";
import rewards from "../consts/sampleRewards";

const Rewards = () => {
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
    <View style={[globalStyles.flexFull, { padding: sizes.large }]}>
      <View
        style={{
          paddingTop: sizes.small,
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
