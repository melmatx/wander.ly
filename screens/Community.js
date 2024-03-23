import Ionicons from "@expo/vector-icons/Ionicons";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import * as Burnt from "burnt";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { Alert, SafeAreaView, View, useWindowDimensions } from "react-native";
import Swiper from "react-native-deck-swiper";
import { Button, Text } from "react-native-ui-lib";

import globalStyles, { colors, sizes } from "../assets/styles/globalStyles";
import CommunityCard from "../components/CommunityCard";
import OverlayLabel from "../components/OverlayLabel";
import posts from "../consts/samplePosts";

const Community = ({ route }) => {
  const [cardIndex, setCardIndex] = useState(0);
  const [isSwipingBack, setIsSwipingBack] = useState(false);
  const [swipedAllCards, setSwipedAllCards] = useState(false);

  const swiperRef = useRef(null);

  const bottomTabHeight = useBottomTabBarHeight();
  const { height } = useWindowDimensions();

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

  const renderCard = useCallback((card) => <CommunityCard card={card} />, []);

  return (
    <SafeAreaView style={globalStyles.flexFull}>
      <View style={globalStyles.flexFull}>
        <View style={{ padding: sizes.large }}>
          <View style={[globalStyles.rowCenter, globalStyles.spaceBetween]}>
            <Text h1 white>
              {route.name}
            </Text>

            <View style={[globalStyles.rowCenter, { columnGap: sizes.large }]}>
              <Button link onPress={onRefresh} disabled={isSwipingBack}>
                <Ionicons name="refresh" size={30} color="white" />
              </Button>

              {cardIndex > 0 && (
                <Button link onPress={onSwipedBack} disabled={isSwipingBack}>
                  <Ionicons name="arrow-undo" size={30} color="white" />
                </Button>
              )}
            </View>
          </View>
        </View>

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
              alignSelf: "center",
              justifyContent: "space-evenly",
              bottom: bottomTabHeight,
              width: "75%",
            },
          ]}
        >
          <Button onPress={swipeLeft} backgroundColor={colors.dark} round>
            <Ionicons name="heart-dislike" size={30} color="gray" />
          </Button>

          <Button
            onPress={swipeTop}
            backgroundColor={colors.primary}
            enableShadow
          >
            <Ionicons name="star" size={45} color="yellow" />
          </Button>

          <Button onPress={swipeRight} backgroundColor={colors.dark} round>
            <Ionicons name="heart" size={30} color="crimson" />
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default Community;
