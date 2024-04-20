import Ionicons from "@expo/vector-icons/Ionicons";
import { BottomSheetSectionList } from "@gorhom/bottom-sheet";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useScrollToTop } from "@react-navigation/native";
import Mapbox from "@rnmapbox/maps";
import * as Burnt from "burnt";
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
import { ActivityIndicator, Alert, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Share from "react-native-share";
import { Button, Text } from "react-native-ui-lib";
import { useShallow } from "zustand/react/shallow";

import globalStyles, { colors, sizes } from "../assets/styles/globalStyles";
import BottomSheet from "../components/BottomSheet";
import ChipHeader from "../components/ChipHeader";
import InfoSheetContent from "../components/InfoSheetContent";
import TaskItem from "../components/TaskItem";
import featureList from "../consts/featureList";
import sectionColors from "../consts/sectionColors";
import TimeOfDay from "../consts/timeOfDay";
import Routes from "../navigation/Routes";
import useTaskStore from "../stores/useTaskStore";
import getTaskProgress from "../utils/getTaskProgress";
import getTimeOfDay from "../utils/getTimeOfDay";
import greetings from "../utils/greetings";
import transformTasks from "../utils/transformTasks";

const HEADING = 0;
const PITCH = 60;
const ZOOM = 17;

const MAPBOX_STYLE_CONFIG = {
  showPointOfInterestLabels: false,
  showTransitLabels: false,
  lightPreset: "night",
};

const FILTERS = [
  "All",
  TimeOfDay.MORNING,
  TimeOfDay.AFTERNOON,
  TimeOfDay.EVENING,
];

const Explore = ({ navigation }) => {
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState(getTimeOfDay());
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [isMapShown, setIsMapShown] = useState(true);

  const insets = useSafeAreaInsets();
  const bottomTabHeight = useBottomTabBarHeight();
  const {
    tasks,
    fetchTasks,
    isFetching,
    currentTask,
    setCurrentTask,
    cancelFn,
    setCancelFn,
  } = useTaskStore(
    useShallow((state) => ({
      tasks: transformTasks(state.tasks),
      fetchTasks: state.fetchTasks,
      isFetching: state.isFetching,
      currentTask: state.getCurrentTask(),
      setCurrentTask: state.setCurrentTask,
      cancelFn: state.cancelFn,
      setCancelFn: state.setCancelFn,
    }))
  );

  const cameraRef = useRef(null);
  const sectionListRef = useRef(null);
  const eventSheetRef = useRef(null);
  const goalSheetRef = useRef(null);

  const snapPoints = useMemo(() => {
    const initial = currentTask ? "35%" : "12%";
    return [initial, "55%", "85%"];
  }, [currentTask]);

  // Filter tasks by selected filter
  const filteredTasks = useMemo(() => {
    return selectedFilter === "All"
      ? tasks
      : tasks.filter((task) => task.title === selectedFilter);
  }, [selectedFilter, tasks]);

  useEffect(() => {
    (async () => {
      // Request location permission
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission to access location was denied");
        return;
      }

      // Move camera to user location
      onLocateUser();

      // Fetch tasks
      await fetchTasks();
    })();
  }, []);

  const onLocateUser = useCallback(async () => {
    try {
      const userLocation = await Location.getLastKnownPositionAsync();
      const { longitude, latitude } = userLocation.coords;

      console.log("User Location", userLocation);
      cameraRef.current?.setCamera({
        centerCoordinate: [longitude, latitude],
        animationMode: "linearTo",
        heading: HEADING,
        pitch: PITCH,
        zoomLevel: ZOOM,
        // padding: { paddingBottom: BOTTOM_PADDING },
      });
    } catch (error) {
      console.log("Error getting user location", error);
    }
  }, []);

  const onScanCode = useCallback(() => {
    navigation.navigate(Routes.SCAN_CODE);
  }, []);

  const onMapLoad = useCallback(() => {
    setIsMapLoaded(true);
  }, []);

  const onMapPress = useCallback((event, feature) => {
    goalSheetRef.current?.close();
    eventSheetRef.current?.expand();

    console.log(event);
    setSelectedEvent(feature);
  }, []);

  const onCancelTask = useCallback(() => {
    cancelFn();

    // Reset task
    setCancelFn(null);
    setCurrentTask(null);

    Burnt.toast({
      title: "Task Cancelled",
      message: "Awww maybe later? :(",
      preset: "error",
      duration: 1,
    });
  }, [cancelFn, setCancelFn, setCurrentTask]);

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

      // If there is already a task in progress but its not the same as selected
      if (currentTask && currentTask.id !== goal.id) {
        onCancelTask();
      }

      // If there is no task in progress or the task is different
      if (!currentTask || currentTask.id !== goal.id) {
        setCurrentTask(goal.id);
      }

      navigation.navigate(Routes.ACTIVE_TASK, { task: goal });
    },
    [currentTask, setCurrentTask, onCancelTask, navigation]
  );

  const onAnimateSheet = useCallback((_, to) => {
    setIsMapShown(to <= 0);
  }, []);

  const onChangeSheet = useCallback((index) => {
    // Workaround for onAnimateSheet not working when the sheet is dragged slowly
    setIsMapShown(index <= 0);
  }, []);

  const renderSectionHeader = useCallback(({ section }) => {
    const totalCompleted = section.data.filter(
      (item) => item.isCompleted
    ).length;
    const totalData = section.data.length;
    const color = sectionColors[section.title];

    return (
      <Text h1 color={color}>
        {section.title}{" "}
        <Text h2 color={colors.gray}>
          {`(${totalCompleted}/${totalData})`}
        </Text>
      </Text>
    );
  }, []);

  const renderItem = useCallback(
    ({ item }) => <TaskItem item={item} onPress={() => onTaskPress(item)} />,
    [onTaskPress]
  );

  const renderCurrentTask = useMemo(() => {
    if (!currentTask) {
      return null;
    }

    const { progress, maxValue, unit } = getTaskProgress(currentTask);

    return (
      <View
        style={[
          globalStyles.spaceBetween,
          {
            height: isMapShown ? "25%" : "23%",
            marginVertical: isMapShown ? sizes.medium : sizes.small,
            borderRadius: sizes.medium,
            padding: sizes.large,
          },
        ]}
      >
        <View
          style={[
            globalStyles.rowCenter,
            { marginHorizontal: sizes.small, columnGap: sizes.xlarge },
          ]}
        >
          <Text achievement>{currentTask.emoji}</Text>

          <View style={{ rowGap: sizes.medium }}>
            <Text profile>{currentTask.title}</Text>

            <Text semibold>
              Progress: {progress}/{maxValue} {unit}
            </Text>
          </View>
        </View>

        <View style={[globalStyles.rowCenter, { columnGap: sizes.xlarge }]}>
          <Button
            label="Cancel"
            onPress={onCancelTask}
            outline
            outlineColor={colors.primary}
            style={globalStyles.flexFull}
          />

          <Button
            label="View Task"
            onPress={() => handleGoalButton(currentTask)}
            style={globalStyles.flexFull}
          />
        </View>
      </View>
    );
  }, [currentTask, handleGoalButton, isMapShown, onCancelTask]);

  const renderSelectedEvent = useMemo(() => {
    if (!selectedEvent) {
      return null;
    }

    return (
      <InfoSheetContent
        title={selectedEvent.title}
        description={selectedEvent.description}
        onButtonPress={handleEventButton}
        onSharePress={() => handleShareEvent(selectedEvent)}
      >
        <Text color={colors.gray}>
          Event deadline:{" "}
          {format(selectedEvent.deadline, "MMM dd, yyyy, hh:mm a")}
        </Text>
      </InfoSheetContent>
    );
  }, [selectedEvent]);

  const renderSelectedGoal = useMemo(() => {
    if (!selectedGoal) {
      return null;
    }

    const { progress, maxValue, unit } = getTaskProgress(selectedGoal);

    return (
      <InfoSheetContent
        title={selectedGoal.title}
        description={selectedGoal.description}
        gap={sizes.small}
        onButtonPress={() => handleGoalButton(selectedGoal)}
        buttonLabel={progress === 0 ? "Begin Task" : "Continue"}
      >
        <Text color={colors.gray}>
          Progress: {progress}/{maxValue} {unit}
        </Text>
      </InfoSheetContent>
    );
  }, [selectedGoal]);

  const renderMapImages = useMemo(() => {
    return featureList.map((feature) => (
      <Mapbox.Images
        key={`icon-${feature.icon}`}
        images={{
          [`icon-${feature.icon}`]: feature.icon,
        }}
        onImageMissing={(name) => {
          console.log(`Image ${name} is missing`);
        }}
      />
    ));
  }, []);

  const renderFeatures = useMemo(() => {
    if (!isMapLoaded) {
      return null;
    }

    return featureList.map((feature, index) => (
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
            iconSize: 0.12,
            iconAllowOverlap: true,
            iconIgnorePlacement: true,
          }}
        />
      </Mapbox.ShapeSource>
    ));
  }, [isMapLoaded, onMapPress]);

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
        <Text h1>{greetings()}</Text>
        <Text h4>{format(new Date(), "EEEE, MMMM do")}</Text>
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
        onDidFinishLoadingMap={onMapLoad}
      >
        <Mapbox.StyleImport
          id="basemap"
          existing
          config={MAPBOX_STYLE_CONFIG}
        />

        <Mapbox.Camera ref={cameraRef} />

        {isMapShown && (
          <Mapbox.LocationPuck
            puckBearingEnabled
            puckBearing="heading"
            pulsing={{ radius: 50 }}
          />
        )}

        {renderMapImages}
        {renderFeatures}
      </Mapbox.MapView>

      <BottomSheet
        snapPoints={snapPoints}
        index={1}
        zIndex={2}
        enableBlurAndroid={false}
        onAnimate={onAnimateSheet}
        onChange={onChangeSheet}
      >
        {renderCurrentTask}

        {currentTask && !isMapShown && (
          <View
            style={{
              borderBottomColor: "rgba(255,255,255,0.1)",
              borderBottomWidth: StyleSheet.hairlineWidth,
            }}
          />
        )}

        {isFetching ? (
          <View
            style={[globalStyles.center, { top: "20%", rowGap: sizes.large }]}
          >
            <ActivityIndicator size="large" />
            <Text style={{ color: colors.gray }}>Loading Tasks...</Text>
          </View>
        ) : (
          (!currentTask || !isMapShown) && (
            <>
              <View style={{ padding: sizes.large }}>
                <ChipHeader
                  data={FILTERS}
                  selected={selectedFilter}
                  onPress={setSelectedFilter}
                  activeColor={sectionColors[selectedFilter]}
                />
              </View>

              <BottomSheetSectionList
                ref={sectionListRef}
                sections={filteredTasks}
                keyExtractor={(_, index) => `task-${index}`}
                contentContainerStyle={{
                  rowGap: sizes.medium,
                  paddingTop: sizes.small,
                  paddingBottom: bottomTabHeight + sizes.large,
                  paddingHorizontal: sizes.large,
                }}
                style={{ borderRadius: sizes.xlarge }}
                renderSectionHeader={renderSectionHeader}
                renderItem={renderItem}
                stickySectionHeadersEnabled={false}
              />
            </>
          )
        )}
      </BottomSheet>

      <BottomSheet
        ref={eventSheetRef}
        detached
        zIndex={3}
        enableBlurAndroid={false}
      >
        {renderSelectedEvent}
      </BottomSheet>

      <BottomSheet
        ref={goalSheetRef}
        detached
        zIndex={3}
        enableBlurAndroid={false}
      >
        {renderSelectedGoal}
      </BottomSheet>
    </>
  );
};

export default Explore;
