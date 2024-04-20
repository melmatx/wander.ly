import { useHeaderHeight } from "@react-navigation/elements";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { ActivityIndicator, Alert, FlatList, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Text } from "react-native-ui-lib";

import globalStyles, { colors, sizes } from "../assets/styles/globalStyles";
import CommunityModal from "../components/CommunityModal";
import GradientIcon from "../components/GradientIcon";
import LargeHeader from "../components/LargeHeader";
import PostItem from "../components/PostItem";
import PostSyncContext from "../contexts/PostSyncContext";
import { getBackendActor } from "../src/actor";
import useProfileStore from "../stores/useProfileStore";
import normalizePostsData from "../utils/normalizePostsData";

const AwardedPosts = () => {
  const [posts, setPosts] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const identity = useProfileStore((state) => state.identity);
  const headerHeight = useHeaderHeight();
  const insets = useSafeAreaInsets();

  useEffect(() => {
    const fetchAwardedPosts = async () => {
      setIsFetching(true);
      try {
        // Fetch awarded posts from ICP
        const posts = await getBackendActor(identity).getPostAwardsByUser({
          userId: [],
        });
        const normalizedPosts = normalizePostsData(posts);

        setPosts(normalizedPosts);
      } catch (error) {
        Alert.alert("Failed to fetch awarded posts", error);
      } finally {
        setIsFetching(false);
      }
    };

    fetchAwardedPosts();
  }, [identity]);

  const ListHeaderComponent = useMemo(
    () => (
      <LargeHeader
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

  const ListEmptyComponent = useMemo(
    () => (
      <View style={[globalStyles.flexCenter, { padding: sizes.large }]}>
        <Text h4 color={colors.gray}>
          No posts awarded yet.
        </Text>
      </View>
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

  if (isFetching) {
    return (
      <View style={[globalStyles.flexFull, { paddingTop: headerHeight }]}>
        {ListHeaderComponent}

        <View style={[globalStyles.flexCenter, { rowGap: sizes.large }]}>
          <ActivityIndicator size="large" />
          <Text style={{ color: colors.gray }}>Loading Awarded Posts...</Text>
        </View>
      </View>
    );
  }

  return (
    <PostSyncContext.Provider value={{ setPosts, setSelectedPost }}>
      <View
        style={[
          globalStyles.flexFull,
          { paddingTop: headerHeight, paddingBottom: insets.bottom },
        ]}
      >
        <FlatList
          data={posts}
          ListHeaderComponent={ListHeaderComponent}
          ListEmptyComponent={ListEmptyComponent}
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
    </PostSyncContext.Provider>
  );
};

export default AwardedPosts;
