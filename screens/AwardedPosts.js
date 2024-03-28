import { useHeaderHeight } from "@react-navigation/elements";
import React, { useCallback, useMemo, useState } from "react";
import { FlatList, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import globalStyles, { colors, sizes } from "../assets/styles/globalStyles";
import CommunityModal from "../components/CommunityModal";
import GradientIcon from "../components/GradientIcon";
import ListHeader from "../components/ListHeader";
import PostItem from "../components/PostItem";
import posts from "../consts/samplePosts";

const AwardedPosts = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  const headerHeight = useHeaderHeight();
  const insets = useSafeAreaInsets();

  const HeaderComponent = useMemo(
    () => (
      <ListHeader
        icon={
          <GradientIcon
            icon="star"
            size={60}
            spacing={5}
            colors={[colors.primary, "white"]}
            gradientProps={{ locations: [0.4, 1] }}
          />
        }
        description="In this section, you can view your awarded posts."
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

  const renderItem = useCallback(
    ({ item }) => <PostItem item={item} onPress={() => onItemPressed(item)} />,
    [onItemPressed]
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
      />
    </View>
  );
};

export default AwardedPosts;
