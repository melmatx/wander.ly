import Ionicons from "@expo/vector-icons/Ionicons";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import React, { useCallback } from "react";
import { SafeAreaView, View, StyleSheet } from "react-native";
import GradientShimmer from "react-native-gradient-shimmer";
import { Button, Text } from "react-native-ui-lib";

import globalStyles, { colors, sizes } from "../assets/styles/globalStyles";
import Routes from "../navigation/Routes";

const Wallet = ({ navigation, route }) => {
  const onRedeemRewards = useCallback(() => {
    navigation.navigate(Routes.REWARDS);
  }, [navigation]);

  const onDonatePoints = useCallback(() => {
    console.log("Donate Points");
  }, []);

  return (
    <SafeAreaView style={globalStyles.flexFull}>
      <View style={{ padding: sizes.large }}>
        <View style={[globalStyles.rowCenter, globalStyles.spaceBetween]}>
          <Text h1 white>
            {route.name}
          </Text>

          <Button link onPress={() => console.log("Connect Wallet")}>
            <Ionicons name="add" size={30} color="white" />
          </Button>
        </View>
      </View>

      <View style={{ padding: sizes.large }}>
        <Button link activeOpacity={0.8} enableShadow>
          <LinearGradient
            colors={[colors.dark, colors.primary]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={[
              globalStyles.rowCenter,
              globalStyles.spaceBetween,
              {
                padding: sizes.large,
                rowGap: sizes.large,
                borderRadius: sizes.medium,
              },
            ]}
          >
            <GradientShimmer
              LinearGradientComponent={LinearGradient}
              height={250}
              width={500}
              duration={4000}
              highlightWidth={140}
              highlightColor="rgba(255, 255, 255, 0.1)"
              backgroundColor="transparent"
              style={StyleSheet.absoluteFill}
            />

            <Image
              source={require("../assets/images/card-mask.png")}
              style={StyleSheet.absoluteFill}
              contentFit="cover"
            />
            <View>
              <Image
                source={require("../assets/adaptive-icon.png")}
                style={{ height: 50, width: 50, marginBottom: 120 }}
              />

              <View
                style={[
                  globalStyles.rowCenter,
                  globalStyles.spaceBetween,
                  { width: "100%" },
                ]}
              >
                <View style={{ rowGap: sizes.small }}>
                  <Text h2 white>
                    0.00
                  </Text>
                  <Text h4 white>
                    Total Points
                  </Text>
                </View>

                <View style={{ padding: sizes.small }}>
                  <Text h2 color={colors.tertiary}>
                    04/20
                  </Text>
                </View>
              </View>
            </View>
          </LinearGradient>
        </Button>

        <View style={{ marginTop: sizes.xxlarge, rowGap: sizes.xlarge }}>
          <Button
            semibold
            label="Redeem Rewards"
            onPress={onRedeemRewards}
            style={{ columnGap: sizes.small }}
          >
            <Ionicons name="gift" size={25} color="white" />
          </Button>

          <Button
            semibold
            label="Donate Points"
            outline
            outlineColor={colors.primary}
            onPress={onDonatePoints}
            style={{ columnGap: sizes.small }}
          >
            <Ionicons
              name="add-circle-outline"
              size={25}
              color={colors.primary}
            />
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Wallet;
