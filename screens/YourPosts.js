import { useHeaderHeight } from "@react-navigation/elements";
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";
import { ActivityIndicator, Alert, FlatList, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button, Text } from "react-native-ui-lib";

import globalStyles, { colors, sizes } from "../assets/styles/globalStyles";
import CommunityModal from "../components/CommunityModal";
import GradientIcon from "../components/GradientIcon";
import LargeHeader from "../components/LargeHeader";
import PostItem from "../components/PostItem";
import PostSyncContext from "../contexts/PostSyncContext";
import usePostActions from "../hooks/usePostActions";
import { getBackendActor } from "../src/actor";
import useProfileStore from "../stores/useProfileStore";
import normalizePostsData from "../utils/normalizePostsData";

const YourPosts = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const { claimAllPostPoints } = usePostActions({
    setPostsFromArg: setPosts,
    setSelectedPostFromArg: setSelectedPost,
  });
  const identity = useProfileStore((state) => state.identity);
  const headerHeight = useHeaderHeight();
  const insets = useSafeAreaInsets();

  useEffect(() => {
    const fetchYourPosts = async () => {
      setIsFetching(true);
      try {
        // Fetch your posts from ICP
        const posts = await getBackendActor(identity).getPostsByUser({
          userId: [],
        });
        const normalizedPosts = normalizePostsData(posts);

        setPosts(normalizedPosts);
      } catch (error) {
        Alert.alert("Failed to fetch your posts", error);
      } finally {
        setIsFetching(false);
      }
    };

    fetchYourPosts();
  }, [identity]);

  const ListHeaderComponent = useMemo(
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

  const ListEmptyComponent = useMemo(
    () => (
      <View style={[globalStyles.flexCenter, { padding: sizes.large }]}>
        <Text h4 color={colors.gray}>
          No posts yet.
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
    ({ item }) => (
      <PostItem item={item} onPress={() => onItemPressed(item)} isUser />
    ),
    [onItemPressed]
  );

  const headerRight = useCallback(() => {
    if (isFetching) {
      return null;
    }

    return (
      <Button
        label="Claim All"
        link
        onPress={claimAllPostPoints}
        disabled={posts.every((post) => post.points === 0)}
      />
    );
  }, [claimAllPostPoints, isFetching, posts]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight,
    });
  }, [headerRight, navigation]);

  if (isFetching) {
    return (
      <View style={[globalStyles.flexFull, { paddingTop: headerHeight }]}>
        {ListHeaderComponent}

        <View style={[globalStyles.flexCenter, { rowGap: sizes.large }]}>
          <ActivityIndicator size="large" />
          <Text style={{ color: colors.gray }}>Loading Your Posts...</Text>
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
      </View>

      <CommunityModal
        item={selectedPost}
        visible={isModalVisible}
        onClose={onCloseModal}
        isUser
      />
    </PostSyncContext.Provider>
  );
};

export default YourPosts;
