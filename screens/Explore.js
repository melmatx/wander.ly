import Ionicons from "@expo/vector-icons/Ionicons";
import { BottomSheetSectionList } from "@gorhom/bottom-sheet";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useScrollToTop } from "@react-navigation/native";
import Mapbox from "@rnmapbox/maps";
import { format, set } from "date-fns";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Share from "react-native-share";
import { Button, Text } from "react-native-ui-lib";

import globalStyles, { sizes } from "../assets/styles/globalStyles";
import BottomSheet from "../components/BottomSheet";
import TaskItem from "../components/TaskItem";
import featureList from "../consts/featureList";
import tasks from "../consts/sampleTasks";
import greetings from "../utils/greetings";

const HEADING = 0;
const PITCH = 60;
const ZOOM = 17;

const MAPBOX_STYLE_CONFIG = {
  showPointOfInterestLabels: false,
  showTransitLabels: false,
  lightPreset: "night",
};

const Explore = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const insets = useSafeAreaInsets();
  const bottomTabHeight = useBottomTabBarHeight();

  const cameraRef = useRef(null);
  const sectionListRef = useRef(null);
  const goalSheetRef = useRef(null);
  const eventSheetRef = useRef(null);

  const snapPoints = useMemo(() => ["30%", "60%", "85%"], []);

  const onMapPress = useCallback((event, feature) => {
    goalSheetRef.current?.close();
    eventSheetRef.current?.expand();

    console.log(event);
    setSelectedEvent(feature);
  }, []);

  const onTaskPress = useCallback((item) => {
    eventSheetRef.current?.close();
    goalSheetRef.current?.expand();

    setSelectedGoal(item);
  }, []);

  const handleGoalButton = useCallback(() => {
    goalSheetRef.current.close();
  }, []);

  const handleEventButton = useCallback(() => {
    eventSheetRef.current.close();
  }, []);

  const handleShareEvent = useCallback((event) => {
    Share.open({ message: event.title }).catch(console.log);
  }, []);

  const renderSectionHeader = useCallback(({ section }) => {
    const totalCompleted = section.data.filter(
      (item) => item.isCompleted
    ).length;
    const totalData = section.data.length;

    return (
      <Text h1 color={section.color}>
        {section.title}{" "}
        <Text h2 color="gray">
          {`(${totalCompleted}/${totalData})`}
        </Text>
      </Text>
    );
  }, []);

  const onLocateUser = useCallback(() => {
    if (userLocation) {
      const { longitude, latitude } = userLocation.coords;

      cameraRef.current?.setCamera({
        centerCoordinate: [longitude, latitude],
        animationMode: "linearTo",
        heading: HEADING,
        pitch: PITCH,
        zoomLevel: ZOOM,
      });
    }
  }, [userLocation]);

  const renderItem = useCallback(
    ({ item }) => <TaskItem item={item} onPress={() => onTaskPress(item)} />,
    [onTaskPress]
  );

  useScrollToTop(sectionListRef);

  return (
    <>
      <View
        style={{
          position: "absolute",
          top: insets.top,
          left: 0,
          zIndex: 1,
          padding: sizes.large,
          rowGap: sizes.xsmall,
        }}
      >
        <Text h1 white>
          {greetings()}
        </Text>
        <Text h4 white>
          {format(new Date(), "EEEE, MMMM do")}
        </Text>
      </View>

      <View
        style={{
          position: "absolute",
          top: insets.top + sizes.medium,
          right: 0,
          zIndex: 1,
          padding: sizes.xsmall,
        }}
      >
        <Button
          backgroundColor="rgba(0,0,0,0.5)"
          style={{ margin: sizes.medium }}
          onPress={onLocateUser}
        >
          <Ionicons name="navigate" color="white" size={sizes.xxlarge} />
        </Button>
      </View>

      <Mapbox.MapView
        style={globalStyles.flexFull}
        styleURL="mapbox://styles/mapbox/standard"
        logoEnabled={false}
        attributionEnabled={false}
        scaleBarEnabled={false}
      >
        <Mapbox.Camera ref={cameraRef} />
        <Mapbox.Camera
          followUserLocation
          followHeading={HEADING}
          followPitch={PITCH}
          followZoomLevel={ZOOM}
        />
        <Mapbox.UserLocation onUpdate={setUserLocation} />

        {featureList.map((feature, index) => (
          <Mapbox.ShapeSource
            key={`feature-${index}`}
            id={`feature-${index}`}
            shape={feature}
            onPress={(event) => onMapPress(event, feature)}
          >
            <Mapbox.FillLayer
              id={`feature-${index}-fill`}
              style={{ fillOpacity: 0.5 }}
            />
            <Mapbox.SymbolLayer
              id={`feature-${index}-icon`}
              style={{
                iconImage: `icon-${feature.icon}`,
                iconSize: 0.1,
                iconAllowOverlap: true,
              }}
            />
            <Mapbox.Images
              images={{ [`icon-${feature.icon}`]: feature.icon }}
            />
          </Mapbox.ShapeSource>
        ))}

        <Mapbox.StyleImport
          id="basemap"
          existing
          config={MAPBOX_STYLE_CONFIG}
        />
      </Mapbox.MapView>

      <BottomSheet snapPoints={snapPoints} zIndex={2}>
        <BottomSheetSectionList
          ref={sectionListRef}
          sections={tasks}
          keyExtractor={(_, index) => `task-${index}`}
          stickySectionHeadersEnabled={false}
          contentContainerStyle={{
            rowGap: sizes.medium,
            padding: sizes.medium,
            paddingBottom: bottomTabHeight + insets.bottom,
          }}
          style={{ borderRadius: sizes.xlarge }}
          renderSectionHeader={renderSectionHeader}
          renderItem={renderItem}
        />
      </BottomSheet>

      <BottomSheet ref={goalSheetRef} detached zIndex={3}>
        {selectedGoal && (
          <View
            style={[
              globalStyles.flexFull,
              {
                rowGap: sizes.medium,
                padding: sizes.medium,
                justifyContent: "space-between",
              },
            ]}
          >
            <View style={{ rowGap: sizes.small }}>
              <Text h1 white>
                {selectedGoal.title}
              </Text>
              <Text white>{selectedGoal.description}</Text>
            </View>
            <Text color="gray">Progress: {selectedGoal.progress}</Text>
            <Button label="Continue" onPress={handleGoalButton} />
          </View>
        )}
      </BottomSheet>

      <BottomSheet ref={eventSheetRef} detached zIndex={3}>
        {selectedEvent && (
          <View
            style={[
              globalStyles.flexFull,
              {
                rowGap: sizes.medium,
                padding: sizes.medium,
                justifyContent: "space-between",
              },
            ]}
          >
            <View style={{ rowGap: sizes.small }}>
              <Text h1 white>
                {selectedEvent.title}
              </Text>
              <Text white>{selectedEvent.description}</Text>
            </View>
            <Text color="gray">
              {format(set(new Date(), { hours: 10, minutes: 0 }), "h:mm a")} -{" "}
              {format(set(new Date(), { hours: 18, minutes: 0 }), "h:mm a")}
            </Text>
            <View style={globalStyles.rowCenter}>
              <Button
                label="Done"
                onPress={handleEventButton}
                style={globalStyles.flexFull}
              />
              <Button
                link
                style={{ padding: sizes.large }}
                onPress={() => handleShareEvent(selectedEvent)}
              >
                <Ionicons name="share" size={25} color="white" />
              </Button>
            </View>
          </View>
        )}
      </BottomSheet>
    </>
  );
};

export default Explore;
