import * as Burnt from "burnt";
import { Alert } from "react-native";
import { create } from "zustand";

import useProfileStore from "./useProfileStore";
import { getBackendActor } from "../src/actor";
import normalizeTasksData from "../utils/normalizeTasksData";

const initialState = {
  currentId: null,
  tasks: [],
  isFetching: true,
  cancelFn: null,
};

const useTaskStore = create((set, get) => ({
  ...initialState,
  setTasks: (tasks) => set({ tasks }),
  fetchTasks: async () => {
    set({ isFetching: true });

    try {
      // Fetch tasks from ICP
      const identity = useProfileStore.getState().identity;
      const fetchedTasks = await getBackendActor(identity).getAllTasksToday();
      const normalizedTasks = normalizeTasksData(fetchedTasks);

      set({ tasks: normalizedTasks, isFetching: false });
    } catch (error) {
      Alert.alert("Failed to fetch tasks", error);
    } finally {
      set({ isFetching: false });
    }
  },
  setCurrentTask: (id) => set({ currentId: id }),
  getCurrentTask: () => get().tasks.find((t) => t.id === get().currentId),
  removeCurrentTask: () => set({ currentId: null }),
  getTask: (id) => {
    const task = get().tasks.find((t) => t.id === id);

    if (!task) {
      console.log("Task not found");
      return null;
    }

    return task;
  },
  // addTask: (task) => {
  //   if (get().tasks.some((t) => t.id === task.id)) {
  //     console.log("Task already exists");
  //     return;
  //   }

  //   console.log("Adding task", task);
  //   set((state) => ({
  //     tasks: [...state.tasks, task],
  //   }));
  // },
  removeTask: (id) => {
    const task = get().getTask(id);

    if (!task) {
      return;
    }

    console.log("Removing task", task);
    set((state) => ({
      tasks: state.tasks.filter((t) => t.id !== id),
    }));
  },
  removeAllTasks: () => {
    console.log("Removing all tasks");
    set({ tasks: [] });
  },
  updateLocation: (id, location) => {
    const task = get().getTask(id);

    if (!task) {
      return;
    }

    console.log("Updating location for task", task);
    set((state) => ({
      tasks: state.tasks.map((t) =>
        t.id === id ? { ...t, location, locationUpdatedAt: Date.now() } : t
      ),
    }));
  },
  updateStepCount: (id, stepCount) => {
    const task = get().getTask(id);

    if (!task) {
      return;
    }

    console.log("User is walking", stepCount, "steps");
    set((state) => ({
      tasks: state.tasks.map((t) =>
        t.id === id ? { ...t, stepCount, stepCountUpdatedAt: Date.now() } : t
      ),
    }));
  },
  updateProgress: async (id, value) => {
    const task = get().getTask(id);

    if (!task) {
      return;
    }

    if (task.progress === task.maxValue) {
      console.log("Task already completed", task);
      return;
    }

    if (value < task.progress) {
      console.log("Value is less than current progress");
      return;
    }

    if (value === task.progress) {
      return;
    }

    if (value >= task.maxValue) {
      // Complete task in ICP
      Burnt.alert({
        title: "Completing Task...",
        preset: "spinner",
        shouldDismissByTap: false,
      });

      const identity = useProfileStore.getState().identity;
      const { ok, err } = await getBackendActor(identity).completeTask({
        taskId: id,
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

      Burnt.alert({
        title: "Goal Reached",
        message: ok.message,
        preset: "custom",
        icon: { ios: { name: "medal" } },
        duration: 1.5,
      });

      // Complete task locally
      set((state) => ({
        tasks: state.tasks.map((t) =>
          t.id === id
            ? {
                ...t,
                progress: task.maxValue,
                completedAt: ok.userCompletedTask.completedAt,
              }
            : t
        ),
      }));

      console.log("Task completed", task);
      await useProfileStore.getState().fetchProfile();
      return;
    }

    // Update progress locally
    set((state) => ({
      tasks: state.tasks.map((t) =>
        t.id === id ? { ...t, progress: value } : t
      ),
    }));
  },
  setCancelFn: (fn) => set({ cancelFn: fn }),
}));

export default useTaskStore;
