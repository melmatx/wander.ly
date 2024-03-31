import Ionicons from "@expo/vector-icons/Ionicons";
import { Asset } from "expo-asset";
import { BlurView } from "expo-blur";
import * as FileSystem from "expo-file-system";
import { Image } from "expo-image";
import React, { memo, useCallback } from "react";
import {
  Modal,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Share from "react-native-share";
import { Button, FloatingButton, Text } from "react-native-ui-lib";

import SocialActions from "./SocialActions";
import TaskItem from "./TaskItem";
import globalStyles, { sizes } from "../assets/styles/globalStyles";

const FLOATING_BUTTON_HEIGHT = 100;

const CommunityModal = ({ item, visible, onClose }) => {
  const insets = useSafeAreaInsets();

  const onSharePost = useCallback(async () => {
    if (!item) {
      return;
    }

    const imageAsset = await Asset.loadAsync(item.image);
    const imageBase64 = await FileSystem.readAsStringAsync(
      imageAsset[0].localUri,
      { encoding: "base64" }
    );

    Share.open({
      title: "Share Post",
      filename: `${item.place}.png`,
      url: `data:image/png;base64, ${imageBase64}`,
      failOnCancel: false,
    });
  }, [item?.place]);

  if (!item) {
    return null;
  }

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <BlurView
        intensity={Platform.OS === "ios" ? 80 : 35}
        style={globalStyles.flexFull}
        experimentalBlurMethod="dimezisBlurView"
      >
        <SafeAreaView
          style={[globalStyles.flexFull, globalStyles.androidPadding]}
        >
          <ScrollView
            contentContainerStyle={{
              padding: sizes.large,
              paddingBottom: FLOATING_BUTTON_HEIGHT,
              rowGap: sizes.xlarge,
            }}
            showsVerticalScrollIndicator={false}
          >
            <View style={[globalStyles.rowCenter, globalStyles.spaceBetween]}>
              <View style={{ width: "80%" }}>
                <Text h2 white>
                  {item.place}
                </Text>
              </View>

              <Button link>
                <Ionicons
                  name="close-circle"
                  size={35}
                  color="rgba(255,255,255,0.6)"
                  onPress={onClose}
                />
              </Button>
            </View>

            <Image
              source={item.image}
              contentFit="cover"
              transition={100}
              style={{
                aspectRatio: 1,
                borderRadius: sizes.medium,
              }}
            />

            <View
              style={{
                borderBottomColor: "gray",
                borderBottomWidth: StyleSheet.hairlineWidth,
              }}
            />

            <Text h4 white>
              {item.content}
            </Text>

            <View style={{ marginHorizontal: sizes.medium }}>
              <SocialActions likeCount={item.likes} awardCount={item.awards} />
            </View>

            <View
              style={{
                borderBottomColor: "gray",
                borderBottomWidth: StyleSheet.hairlineWidth,
              }}
            />

            <View style={{ rowGap: sizes.medium }}>
              <Text white style={{ fontWeight: "bold", fontSize: 22 }}>
                Completed Task
              </Text>
              <TaskItem item={item.task} isUser={false} />
            </View>
          </ScrollView>

          <FloatingButton
            visible
            button={{
              semibold: true,
              label: "Share Post",
              onPress: onSharePost,
              children: (
                <Ionicons
                  name="share-outline"
                  size={20}
                  color="white"
                  style={{ marginRight: sizes.small }}
                />
              ),
            }}
            bottomMargin={insets.bottom + sizes.large}
          />
        </SafeAreaView>
      </BlurView>
    </Modal>
  );
};

export default memo(CommunityModal);
