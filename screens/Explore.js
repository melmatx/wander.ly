import Ionicons from "@expo/vector-icons/Ionicons";
import { BottomSheetSectionList } from "@gorhom/bottom-sheet";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useIsFocused, useScrollToTop } from "@react-navigation/native";
import Mapbox from "@rnmapbox/maps";
import { format } from "date-fns";
import * as Location from "expo-location";
import { StatusBar } from "expo-status-bar";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Alert, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Share from "react-native-share";
import { Button, Text } from "react-native-ui-lib";

import globalStyles, { sizes } from "../assets/styles/globalStyles";
import BottomSheet from "../components/BottomSheet";
import EventSheetContent from "../components/EventSheetContent";
import GoalSheetContent from "../components/GoalSheetContent";
import TaskItem from "../components/TaskItem";
import featureList from "../consts/featureList";
import tasks from "../consts/sampleTasks";
import Routes from "../navigation/Routes";
import greetings from "../utils/greetings";

const HEADING = 0;
const PITCH = 60;
const ZOOM = 18;

const MAPBOX_STYLE_CONFIG = {
  showPointOfInterestLabels: false,
  showTransitLabels: false,
  lightPreset: "night",
};

const Explore = ({ navigation }) => {
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const isFocused = useIsFocused();
  const insets = useSafeAreaInsets();
  const bottomTabHeight = useBottomTabBarHeight();

  const cameraRef = useRef(null);
  const sectionListRef = useRef(null);
  const eventSheetRef = useRef(null);
  const goalSheetRef = useRef(null);

  const snapPoints = useMemo(() => ["35%", "60%", "85%"], []);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission to access location was denied");
      }
    })();
  }, []);

  const onLocateUser = useCallback(async () => {
    const userLocation = await Location.getLastKnownPositionAsync();
    const { longitude, latitude } = userLocation.coords;

    cameraRef.current?.setCamera({
      centerCoordinate: [longitude, latitude],
      animationMode: "linearTo",
      heading: HEADING,
      pitch: PITCH,
      zoomLevel: ZOOM,
    });
  }, []);

  const onScanCode = useCallback(() => {
    navigation.navigate(Routes.SCAN_CODE);
  }, []);

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

  const handleEventButton = useCallback(() => {
    eventSheetRef.current.close();
  }, []);

  const handleShareEvent = useCallback((event) => {
    Share.open({ message: event.title, failOnCancel: false });
  }, []);

  const handleGoalButton = useCallback(
    (goal) => {
      goalSheetRef.current.close();
      navigation.navigate(Routes.ACTIVE_TASK, { goal });
    },
    [navigation]
  );

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

  const renderItem = useCallback(
    ({ item }) => <TaskItem item={item} onPress={() => onTaskPress(item)} />,
    [onTaskPress]
  );

  useScrollToTop(sectionListRef);

  return (
    <>
      <StatusBar style="light" animated />

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
          top: insets.top,
          right: 0,
          zIndex: 1,
          padding: sizes.large,
          rowGap: sizes.large,
        }}
      >
        <Button backgroundColor="rgba(0,0,0,0.5)" onPress={onLocateUser}>
          <Ionicons name="navigate" color="white" size={sizes.xxlarge} />
        </Button>

        <Button backgroundColor="rgba(0,0,0,0.5)" onPress={onScanCode}>
          <Ionicons name="qr-code" color="white" size={sizes.xxlarge} />
        </Button>
      </View>

      <Mapbox.MapView
        style={globalStyles.flexFull}
        styleURL="mapbox://styles/mapbox/standard"
        logoEnabled={false}
        attributionEnabled={false}
        scaleBarEnabled={false}
        pitchEnabled={false}
      >
        <Mapbox.Camera ref={cameraRef} />
        <Mapbox.Camera
          followUserLocation
          followHeading={HEADING}
          followPitch={PITCH}
          followZoomLevel={ZOOM}
        />

        {isFocused && (
          <>
            <Mapbox.LocationPuck
              visible
              pulsing={{ radius: 50 }}
              puckBearing="heading"
              puckBearingEnabled
            />

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
                  images={{
                    [`icon-${feature.icon}`]: feature.icon,
                  }}
                />
              </Mapbox.ShapeSource>
            ))}
          </>
        )}

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
          contentContainerStyle={{
            rowGap: sizes.medium,
            padding: sizes.large,
            // paddingBottom: bottomTabHeight + StatusBar.currentHeight,
          }}
          contentInset={{ bottom: bottomTabHeight }}
          style={{ borderRadius: sizes.xlarge }}
          renderSectionHeader={renderSectionHeader}
          renderItem={renderItem}
          stickySectionHeadersEnabled={false}
        />
      </BottomSheet>

      <BottomSheet ref={eventSheetRef} detached zIndex={3}>
        {selectedEvent && (
          <EventSheetContent
            event={selectedEvent}
            onButtonPress={handleEventButton}
            onShare={() => handleShareEvent(selectedEvent)}
          />
        )}
      </BottomSheet>

      <BottomSheet ref={goalSheetRef} detached zIndex={3}>
        {selectedGoal && (
          <GoalSheetContent
            goal={selectedGoal}
            onButtonPress={() => handleGoalButton(selectedGoal)}
          />
        )}
      </BottomSheet>
    </>
  );
};

export default Explore;
