import Ionicons from "@expo/vector-icons/Ionicons";
import * as Burnt from "burnt";
import { format } from "date-fns";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import React, { useCallback, useMemo, useRef } from "react";
import { SafeAreaView, View, StyleSheet, Dimensions } from "react-native";
import GradientShimmer from "react-native-gradient-shimmer";
import QRCode from "react-native-qrcode-svg";
import { Button, Text } from "react-native-ui-lib";

import globalStyles, { colors, sizes } from "../assets/styles/globalStyles";
import AppHeader from "../components/AppHeader";
import CardFlip from "../components/CardFlip";
import Routes from "../navigation/Routes";
import useAuthStore from "../stores/useAuthStore";
import useProfileStore from "../stores/useProfileStore";
import authenticateLocally from "../utils/authenticateLocally";

const { width, height } = Dimensions.get("window");

const Wallet = ({ navigation }) => {
  const principal = useAuthStore((state) => state.principal);
  const profile = useProfileStore((state) => state.profile);

  const cardRef = useRef(null);
  const qrCodeRef = useRef(null);

  const onConnectWallet = useCallback(async () => {
    await authenticateLocally({
      onSuccess: () =>
        Burnt.alert({
          title: "Wallet Added",
          preset: "done",
          message: "You have successfully added a wallet",
          duration: 0.8,
        }),
    });
  }, []);

  const onRedeemRewards = useCallback(() => {
    navigation.navigate(Routes.REWARDS);
  }, [navigation]);

  const onDonatePoints = useCallback(async () => {
    await authenticateLocally({
      onSuccess: () =>
        Burnt.alert({
          title: "Points Donated",
          preset: "done",
          message: "You have successfully donated points",
          duration: 0.8,
        }),
    });
  }, []);

  const renderWalletShimmer = useMemo(
    () => (
      <GradientShimmer
        LinearGradientComponent={LinearGradient}
        height={height / 3.35}
        width={width}
        duration={4000}
        highlightWidth={140}
        highlightColor="rgba(255, 255, 255, 0.1)"
        backgroundColor="transparent"
        style={StyleSheet.absoluteFill}
      />
    ),
    []
  );

  const renderWalletFront = useMemo(
    () => (
      <LinearGradient
        colors={[colors.dark, colors.primary]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[
          StyleSheet.absoluteFill,
          globalStyles.flexFull,
          {
            borderRadius: sizes.medium,
            padding: sizes.large,
          },
        ]}
      >
        {renderWalletShimmer}

        <Image
          source={require("../assets/images/card-mask.png")}
          style={StyleSheet.absoluteFill}
          contentFit="cover"
        />

        <View style={globalStyles.flexFull}>
          <Image
            source={require("../assets/adaptive-icon.png")}
            style={{ height: 50, width: 50 }}
          />
        </View>

        <View
          style={[
            globalStyles.flexFull,
            globalStyles.rowCenter,
            globalStyles.spaceBetween,
            { alignItems: "flex-end", padding: sizes.small },
          ]}
        >
          <View style={{ rowGap: sizes.small }}>
            <Text h2 color="lightcyan">
              {profile.points.toFixed(2)}
            </Text>
            <Text h4 color="lightcyan">
              Total Points
            </Text>
          </View>

          <Text h2 color="azure">
            {format(profile.createdAt, "MM/dd")}
          </Text>
        </View>
      </LinearGradient>
    ),
    [profile]
  );

  const renderWalletBack = useMemo(
    () => (
      <LinearGradient
        colors={[colors.dark, colors.primary]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[
          StyleSheet.absoluteFill,
          globalStyles.flexFull,
          {
            borderRadius: sizes.medium,
            padding: sizes.large,
          },
        ]}
      >
        {renderWalletShimmer}

        <Image
          source={require("../assets/images/card-mask.png")}
          style={StyleSheet.absoluteFill}
          contentFit="cover"
        />

        <View
          style={[
            globalStyles.flexFull,
            globalStyles.rowCenter,
            globalStyles.spaceBetween,
          ]}
        >
          <View style={{ width: "40%", rowGap: sizes.large }}>
            <Image
              source={require("../assets/adaptive-icon.png")}
              style={{ height: 50, width: 50 }}
            />
            <Text color="azure">Please scan the QR Code to the vendor</Text>
          </View>

          <QRCode
            getRef={(ref) => (qrCodeRef.current = ref)}
            value={principal}
            enableLinearGradient
            linearGradient={[colors.primary, colors.pink]}
            size={height / 5}
            backgroundColor="transparent"
          />
        </View>
      </LinearGradient>
    ),
    [principal]
  );

  return (
    <SafeAreaView style={[globalStyles.flexFull, globalStyles.androidPadding]}>
      <AppHeader>
        <Button link onPress={onConnectWallet}>
          <Ionicons name="add" size={30} color="white" />
        </Button>
      </AppHeader>

      <View style={{ rowGap: sizes.large, padding: sizes.large }}>
        <Button
          link
          activeOpacity={0.8}
          enableShadow
          onPress={() => cardRef.current?.flip()}
          style={{ height: "48%", width: "100%" }}
        >
          <CardFlip ref={cardRef} style={StyleSheet.absoluteFill}>
            {renderWalletFront}
            {renderWalletBack}
          </CardFlip>
        </Button>

        <View style={{ marginTop: sizes.xlarge, rowGap: sizes.xlarge }}>
          <Button semibold label="Redeem Rewards" onPress={onRedeemRewards}>
            <Ionicons
              name="gift"
              size={25}
              color="white"
              style={{ marginRight: sizes.small }}
            />
          </Button>

          <Button
            semibold
            label="Donate Points"
            outline
            outlineColor={colors.primary}
            onPress={onDonatePoints}
          >
            <Ionicons
              name="add-circle-outline"
              size={25}
              color={colors.primary}
              style={{ marginRight: sizes.small }}
            />
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Wallet;
