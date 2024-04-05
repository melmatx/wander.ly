import Ionicons from "@expo/vector-icons/Ionicons";
import { BlurView } from "expo-blur";
import { Image } from "expo-image";
import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Alert,
  Modal,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button, FloatingButton, Text } from "react-native-ui-lib";

import FormInput from "./FormInput";
import SocialActions from "./SocialActions";
import TaskItem from "./TaskItem";
import globalStyles, { colors, sizes } from "../assets/styles/globalStyles";
import BottomSheet from "../components/BottomSheet";
import usePostActions from "../hooks/usePostActions";

const FLOATING_BUTTON_HEIGHT = 100;

const CommunityModal = ({ item, visible, onClose, isUser = false }) => {
  const [description, setDescription] = useState("");

  const insets = useSafeAreaInsets();
  const { sharePost } = usePostActions(item);

  const editSheetRef = useRef(null);

  const snapPoints = useMemo(() => ["50%"], []);

  useEffect(() => {
    if (!item) {
      return;
    }
    setDescription(item.content);
  }, [item?.content]);

  const onEditPost = useCallback(() => {
    editSheetRef.current?.expand();
  }, []);

  const onFinishEdit = useCallback(() => {
    editSheetRef.current?.close();
  }, []);

  const handleDelete = useCallback(() => {
    onClose();
  }, []);

  const onDeletePost = useCallback(() => {
    Alert.alert("Delete Post", "Are you sure you want to delete this post?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: handleDelete,
      },
    ]);
  }, [handleDelete]);

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
                <Text h2>{item.place}</Text>
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

            <Text h4>{item.content}</Text>

            <View
              style={[
                globalStyles.center,
                globalStyles.spaceBetween,
                {
                  marginHorizontal: sizes.small,
                  flexDirection: "row-reverse",
                },
              ]}
            >
              {isUser && (
                <Button
                  link
                  label="Edit"
                  color={colors.gray}
                  onPress={onEditPost}
                >
                  <Ionicons
                    name="create-outline"
                    size={20}
                    color={colors.gray}
                    style={{ marginRight: sizes.small }}
                  />
                </Button>
              )}
              <SocialActions likeCount={item.likes} awardCount={item.awards} />
            </View>

            <View
              style={{
                borderBottomColor: "gray",
                borderBottomWidth: StyleSheet.hairlineWidth,
              }}
            />

            <View style={{ rowGap: sizes.medium }}>
              <Text style={{ fontWeight: "bold", fontSize: 22 }}>
                Completed Task
              </Text>
              <TaskItem item={item.task} isUser={isUser} />
            </View>

            {isUser && (
              <>
                <View
                  style={{
                    borderBottomColor: "gray",
                    borderBottomWidth: StyleSheet.hairlineWidth,
                  }}
                />

                <Button
                  label="Delete Post"
                  color={colors.red}
                  onPress={onDeletePost}
                  link
                  semibold
                >
                  <Ionicons
                    name="trash-outline"
                    size={20}
                    color={colors.red}
                    style={{ marginRight: sizes.small }}
                  />
                </Button>
              </>
            )}
          </ScrollView>

          <FloatingButton
            visible
            button={{
              semibold: true,
              label: "Share Post",
              onPress: sharePost,
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

      <BottomSheet
        ref={editSheetRef}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose
      >
        <View
          style={[
            globalStyles.flexFull,
            { padding: sizes.large, rowGap: sizes.large },
          ]}
        >
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

          <Button label="Save" onPress={onFinishEdit} />
        </View>
      </BottomSheet>
    </Modal>
  );
};

export default memo(CommunityModal);
