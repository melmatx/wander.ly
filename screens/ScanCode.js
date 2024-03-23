import Ionicons from "@expo/vector-icons/Ionicons";
import { CameraView, useCameraPermissions } from "expo-camera/next";
import React, { useCallback, useEffect, useReducer, useState } from "react";
import { SafeAreaView, View } from "react-native";
import BarcodeMask from "react-native-barcode-mask";
import { Button, Text } from "react-native-ui-lib";

import globalStyles, { colors, sizes } from "../assets/styles/globalStyles";

const ScanCode = ({ route }) => {
  const [code, setCode] = useState("");
  const [torch, toggleTorch] = useReducer((state) => !state, false);
  const [permission, requestPermission] = useCameraPermissions();

  const stackView = route.params?.stackView;

  useEffect(() => {
    requestPermission();
  }, []);

  const onQRScanned = useCallback(
    ({ data }) => {
      console.log(data);
      if (data === code) {
        return;
      }
      // Do something with the scanned QR code

      setCode(data);
    },
    [code]
  );

  return (
    <SafeAreaView style={[globalStyles.flexFull, globalStyles.androidPadding]}>
      <View style={[globalStyles.flexFull, globalStyles.spaceBetween]}>
        {permission?.granted ? (
          <CameraView
            style={globalStyles.flexFull}
            enableTorch={torch}
            barCodeScannerSettings={{
              barCodeTypes: ["qr"],
            }}
            onBarcodeScanned={onQRScanned}
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
                bottom: sizes.xxlarge,
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
            <Text h2>Camera permission required.</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default ScanCode;
