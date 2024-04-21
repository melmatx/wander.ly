import * as Burnt from "burnt";
import * as Location from "expo-location";
import { Pedometer } from "expo-sensors";
import * as TaskManager from "expo-task-manager";
import { getDistance } from "geolib";
import { useEffect, useRef } from "react";
import { useShallow } from "zustand/react/shallow";

import { colors } from "../assets/styles/globalStyles";
import TaskTypes from "../consts/taskTypes";
import useTaskStore from "../stores/useTaskStore";

const LOCATION_TASK_NAME = "background-location-task";

const useCurrentProgress = () => {
  const { currentTask, updateProgress, cancelFn, setCancelFn } = useTaskStore(
    useShallow((state) => ({
      currentTask: state.getCurrentTask() || {},
      updateProgress: state.updateProgress,
      cancelFn: state.cancelFn,
      setCancelFn: state.setCancelFn,
    }))
  );

  const showAlertRef = useRef(true);
  const pedometerAvailableRef = useRef(true);

  // Show toast when task starts
  useEffect(() => {
    if (currentTask.progress === 0) {
      Burnt.toast({
        title: "Task Started",
        message: "Good luck with your task!",
        preset: "custom",
        duration: 1,
        icon: {
          ios: {
            name: "checkmark.circle",
            color: colors.primary,
          },
        },
      });
    }
  }, []);

  // Update progress for distance-based tasks
  useEffect(() => {
    if (currentTask.taskType === TaskTypes.DISTANCE && !cancelFn) {
      const subscribeToLocationBackground = async () => {
        let permissionsGranted = false;

        const { status: foregroundStatus } =
          await Location.requestForegroundPermissionsAsync();

        if (foregroundStatus === "granted") {
          const { status: backgroundStatus } =
            await Location.requestBackgroundPermissionsAsync();

          if (backgroundStatus === "granted") {
            permissionsGranted = true;
          }
        }

        if (!permissionsGranted) {
          Burnt.toast({
            title: "No Location Permissions",
            message: "Unable to track distance :(",
            preset: "error",
            duration: 1.5,
          });
          return;
        }

        console.log("Starting location updates");
        await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
          accuracy: Location.Accuracy.BestForNavigation,
          activityType: Location.ActivityType.Fitness,
          pausesUpdatesAutomatically: true,
        });
      };

      subscribeToLocationBackground();

      setCancelFn(() => {
        if (currentTask.taskType === TaskTypes.DISTANCE) {
          (async () => {
            const isRegistered =
              await TaskManager.isTaskRegisteredAsync(LOCATION_TASK_NAME);

            if (isRegistered) {
              console.log("Stopping location updates");
              await Location.stopLocationUpdatesAsync(LOCATION_TASK_NAME);

              // Make sure the background task is gone
              try {
                await TaskManager.unregisterTaskAsync(LOCATION_TASK_NAME);
              } catch (error) {
                console.log("Task already unregistered.", error.message);
              }
            }
          })();
        }
      });
    }
  }, []);

  // Update progress for step-based tasks
  useEffect(() => {
    if (currentTask.taskType === TaskTypes.STEP && !cancelFn) {
      const subscribeToPedometer = async () => {
        const isAvailable = await Pedometer.isAvailableAsync();

        if (isAvailable) {
          const { id, progress: initialProgress } = currentTask;

          console.log("Subscribing to pedometer");
          return Pedometer.watchStepCount((result) => {
            console.log("Step count:", result.steps);

            updateProgress(id, initialProgress + result.steps);
          });
        } else {
          Burnt.toast({
            title: "Pedometer Unavailable",
            message: "Unable to track steps :(",
            preset: "error",
            duration: 1.5,
          });
        }
      };

      (async () => {
        const subscription = await subscribeToPedometer();

        setCancelFn(() => {
          if (subscription) {
            console.log("Unsubscribing from pedometer");
            subscription.remove();
          }
        });
      })();
    }
  }, []);

  // Update progress for time-based tasks
  useEffect(() => {
    if (currentTask.taskType === TaskTypes.TIME && !cancelFn) {
      console.log("Starting timer");
      const interval = setInterval(() => {
        const task = useTaskStore.getState().getCurrentTask();

        // If user hasn't started walking, show alert
        if (
          (!task.stepCountUpdatedAt ||
            Date.now() - task.stepCountUpdatedAt > 10000) &&
          pedometerAvailableRef.current // Check if pedometer is available
        ) {
          // Show alert only once
          if (showAlertRef.current) {
            Burnt.toast({
              title: "Start Walking",
              message: "You need to walk to complete this task!",
              preset: "custom",
              duration: 10,
              icon: {
                ios: {
                  name: "location.fill",
                  color: colors.primary,
                },
              },
            });
          }

          // Set the ref to false after showing the alert
          showAlertRef.current = false;
          return;
        }
        Burnt.dismissAllAlerts();

        // Update progress every second
        updateProgress(task.id, task.progress + 1);

        if (task.progress + 1 >= task.maxValue) {
          clearInterval(interval);
        }
      }, 1000);

      const subscribeToPedometer = async () => {
        const isAvailable = await Pedometer.isAvailableAsync();

        if (isAvailable) {
          console.log("Subscribing to pedometer");
          return Pedometer.watchStepCount((result) => {
            useTaskStore
              .getState()
              .updateStepCount(currentTask.id, result.steps);

            // Show alert again if user stops walking
            if (!showAlertRef.current) {
              showAlertRef.current = true;
            }
          });
        } else {
          Burnt.toast({
            title: "Pedometer Unavailable",
            message: "Unable to track steps :(",
            preset: "error",
            duration: 1.5,
          });

          pedometerAvailableRef.current = false;
        }
      };

      (async () => {
        const subscription = await subscribeToPedometer();

        setCancelFn(() => {
          if (interval) {
            console.log("Stopping timer");
            clearInterval(interval);
          }

          if (subscription) {
            console.log("Unsubscribing from pedometer");
            subscription.remove();
          }
        });
      })();
    }
  }, []);

  return {
    currentProgress: currentTask.progress,
    completedAt: currentTask.completedAt,
  };
};

