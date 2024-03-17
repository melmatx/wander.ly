import { create } from "zustand";

import getBackendActor from "../src/actor";

const initialState = {
  role: "",
  profile: {},
  isFetching: false,
};

const useProfileStore = create((set) => ({
  ...initialState,
  setRole: (role) => {
    set({ role });
  },
  fetchRoleAndProfile: async (identity) => {
    set({ isFetching: true });

    const actor = getBackendActor(identity);

    try {
      const { err, ok } = await actor.getRoleAndProfile();

      if (err) {
        console.log(err);
        return false;
      }

      if (ok) {
        const profile = Object.entries(ok.profile).reduce(
          (acc, [key, value]) => {
            // If value is empty (which is an empty array on ICP), set it to an empty string
            if (Array.isArray(value)) {
              acc[key] = "";
            } else {
              acc[key] = value;
            }
            return acc;
          },
          {}
        );
        console.log({ role: ok.role, profile: ok.profile });
        set({ role: ok.role, profile });
        return true;
      }
    } finally {
      set({ isFetching: false });
    }
  },
  clearProfile: async () => {
    set({ role: "", profile: {} });
  },
}));

export default useProfileStore;
