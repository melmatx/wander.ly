import Ionicons from "@expo/vector-icons/Ionicons";
import { BlurView } from "expo-blur";
import { ImageBackground } from "expo-image";
import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useReducer,
} from "react";
import {
  Alert,
  Keyboard,
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
import getImageSource from "../utils/getImageSource";

const FLOATING_BUTTON_HEIGHT = 100;

const CommunityModal = ({ item, visible, onClose, isUser = false }) => {
  const [description, setDescription] = useState("");
  const [isExpanded, toggleExpanded] = useReducer((state) => !state, false);

  const insets = useSafeAreaInsets();
  const { updatePostContent, deletePost, sharePost } = usePostActions({ item });

  const previousDescription = useRef("");
  const editSheetRef = useRef(null);

  const snapPoints = useMemo(() => ["50%"], []);
  const imageSource = useMemo(
    () => getImageSource(item?.imageKey, item?.id),
    [item?.imageKey, item?.id]
  );

  useEffect(() => {
    if (!item) {
      return;
    }
    // Set the description
    setDescription(item.content);

    // Save the previous description
    previousDescription.current = item.content;
  }, [item?.content]);

  const onCloseSheet = useCallback(() => {
    editSheetRef.current?.close();
    Keyboard.dismiss();
  }, []);

  const onEditPost = useCallback(() => {
    editSheetRef.current?.expand();
  }, []);

  const onFinishEdit = useCallback(async () => {
    // Check if the description is the same as the previous one
    if (description === previousDescription.current) {
      console.log("No changes for description");
      onCloseSheet();
      return;
    }

    // Save the new description
    const err = await updatePostContent({ content: description });

    // Change the previous description
    if (!err) {
      previousDescription.current = description;
    }

    // Close the sheet
    onCloseSheet();
  }, [description, onCloseSheet, updatePostContent]);

  const onCancelEdit = useCallback(() => {
    setDescription(previousDescription.current);
  }, []);

  const handleDelete = useCallback(async () => {
    // Delete the post
    const err = await deletePost();

    if (!err) {
      onClose();
    }
  }, [deletePost, onClose]);

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
          <View
            style={[
              globalStyles.rowCenter,
              globalStyles.spaceBetween,
              { padding: sizes.large, paddingBottom: sizes.medium },
            ]}
          >
            <View style={{ width: "80%" }}>
              <Text h2>{item.title}</Text>
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

          <ScrollView
            contentContainerStyle={{
              padding: sizes.large,
              paddingTop: sizes.small,
              paddingBottom: FLOATING_BUTTON_HEIGHT,
              rowGap: sizes.xlarge,
            }}
            showsVerticalScrollIndicator={false}
          >
            <ImageBackground
              source={imageSource}
              contentFit="cover"
              transition={100}
              style={{
                aspectRatio: isExpanded ? 0.75 : 1,
                borderRadius: sizes.medium,
                padding: sizes.medium,
                overflow: "hidden",
                justifyContent: "flex-end",
                alignItems: "flex-end",
              }}
            >
              <Button
                onPress={toggleExpanded}
                backgroundColor="rgba(255,255,255,0.2)"
                enableShadow
                round
              >
                <Ionicons
                  name={isExpanded ? "contract" : "expand"}
                  size={20}
                  color="white"
                />
              </Button>
            </ImageBackground>

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
              <SocialActions item={item} />
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
        onClose={onCancelEdit}
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
              h3: true,
            }}
          />

          <Button label="Save" onPress={onFinishEdit} />
        </View>
      </BottomSheet>
    </Modal>
  );
};

export default memo(CommunityModal);
