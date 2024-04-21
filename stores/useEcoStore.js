import { create } from "zustand";

const initialState = {
  distanceWalked: 1500, // km
  treesSaved: 200,
  carbonEmissionsSaved: 150, // kg
};

const useEcoStore = create((set) => ({
  ...initialState,
  setDistanceWalked: (distanceWalked) => set({ distanceWalked }),
  setTreesSaved: (treesSaved) => set({ treesSaved }),
  setCarbonEmissionsSaved: (carbonEmissionsSaved) =>
    set({ carbonEmissionsSaved }),
}));

export default useEcoStore;
