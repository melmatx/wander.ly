import Ionicons from "@expo/vector-icons/Ionicons";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import * as Burnt from "burnt";
import { Camera, CameraType, FlashMode, ImageType } from "expo-camera";
import { Image } from "expo-image";
import { manipulateAsync, FlipType } from "expo-image-manipulator";
import * as Location from "expo-location";
import React, {
  useCallback,
  useEffect,
  useMemo,
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
import Routes from "../navigation/Routes";
import { getBackendActor } from "../src/actor";
import useProfileStore from "../stores/useProfileStore";
import uploadFile from "../utils/uploadFile";

const flashReducer = (state) => {
  // switch between torch, auto, and off
  switch (state) {
    case FlashMode.torch:
      return FlashMode.auto;
    case FlashMode.auto:
      return FlashMode.off;
    case FlashMode.off:
      return FlashMode.torch;
    default:
      return FlashMode.off;
  }
};

const ShareJourney = ({ navigation, route }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [preview, setPreview] = useState(null);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [flashMode, toggleFlashMode] = useReducer(flashReducer, FlashMode.off);
  const [type, toggleType] = useReducer(
    (state) => (state === CameraType.back ? CameraType.front : CameraType.back),
    CameraType.back
  );

  const [permission, requestPermission] = Camera.useCameraPermissions();
  const identity = useProfileStore((state) => state.identity);
  const insets = useSafeAreaInsets();

  const cameraRef = useRef(null);
  const detailsSheetRef = useRef(null);

  const taskId = route.params?.taskId;

  useEffect(() => {
    requestPermission();
  }, []);

  const flashIcon = useMemo(() => {
    switch (flashMode) {
      case FlashMode.torch:
        return "flashlight";
      case FlashMode.auto:
        return "flash";
      default:
        return "flash-off";
    }
  }, [flashMode]);

  const flashColor = useMemo(() => {
    switch (flashMode) {
      case FlashMode.torch:
        return colors.primary;
      case FlashMode.off:
        return colors.gray;
      default:
        return "white";
    }
  }, [flashMode]);

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
      let picture = await cameraRef.current?.takePictureAsync({
        imageType: ImageType.jpg,
      });

      // Flip the image if the camera is front
      if (type === CameraType.front) {
        picture = await manipulateAsync(
          picture.uri,
          [{ flip: FlipType.Horizontal }],
          { base64: true }
        );
      }
      setPreview(picture);

      // Get the location of the user
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Highest,
      });
      const address = await Location.reverseGeocodeAsync({
        ...location.coords,
        accuracy: 1,
      });

      // Set the title to the location
      setTitle(`${address[0].street} ${address[0].city}, ${address[0].region}`);

      detailsSheetRef.current?.expand();
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "An error occurred while taking the picture.");
    } finally {
      setIsLoading(false);
    }
  }, [isCameraReady, type]);

  const uploadJourney = useCallback(
    async (file) => {
      Burnt.alert({
        title: "Uploading journey...",
        preset: "spinner",
        shouldDismissByTap: false,
      });

      const batch_name = `journey-${Date.now()}`;

      try {
        await uploadFile(batch_name, file);

        const { ok, err } = await getBackendActor(identity).createPost({
          taskId,
          title: title.trim(),
          content: description.trim(),
          imageKey: batch_name,
        });

        Burnt.dismissAllAlerts();

        if (err) {
          Burnt.alert({
            title: err.message,
            preset: "error",
            duration: 0.8,
          });
          return;
        }

        Burnt.alert({
          title: ok.message,
          preset: "done",
          duration: 0.8,
        });

        navigation.navigate(Routes.COMMUNITY, { refresh: true });
      } catch (err) {
        Burnt.dismissAllAlerts();
        Alert.alert("Error", err);
      }
    },
    [title, description, taskId, navigation]
  );

  const handlePostJourney = useCallback(async () => {
    if (!title || !description || !preview) {
      Alert.alert("Please fill all the fields.");
      return;
    }

    const response = await fetch(preview.uri);
    const blob = await response.blob();

    uploadJourney(blob);
  }, [title, description, preview, uploadJourney]);

  const onCloseDetailsSheet = useCallback(() => {
    Keyboard.dismiss();
    setTitle("");
    setDescription("");
    setPreview(null);
  }, []);

  const snapPoints = useMemo(() => ["85%"], []);

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
          <Camera
            ref={cameraRef}
            style={globalStyles.flexFull}
            onCameraReady={onCameraReady}
            flashMode={flashMode}
            type={type}
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
                onPress={toggleFlashMode}
                backgroundColor={
                  flashMode === FlashMode.torch && type === CameraType.back
                    ? "white"
                    : "rgba(255,255,255,0.2)"
                }
                enableShadow
              >
                <Ionicons name={flashIcon} size={35} color={flashColor} />
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
          </Camera>
        ) : (
          <View style={globalStyles.flexCenter}>
            <Text h3 color={colors.gray}>
              Camera permission required.
            </Text>
          </View>
        )}
      </View>

      <BottomSheet
        ref={detailsSheetRef}
        index={-1}
        snapPoints={snapPoints}
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
            item={{
              label: "Title",
              placeholder: "Enter the title",
              isViewing: true,
              color: "gray",
              h3: true,
            }}
          />

          <FormInput
            value={description}
            setData={setDescription}
            item={{
              label: "Description",
              placeholder: "Enter the description",
              isTextArea: true,
              h3: true,
            }}
          />

          <Button
            label="Post Journey"
            style={{ marginVertical: sizes.large }}
            onPress={handlePostJourney}
          />
        </BottomSheetScrollView>
      </BottomSheet>
    </>
  );
};

export default ShareJourney;
