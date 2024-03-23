import Ionicons from "@expo/vector-icons/Ionicons";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { CameraType } from "expo-camera";
import { CameraView, useCameraPermissions } from "expo-camera/next";
import { Image } from "expo-image";
import React, {
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import { ActivityIndicator, Alert, Keyboard, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button, Text } from "react-native-ui-lib";

import globalStyles, { colors, sizes } from "../assets/styles/globalStyles";
import BottomSheet from "../components/BottomSheet";
import FormInput from "../components/FormInput";

const ShareJourney = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [preview, setPreview] = useState(null);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();
  const [torch, toggleTorch] = useReducer((state) => !state, false);
  const [type, toggleType] = useReducer(
    (state) => (state === CameraType.back ? CameraType.front : CameraType.back),
    CameraType.back
  );

  const cameraRef = useRef(null);
  const detailsSheetRef = useRef(null);

  const insets = useSafeAreaInsets();

  useEffect(() => {
    requestPermission();
  }, []);

  const onCameraReady = useCallback(() => {
    setIsCameraReady(true);
  }, []);

  const handleCameraButton = useCallback(async () => {
    if (!isCameraReady) {
      Alert.alert("Camera is not ready.");
      return;
    }
    setIsLoading(true);

    try {
      const photo = await cameraRef.current?.takePictureAsync({ base64: true });
      setPreview(photo);
      detailsSheetRef.current?.expand();
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "An error occurred while taking the picture.");
    } finally {
      setIsLoading(false);
    }
  }, [isCameraReady]);

  const onCloseDetailsSheet = useCallback(() => {
    Keyboard.dismiss();
    setTitle("");
    setDescription("");
    setPreview(null);
  }, []);

  return (
    <>
      <View
        style={[
          globalStyles.flexFull,
          globalStyles.androidPadding,
          globalStyles.spaceBetween,
        ]}
      >
        {permission?.granted ? (
          <CameraView
            ref={cameraRef}
            style={globalStyles.flexFull}
            onCameraReady={onCameraReady}
            enableTorch={torch}
            facing={type}
          >
            <View
              style={[
                globalStyles.rowCenter,
                {
                  alignSelf: "center",
                  position: "absolute",
                  bottom: insets.bottom + sizes.xxlarge,
                  columnGap: sizes.xxlarge,
                },
              ]}
            >
              <Button
                onPress={toggleTorch}
                backgroundColor={torch ? "white" : "rgba(255,255,255,0.2)"}
                disabled={type === CameraType.front}
                enableShadow
              >
                <Ionicons
                  name="flashlight"
                  size={35}
                  color={torch ? colors.primary : "white"}
                />
              </Button>

              <Button
                onPress={handleCameraButton}
                backgroundColor={colors.primary}
                enableShadow
              >
                {isLoading ? (
                  <View
                    style={[globalStyles.flexCenter, { width: 35, height: 35 }]}
                  >
                    <ActivityIndicator color="white" />
                  </View>
                ) : (
                  <Ionicons name="camera" size={35} color="white" />
                )}
              </Button>

              <Button
                onPress={toggleType}
                backgroundColor="rgba(255,255,255,0.2)"
                enableShadow
              >
                <Ionicons name="camera-reverse" size={35} color="white" />
              </Button>
            </View>
          </CameraView>
        ) : (
          <View style={globalStyles.flexCenter}>
            <Text h2>Camera permission required.</Text>
          </View>
        )}
      </View>

      <BottomSheet
        ref={detailsSheetRef}
        index={-1}
        snapPoints={["85%"]}
        enablePanDownToClose
        onClose={onCloseDetailsSheet}
      >
        <BottomSheetScrollView
          contentContainerStyle={{
            flexGrow: 1,
            rowGap: sizes.large,
            padding: sizes.large,
          }}
        >
          {preview && (
            <Image
              source={{ uri: preview.uri }}
              contentFit="scale-down"
              style={{
                height: "40%",
                width: "100%",
                borderRadius: sizes.medium,
              }}
            />
          )}
          <FormInput
            value={title}
            setData={setTitle}
            item={{
              label: "Title",
              placeholder: "Enter the title",
              h2: true,
            }}
          />

          <FormInput
            value={description}
            setData={setDescription}
            item={{
              label: "Description",
              placeholder: "Enter the description",
              isTextArea: true,
              h2: true,
            }}
          />

          <Button
            label="Post Journey"
            style={{ marginVertical: sizes.large }}
          />
        </BottomSheetScrollView>
      </BottomSheet>
    </>
  );
};

export default ShareJourney;
