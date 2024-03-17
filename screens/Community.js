import Ionicons from "@expo/vector-icons/Ionicons";
import * as Burnt from "burnt";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { Dimensions, SafeAreaView, View } from "react-native";
import Swiper from "react-native-deck-swiper";
import { Button, Text } from "react-native-ui-lib";

import globalStyles, { sizes } from "../assets/styles/globalStyles";
import CommunityCard from "../components/CommunityCard";
import OverlayLabel from "../components/OverlayLabel";
import posts from "../consts/samplePosts";

const { height } = Dimensions.get("window");

const Community = ({ route }) => {
  const [cardIndex, setCardIndex] = useState(0);
  const [isSwipingBack, setIsSwipingBack] = useState(false);
  const [swipedAllCards, setSwipedAllCards] = useState(false);

  const swiperRef = useRef(null);

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
    Burnt.alert({
      title: "Post Awarded",
      preset: "custom",
      icon: { ios: { name: "star.circle.fill" } },
      message: "1 point awarded for this post",
      duration: 0.8,
    });
  }, []);

  const onSwipedAll = useCallback(() => {
    setSwipedAllCards(true);
  }, []);

  const onSwipedBack = useCallback(() => {
    setCardIndex((prevIndex) => prevIndex - 1);
    setIsSwipingBack(true);

    swiperRef.current?.swipeBack();
  }, []);

  const onRefresh = useCallback(() => {
    setCardIndex(0);
    setSwipedAllCards(false);

    swiperRef.current?.jumpToCardIndex(0);
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
      <View style={{ padding: sizes.large }}>
        <View style={{ marginBottom: sizes.xlarge }}>
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
          containerStyle={{ height: height * 0.8 }}
          marginTop={sizes.xlarge}
          stackSize={3}
          stackSeparation={15}
          disableBottomSwipe
          animateOverlayLabelsOpacity
          animateCardOpacity
          swipeBackCard
          pointerEvents="box-none"
        >
          {swipedAllCards && (
            <View style={globalStyles.flexCenter} pointerEvents="box-none">
              <Text h3 white>
                You're all out!
              </Text>
            </View>
          )}
        </Swiper>
      </View>
    </SafeAreaView>
  );
};
export default Community;
