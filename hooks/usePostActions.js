import * as Burnt from "burnt";
import { useCallback, useContext } from "react";
import { Alert } from "react-native";
import Share from "react-native-share";
import { useShallow } from "zustand/react/shallow";

import AwardTypes from "../consts/awardTypes";
import LikeTypes from "../consts/likeTypes";
import PostSyncContext from "../contexts/PostSyncContext";
import { getBackendActor } from "../src/actor";
import useProfileStore from "../stores/useProfileStore";
import authenticateLocally from "../utils/authenticateLocally";

const usePostActions = ({ item, setPostsFromArg, setSelectedPostFromArg }) => {
  const { identity, fetchProfile } = useProfileStore(
    useShallow((state) => ({
      identity: state.identity,
      fetchProfile: state.fetchProfile,
    }))
  );
  const {
    setPosts: setPostsFromContext,
    setSelectedPost: setSelectedPostFromContext,
  } = useContext(PostSyncContext) || {};

  const setPosts = setPostsFromArg || setPostsFromContext;
  const setSelectedPost = setSelectedPostFromArg || setSelectedPostFromContext;

  const likeOrDislikePost = useCallback(
    async ({ type }) => {
      if (!item.id || !identity) {
        console.warn("Post id or identity is missing");
        return;
      }

      if (type === LikeTypes.DISLIKE && !item.isLiked) {
        Burnt.toast({
          title: "Post Disliked",
          preset: "custom",
          icon: { ios: { name: "heart.slash.fill" } },
          duration: 0.8,
        });
        return;
      }

      if (type === LikeTypes.LIKE && item.isLiked) {
        Burnt.toast({
          title: "Post Liked",
          preset: "custom",
          icon: { ios: { name: "heart.fill" } },
          duration: 0.8,
        });
        return;
      }

      Burnt.alert({
        title: type === LikeTypes.LIKE ? "Liking post..." : "Disliking post...",
        preset: "spinner",
        shouldDismissByTap: false,
      });

      const { ok, err } = await getBackendActor(identity).likeOrDislikePost({
        postId: item.id,
        likeType: type,
      });

      Burnt.dismissAllAlerts();

      if (err) {
        Burnt.alert({
          title: err.message,
          preset: "error",
          duration: 0.8,
        });
        return { error: err };
      }

      // Update the post
      let newPost;

      setPosts((prevPosts) => {
        return prevPosts.map((post) => {
          if (post.id === item.id) {
            newPost = {
              ...post,
              isLiked: !post.isLiked,
              likes: post.isLiked
                ? post.likes - BigInt(1)
                : post.likes + BigInt(1),
            };
            return newPost;
          }
          return post;
        });
      });

      if (newPost) {
        setSelectedPost(newPost);
      }

      Burnt.alert({
        title: ok.message,
        preset: "custom",
        icon: {
          ios: {
            name: type === LikeTypes.LIKE ? "heart.fill" : "heart.slash.fill",
          },
        },
        duration: 0.8,
      });
    },
    [item?.id, item?.isLiked, identity]
  );

  const handleAwardPost = useCallback(
    async (type, onFail) => {
      if (!item.id || !identity) {
        console.warn("Post id or identity is missing");
        return;
      }

      await authenticateLocally({
        onSuccess: async () => {
          Burnt.alert({
            title: "Awarding post...",
            preset: "spinner",
            shouldDismissByTap: false,
          });

          const { ok, err } = await getBackendActor(identity).awardPost({
            postId: item.id,
            awardType: type,
          });

          Burnt.dismissAllAlerts();

          if (err) {
            Burnt.alert({
              title: err.message,
              preset: "error",
              duration: 0.8,
            });
            return { error: err };
          }

          // Update the post
          let newPost;

          setPosts((prevPosts) => {
            return prevPosts.map((post) => {
              if (post.id === item.id) {
                newPost = {
                  ...post,
                  isAwarded: true,
                  awards: post.awards + BigInt(1),
                };
                return newPost;
              }
              return post;
            });
          });

          if (newPost) {
            setSelectedPost(newPost);
          }

          Burnt.alert({
            title: ok.message,
            preset: "custom",
            icon: { ios: { name: "star.circle.fill" } },
            duration: 0.8,
          });

          await fetchProfile();
        },
        onError: onFail,
        errorOnUnavailable: false,
      });
    },
    [item?.id, identity, fetchProfile]
  );

  const awardPost = useCallback(
    async ({ onFail }) => {
      Alert.alert("Award Type", "Select the type of award you want to give", [
        {
          text: "Gold (30)",
          onPress: () => handleAwardPost(AwardTypes.GOLD, onFail),
        },
        {
          text: "Silver (20)",
          onPress: () => handleAwardPost(AwardTypes.SILVER, onFail),
        },
        {
          text: "Bronze (10)",
          onPress: () => handleAwardPost(AwardTypes.BRONZE, onFail),
        },
        {
          text: "Cancel",
          style: "cancel",
          onPress: onFail,
        },
      ]);
    },
    [handleAwardPost]
  );

  const updatePostContent = useCallback(
    async ({ content }) => {
      Burnt.alert({
        title: "Updating post content...",
        preset: "spinner",
        shouldDismissByTap: false,
      });

      const { ok, err } = await getBackendActor(identity).updatePostContent({
        postId: item.id,
        content,
      });

      Burnt.dismissAllAlerts();

      if (err) {
        Burnt.alert({
          title: err.message,
          preset: "error",
          duration: 0.8,
        });
        return { error: err };
      }

      // Update the post
      let newPost;

      setPosts((prevPosts) => {
        return prevPosts.map((post) => {
          if (post.id === item.id) {
            newPost = {
              ...post,
              content,
            };
            return newPost;
          }
          return post;
        });
      });

      if (newPost) {
        setSelectedPost(newPost);
      }

      Burnt.alert({
        title: ok.message,
        preset: "done",
        duration: 0.8,
      });
    },
    [item?.id, identity]
  );

  const deletePost = useCallback(async () => {
    Burnt.alert({
      title: "Deleting post...",
      preset: "spinner",
      shouldDismissByTap: false,
    });

    const { ok, err } = await getBackendActor(identity).deletePost({
      postId: item.id,
    });

    Burnt.dismissAllAlerts();

    if (err) {
      Burnt.alert({
        title: err.message,
        preset: "error",
        duration: 0.8,
      });
      return { error: err };
    }

    // Delete the post
    setPosts((prevPosts) => {
      return prevPosts.filter((post) => post.id !== item.id);
    });

    setSelectedPost(null);

    Burnt.alert({
      title: ok.message,
      preset: "custom",
      icon: { ios: { name: "trash.fill" } },
      duration: 0.8,
    });
  }, [item?.id, identity]);

  const claimPostPoints = useCallback(async () => {
    Burnt.alert({
      title: "Claiming points...",
      preset: "spinner",
      shouldDismissByTap: false,
    });

    const { ok, err } = await getBackendActor(identity).claimPointsByPost({
      postId: item.id,
    });

    Burnt.dismissAllAlerts();

    if (err) {
      Burnt.alert({
        title: err.message,
        preset: "error",
        duration: 0.8,
      });
      return { error: err };
    }

    // Update the post
    let newPost;

    setPosts((prevPosts) => {
      return prevPosts.map((post) => {
        if (post.id === item.id) {
          newPost = {
            ...post,
            points: 0,
          };
          return newPost;
        }
        return post;
      });
    });

    if (newPost) {
      setSelectedPost(newPost);
    }

    Burnt.alert({
      title: "Points claimed",
      preset: "done",
      message: ok.message,
      duration: 0.8,
    });
  }, [item?.id, identity]);

  const claimAllPostPoints = useCallback(async () => {
    Burnt.alert({
      title: "Claiming all points...",
      preset: "spinner",
      shouldDismissByTap: false,
    });

    const { ok, err } = await getBackendActor(identity).claimAllPoints();

    Burnt.dismissAllAlerts();

    if (err) {
      Burnt.alert({
        title: err.message,
        preset: "error",
        duration: 0.8,
      });
      return { error: err };
    }

    // Update all posts
    setPosts((prevPosts) => {
      return prevPosts.map((post) => {
        return {
          ...post,
          points: 0,
        };
      });
    });

    Burnt.alert({
      title: "All points claimed",
      preset: "done",
      message: ok.message,
      duration: 0.8,
    });
  }, [identity]);

  const sharePost = useCallback(async () => {
    Share.open({
      message: item.title,
      failOnCancel: false,
    });
  }, [item?.title]);

  return {
    likeOrDislikePost,
    awardPost,
    updatePostContent,
    deletePost,
    claimPostPoints,
    claimAllPostPoints,
    sharePost,
  };
};

export default usePostActions;
