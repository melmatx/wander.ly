import Ionicons from "@expo/vector-icons/Ionicons";
import * as Burnt from "burnt";
import { CameraView, useCameraPermissions } from "expo-camera/next";
import React, { useCallback, useEffect, useReducer, useState } from "react";
import { Alert, View } from "react-native";
import BarcodeMask from "react-native-barcode-mask";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button, Text } from "react-native-ui-lib";
import { useShallow } from "zustand/react/shallow";

import globalStyles, { colors, sizes } from "../assets/styles/globalStyles";
import { getBackendActor } from "../src/actor";
import useProfileStore from "../stores/useProfileStore";

const ScanCode = ({ route }) => {
  const [prevCode, setPrevCode] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const [torch, toggleTorch] = useReducer((state) => !state, false);
  const [permission, requestPermission] = useCameraPermissions();

  const stackView = route.params?.stackView;

  const { identity, fetchProfile } = useProfileStore(
    useShallow((state) => ({
      identity: state.identity,
      fetchProfile: state.fetchProfile,
    }))
  );
  const insets = useSafeAreaInsets();

  useEffect(() => {
    requestPermission();
  }, []);

  const onQRScanned = useCallback(
    async ({ data }) => {
      console.log(data);

      if (data === prevCode || isFetching) {
        return;
      }
      setPrevCode(data);
      setIsFetching(true);

      Burnt.alert({
        title: "Redeeming points...",
        preset: "spinner",
        shouldDismissByTap: false,
      });

      try {
        const { ok, err } = await getBackendActor(identity).redeemReward({
          code: data,
        });

        if (err) {
          Burnt.alert({
            title: err.message,
            preset: "error",
            duration: 0.8,
          });
          return;
        }

        Burnt.dismissAllAlerts();

        Burnt.alert({
          title: ok.message,
          preset: "custom",
          icon: { ios: { name: "checkmark.seal.fill" } },
          duration: 0.8,
        });

        await fetchProfile();
      } catch (error) {
        Alert.alert("Failed to redeem reward", error);
      } finally {
        setIsFetching(false);
      }
    },
    [fetchProfile, identity, isFetching, prevCode]
  );

  return (
    <View style={[globalStyles.flexFull, globalStyles.spaceBetween]}>
      {permission?.granted ? (
        <CameraView
          style={globalStyles.flexFull}
          enableTorch={torch}
          barCodeScannerSettings={{
            barCodeTypes: ["qr"],
            interval: 500,
          }}
          onBarcodeScanned={onQRScanned}
          mute
        >
          <BarcodeMask
            edgeColor={colors.primary}
            showAnimatedLine={false}
            height={stackView ? "40%" : "35%"}
          />
          <Button
            onPress={toggleTorch}
            backgroundColor={torch ? "white" : "rgba(255,255,255,0.2)"}
            style={{
              alignSelf: "center",
              position: "absolute",
              bottom: insets.bottom + sizes.xxlarge,
            }}
            enableShadow
          >
            <Ionicons
              name="flashlight"
              size={35}
              color={torch ? colors.primary : "white"}
            />
          </Button>
        </CameraView>
      ) : (
        <View style={globalStyles.flexCenter}>
          <Text h3 color={colors.gray}>
            Camera permission required.
          </Text>
        </View>
      )}
    </View>
  );
};

export default ScanCode;
