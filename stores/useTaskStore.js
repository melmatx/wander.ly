import { create } from "zustand";

import tasks from "../consts/sampleTasks";

const initialState = {
  currentId: null,
  tasks,
  cancelFn: null,
};

const useTaskStore = create((set, get) => ({
  ...initialState,
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
      tasks: state.tasks.map((t) => (t.id === id ? { ...t, location } : t)),
    }));
  },
  updateProgress: (id, value) => {
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

    set((state) => {
      if (value >= task.maxValue) {
        console.log("Task completed");
        return {
          tasks: state.tasks.map((t) =>
            t.id === id
              ? { ...t, progress: task.maxValue, completedAt: new Date() }
              : t
          ),
        };
      }

      return {
        tasks: state.tasks.map((t) =>
          t.id === id ? { ...t, progress: value } : t
        ),
      };
    });
  },
  setCancelFn: (fn) => set({ cancelFn: fn }),
}));

export default useTaskStore;
