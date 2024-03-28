import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import * as Burnt from "burnt";
import { format } from "date-fns";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Alert, SafeAreaView, View, useWindowDimensions } from "react-native";
import Swiper from "react-native-deck-swiper";
import { Button, FeatureHighlight, Text } from "react-native-ui-lib";

import globalStyles, { colors, sizes } from "../assets/styles/globalStyles";
import AppHeader from "../components/AppHeader";
import BottomSheet from "../components/BottomSheet";
import CommunityCard from "../components/CommunityCard";
import CommunityModal from "../components/CommunityModal";
import GradientIcon from "../components/GradientIcon";
import InfoSheetContent from "../components/InfoSheetContent";
import OverlayLabel from "../components/OverlayLabel";
import tutorials from "../consts/communityTutorial";
import posts from "../consts/samplePosts";

const Community = () => {
  const [cardIndex, setCardIndex] = useState(0);
  const [isSwipingBack, setIsSwipingBack] = useState(false);
  const [swipedAllCards, setSwipedAllCards] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isTutorialVisible, setIsTutorialVisible] = useState(false);
  const [currentTargetIndex, setCurrentTargetIndex] = useState(0);

  const targets = useRef({});
  const swiperRef = useRef(null);
  const taskSheetRef = useRef(null);

  const bottomTabHeight = useBottomTabBarHeight();
  const { height } = useWindowDimensions();

  useEffect(() => {
    (async () => {
      const isTutorialDone = await AsyncStorage.getItem("isTutorialDone");

      if (!isTutorialDone) {
        showTutorial();
        await AsyncStorage.setItem("isTutorialDone", "true");
      }
      // showTutorial();
    })();
  }, []);

  const onRefresh = useCallback(() => {
    setCardIndex(0);
    setSwipedAllCards(false);

    swiperRef.current?.jumpToCardIndex(0);
  }, []);

  const onSwiped = useCallback(() => {
    if (isSwipingBack) {
      setIsSwipingBack(false);
      return;
    }
    setCardIndex((prevIndex) => prevIndex + 1);
  }, [isSwipingBack]);

  const onSwipedRight = useCallback((index) => {
    Burnt.alert({
      title: "Post Liked",
      preset: "heart",
      message: "You loved this post",
      duration: 0.5,
    });
  }, []);

  const onSwipedLeft = useCallback((index) => {
    Burnt.alert({
      title: "Post Disliked",
      preset: "custom",
      icon: { ios: { name: "heart.slash" } },
      duration: 0.5,
    });
  }, []);

  const onSwipedTop = useCallback((index) => {
    Alert.alert(
      "Award Post",
      "Are you sure you want to award 1 point to the post?",
      [
        {
          text: "Cancel",
          style: "cancel",
          onPress: () => swiperRef.current?.swipeBack(),
        },
        {
          text: "Confirm",
          onPress: () =>
            Burnt.alert({
              title: "Post Awarded",
              preset: "custom",
              icon: { ios: { name: "star.circle.fill" } },
              message: "1 point awarded for this post",
              duration: 0.8,
            }),
        },
      ]
    );
  }, []);

  const onSwipedAll = useCallback(() => {
    setSwipedAllCards(true);
  }, []);

  const onSwipedBack = useCallback(() => {
    setCardIndex((prevIndex) => prevIndex - 1);
    setIsSwipingBack(true);

    swiperRef.current?.swipeBack();
  }, []);

  const swipeLeft = useCallback(() => {
    swiperRef.current?.swipeLeft();
  }, []);

  const swipeRight = useCallback(() => {
    swiperRef.current?.swipeRight();
  }, []);

  const swipeTop = useCallback(() => {
    swiperRef.current?.swipeTop();
  }, []);

  const handleInfoButton = useCallback(() => {
    taskSheetRef.current?.close();
    setIsModalVisible(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalVisible(false);
  }, []);

  const addTarget = useCallback((ref, id) => {
    if (ref && !targets.current[id]) {
      targets.current[id] = ref;
    }
  }, []);

  const showTutorial = useCallback(() => {
    setIsTutorialVisible(true);
  }, []);

  const closeTutorial = useCallback(() => {
    setIsTutorialVisible(false);
    setCurrentTargetIndex(0);

    // Clear all targets
    Object.keys(targets.current).forEach((key) => delete targets.current[key]);
  }, []);

  const moveToPage = useCallback(
    (index) => {
      if (index < tutorials.length) {
        setCurrentTargetIndex(index);
      } else {
        closeTutorial();
      }
    },
    [closeTutorial]
  );

  const moveNext = useCallback(() => {
    moveToPage(currentTargetIndex + 1);
  }, [currentTargetIndex, moveToPage]);

  const overlayLabels = useMemo(
    () => ({
      right: {
        element: (
          <OverlayLabel>
            <Ionicons name="heart" size={120} color="crimson" />
          </OverlayLabel>
        ),
      },
      left: {
        element: (
          <OverlayLabel>
            <Ionicons name="heart-dislike" size={120} color="gray" />
          </OverlayLabel>
        ),
      },
      top: {
        element: (
          <OverlayLabel>
            <Ionicons name="star" size={120} color="gold" />
          </OverlayLabel>
        ),
      },
    }),
    []
  );

  const handleInfoPress = useCallback((task) => {
    taskSheetRef.current.expand();
    setSelectedPost(task);
  }, []);

  const renderCard = useCallback(
    (card) => <CommunityCard item={card} onInfoPress={handleInfoPress} />,
    [handleInfoPress]
  );

  return (
    <>
      <SafeAreaView style={globalStyles.flexFull}>
        <View style={globalStyles.flexFull}>
          <AppHeader>
            <View style={[globalStyles.rowCenter, { columnGap: sizes.large }]}>
              <Button
                link
                onPress={onRefresh}
                disabled={isSwipingBack}
                ref={(ref) => addTarget(ref, 3)}
              >
                <Ionicons name="refresh" size={30} color="white" />
              </Button>

              {(isTutorialVisible || cardIndex > 0) && (
                <Button
                  link
                  onPress={onSwipedBack}
                  disabled={isSwipingBack}
                  ref={(ref) => addTarget(ref, 4)}
                >
                  <Ionicons name="arrow-undo" size={30} color="white" />
                </Button>
              )}
            </View>
          </AppHeader>

          <Swiper
            ref={swiperRef}
            cards={posts}
            keyExtractor={(card) => card.id.toString()}
            cardIndex={cardIndex}
            onSwiped={onSwiped}
            onSwipedLeft={onSwipedLeft}
            onSwipedRight={onSwipedRight}
            onSwipedTop={onSwipedTop}
            onSwipedAll={onSwipedAll}
            overlayLabels={overlayLabels}
            renderCard={renderCard}
            backgroundColor="transparent"
            stackSize={2}
            stackSeparation={15}
            disableBottomSwipe
            animateOverlayLabelsOpacity
            animateCardOpacity
            swipeBackCard
            cardStyle={{ height: height * 0.75 }}
            marginTop={sizes.large}
            cardHorizontalMargin={sizes.large}
            pointerEvents="box-none"
          />

          {isTutorialVisible && (
            <View style={{ marginHorizontal: sizes.large }}>
              <CommunityCard
                ref={(ref) => addTarget(ref, 5)}
                item={posts[cardIndex]}
              />
            </View>
          )}

          {swipedAllCards && (
            <View style={globalStyles.flexCenter} pointerEvents="box-none">
              <Text h3 white>
                You're all out!
              </Text>
            </View>
          )}

          <View
            style={[
              globalStyles.rowCenter,
              {
                position: "absolute",
                bottom: bottomTabHeight,
                alignSelf: "center",
                justifyContent: "space-evenly",
                width: "60%",
              },
            ]}
          >
            <Button
              onPress={swipeLeft}
              backgroundColor={colors.dark}
              round
              ref={(ref) => addTarget(ref, 1)}
            >
              <Ionicons name="close" size={45} color="crimson" />
            </Button>

            <Button
              onPress={swipeTop}
              backgroundColor={colors.dark}
              round
              ref={(ref) => addTarget(ref, 2)}
            >
              <GradientIcon
                icon="star"
                size={35}
                spacing={5}
                colors={["white", "gold"]}
                gradientProps={{ locations: [0.4, 1] }}
              />
            </Button>

            <Button
              onPress={swipeRight}
              backgroundColor={colors.dark}
              round
              ref={(ref) => addTarget(ref, 0)}
            >
              <Ionicons name="heart" size={45} color={colors.primary} />
            </Button>
          </View>
        </View>
      </SafeAreaView>

      <BottomSheet ref={taskSheetRef} detached>
        {selectedPost?.task && (
          <InfoSheetContent
            title={`Task: ${selectedPost.task.title}`}
            description={selectedPost.task.description}
            buttonLabel="View Post"
            onButtonPress={handleInfoButton}
          >
            {selectedPost.task.completedAt && (
              <Text color="gray" center style={{ marginTop: sizes.medium }}>
                Completed:{" "}
                {format(selectedPost.task.completedAt, "MMM d, yyyy")}
              </Text>
            )}
          </InfoSheetContent>
        )}
      </BottomSheet>

      <CommunityModal
        item={selectedPost}
        visible={isModalVisible}
        onClose={handleCloseModal}
      />

      <FeatureHighlight
        visible={isTutorialVisible}
        title={tutorials[currentTargetIndex].title}
        message={tutorials[currentTargetIndex].message}
        confirmButtonProps={{
          label:
            currentTargetIndex === tutorials.length - 1 ? "Got it!" : "Next",
          onPress: moveNext,
        }}
        getTarget={() => targets.current[currentTargetIndex]}
        onBackgroundPress={moveNext}
        innerPadding={sizes.xxlarge}
      />
    </>
  );
};
export default Community;