TaskManager.defineTask(LOCATION_TASK_NAME, async ({ data, error }) => {
  if (error) {
    Burnt.toast({
      title: "Location Error",
      preset: "error",
      message: error.message,
      duration: 1,
    });
    return;
  }

  if (data) {
    console.log(data.locations);
    const { latitude, longitude } = data.locations[0].coords;

    const task = useTaskStore.getState().getCurrentTask();

    let initialLatitude = task.location?.latitude;
    let initialLongitude = task.location?.longitude;

    // Get initial location if not set
    if (!initialLatitude || !initialLongitude) {
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.BestForNavigation,
      });

      if (!location) {
        await Location.stopLocationUpdatesAsync(LOCATION_TASK_NAME);

        Burnt.toast({
          title: "Location Error",
          message: "Unable to get initial location",
          preset: "error",
          duration: 1.5,
        });
        return;
      }

      initialLatitude = location.coords.latitude;
      initialLongitude = location.coords.longitude;

      useTaskStore.getState().updateLocation(task.id, {
        latitude: initialLatitude,
        longitude: initialLongitude,
      });
    }

    const distance = getDistance(
      { latitude: initialLatitude, longitude: initialLongitude },
      { latitude, longitude }
    );

    console.log("Initial Location:", initialLatitude, initialLongitude);
    console.log("Current Location:", latitude, longitude);
    console.log("Distance:", distance, distance === 1 ? "meter" : "meters");

    useTaskStore.getState().updateProgress(task.id, distance);

    if (distance >= task.maxValue) {
      await Location.stopLocationUpdatesAsync(LOCATION_TASK_NAME);
    }
  }
});

export default useCurrentProgress;
