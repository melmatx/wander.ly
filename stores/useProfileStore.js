import * as Burnt from "burnt";
import { create } from "zustand";

import { getBackendActor } from "../src/actor";
import normalizeUserData from "../utils/normalizeUserData";

const initialState = {
  identity: "",
  profile: {},
  isFetching: false,
};

const userPayload = new Set(["name", "country"]);

const useProfileStore = create((set, get) => ({
  ...initialState,
  fetchProfile: async (identity) => {
    set({ isFetching: true });

    // If identity is not passed, use the current identity
    if (!identity) {
      identity = get().identity;
    }

    try {
      const data = await getBackendActor(identity).getUser({ id: [] }); // Pass null to id so it uses caller
      const profile = normalizeUserData(data);

      set({ identity, profile });
    } finally {
      set({ isFetching: false });
    }
  },
  updateProfile: async (profileData) => {
    const newData = Object.entries(profileData).reduce((acc, [key, value]) => {
      if (userPayload.has(key)) {
        // Put values in an array so that its an opt format
        acc[key] = value.trim?.() === "" ? [] : [value];
      }
      return acc;
    }, {});

    const identity = get().identity;

    // Update profile
    const { ok, err } = await getBackendActor(identity).updateOrCreateUser({
      id: [],
      ...newData,
    });

    // Show error if there is one
    if (err) {
      throw new Error(err);
    }

    const updatedProfile = normalizeUserData(ok.user[0]);

    // Show success alert
    Burnt.dismissAllAlerts();
    Burnt.alert({
      title: ok.message,
      preset: "done",
      duration: 0.8,
    });

    set((state) => ({ profile: { ...state.profile, ...updatedProfile } }));
  },
  clearProfile: () => {
    set({ ...initialState });
  },
}));

export default useProfileStore;
