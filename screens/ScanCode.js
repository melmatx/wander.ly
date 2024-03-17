import Ionicons from "@expo/vector-icons/Ionicons";
import { useIsFocused } from "@react-navigation/native";
import { CameraView, useCameraPermissions } from "expo-camera/next";
import { StatusBar } from "expo-status-bar";
import React, { useCallback, useEffect, useReducer, useState } from "react";
import { Alert, SafeAreaView, Text, View } from "react-native";
import BarcodeMask from "react-native-barcode-mask";
import { BorderlessButton } from "react-native-gesture-handler";
import { Button } from "react-native-ui-lib";

import globalStyles, { colors, sizes } from "../assets/styles/globalStyles";
import textStyles from "../assets/styles/textStyles";
import ROLES from "../consts/roles";
import Routes from "../navigation/Routes";
import useProfileStore from "../stores/useProfileStore";

const ScanCode = ({ navigation, route }) => {
  const [code, setCode] = useState("");
  const [torch, toggleTorch] = useReducer((state) => !state, false);
  const [permission, requestPermission] = useCameraPermissions();
  const isFocused = useIsFocused();
  const storedRole = useProfileStore((state) => state.role);

  const { role } = route.params;

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

      const handleAttendance = (data) => {
        const { student, attendance, subject } = JSON.parse(data) || {};

        if (student && attendance && subject) {
          Alert.alert(
            "Attendance",
            `You are about to mark attendance for ${student} in ${subject}`,
            [
              {
                text: "Cancel",
                style: "cancel",
                onPress: () => {
                  console.log("Cancel Pressed");

                  setCode("");
                },
              },
              {
                text: "OK",
                onPress: () => {
                  Alert.alert(
                    `A notification has been sent to ${student}'s for ${attendance}`
                  );
                },
              },
            ]
          );
        }
      };

      const hanndleJoinClass = (data) => {
        const {
          sectionCode,
          subjectCode,
          departmentCode,
          branchName,
          programCode,
        } = JSON.parse(data) || {};

        if (
          sectionCode &&
          subjectCode &&
          departmentCode &&
          branchName &&
          programCode
        ) {
          Alert.alert(
            "Join Class",
            `You are about to join ${sectionCode}'s class for ${subjectCode}`,
            [
              {
                text: "Cancel",
                style: "cancel",
                onPress: () => {
                  console.log("Cancel Pressed");

                  setCode("");
                },
              },
              {
                text: "OK",
                onPress: () => {
                  Alert.alert(
                    `Joined ${sectionCode}'s class for ${subjectCode}`
                  );

                  navigation.navigate(Routes.SIGN_UP, { role: ROLES.STUDENT });
                },
              },
            ]
          );
        }
      };

      const selectedRole = role ?? selectedRole;

      if (selectedRole === ROLES.TEACHER) {
        handleAttendance(data);
      }

      if (selectedRole === ROLES.STUDENT) {
        hanndleJoinClass(data);
      }

      setCode(data);
    },
    [code, storedRole, role]
  );

  return (
    <SafeAreaView style={[globalStyles.flexFull, globalStyles.androidPadding]}>
      {isFocused && <StatusBar style="dark" />}

      {stackView && (
        <View
          style={{ paddingHorizontal: sizes.large, paddingTop: sizes.large }}
        >
          <View
            style={{
              marginTop: sizes.medium,
              marginBottom: sizes.xlarge,
            }}
          >
            <View style={[globalStyles.rowCenter, { columnGap: sizes.medium }]}>
              <BorderlessButton onPress={() => navigation.goBack()}>
                <Ionicons
                  name="chevron-back"
                  size={35}
                  color={colors.primary}
                />
              </BorderlessButton>
              <Text style={textStyles.heading}>{route.name}</Text>
            </View>
          </View>
        </View>
      )}

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
                bottom: 30,
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
            <Text style={textStyles.subTitle}>Camera permission required.</Text>
          </View>
        )}

        {stackView && (
          <View
            style={{
              paddingHorizontal: sizes.large,
              paddingBottom: sizes.large,
            }}
          >
            <Button
              label="Continue"
              labelStyle={textStyles.subTitle}
              style={{
                marginHorizontal: sizes.xlarge,
                marginVertical: sizes.medium,
              }}
              enableShadow
              disabled={!code}
              onPress={() =>
                navigation.navigate(Routes.SIGN_UP, {
                  role: ROLES.STUDENT,
                  code,
                })
              }
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default ScanCode;
