import Ionicons from "@expo/vector-icons/Ionicons";
import { useHeaderHeight } from "@react-navigation/elements";
import * as Burnt from "burnt";
import React, { useCallback, useMemo, useState } from "react";
import { FlatList, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button } from "react-native-ui-lib";

import globalStyles, { colors, sizes } from "../assets/styles/globalStyles";
import CommunityModal from "../components/CommunityModal";
import GradientIcon from "../components/GradientIcon";
import LargeHeader from "../components/LargeHeader";
import PostItem from "../components/PostItem";
import posts from "../consts/samplePosts";

const YourPosts = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  const headerHeight = useHeaderHeight();
  const insets = useSafeAreaInsets();

  const HeaderComponent = useMemo(
    () => (
      <LargeHeader
        icon={
          <GradientIcon
            icon="person"
            size={60}
            spacing={5}
            colors={[colors.primary, "white"]}
            gradientProps={{ locations: [0.4, 1] }}
          />
        }
        description="In this section, you can view your posts."
      />
    ),
    []
  );

  const onItemPressed = useCallback((post) => {
    setSelectedPost(post);
    setIsModalVisible(true);
  }, []);

  const onCloseModal = useCallback(() => {
    setIsModalVisible(false);
  }, []);

  const onClaimPoints = useCallback(() => {
    Burnt.alert({
      title: "Claiming points",
      preset: "spinner",
      message: "10 points to be claimed!",
      shouldDismissByTap: false,
    });

    // Simulating a delay
    setTimeout(() => {
      Burnt.dismissAllAlerts();

      Burnt.alert({
        title: "Points claimed",
        preset: "done",
        message: "10 points have been added to your account.",
        duration: 0.8,
      });
    }, 1500);
  }, []);

  const renderItem = useCallback(
    ({ item }) => (
      <PostItem item={item} onPress={() => onItemPressed(item)}>
        <Button
          label="Claim Points"
          link
          onPress={onClaimPoints}
          disabled={item.points === 0}
          style={{ opacity: item.points > 0 ? 1 : 0.5 }}
        >
          <Ionicons
            name="gift"
            size={20}
            color={item.points > 0 ? colors.primary : colors.gray}
            style={{ marginRight: sizes.small }}
          />
        </Button>
      </PostItem>
    ),
    [onItemPressed, onClaimPoints]
  );

  return (
    <View
      style={[
        globalStyles.flexFull,
        { paddingTop: headerHeight, paddingBottom: insets.bottom },
      ]}
    >
      <FlatList
        data={posts}
        ListHeaderComponent={HeaderComponent}
        contentContainerStyle={{
          rowGap: sizes.xlarge,
          paddingHorizontal: sizes.large,
        }}
        renderItem={renderItem}
      />

      <CommunityModal
        item={selectedPost}
        visible={isModalVisible}
        onClose={onCloseModal}
        isUser
      />
    </View>
  );
};

export default YourPosts;
