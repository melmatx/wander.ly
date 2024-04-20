import { createActor as createStorageActor } from "./declarations/storage";
import { createActor as createWanderlyActor } from "./declarations/wanderly";
import getPlatformNetwork from "../consts/network";

export const getBackendActor = (identity) => {
  return createWanderlyActor(process.env.EXPO_PUBLIC_CANISTER_ID_WANDERLY, {
    agentOptions: {
      host: process.env.EXPO_PUBLIC_TUNNEL_URL1 || getPlatformNetwork(),
      identity,
    },
  });
};

export const getStorageActor = (identity) => {
  return createStorageActor(process.env.EXPO_PUBLIC_CANISTER_ID_STORAGE, {
    agentOptions: {
      host: process.env.EXPO_PUBLIC_TUNNEL_URL2 || getPlatformNetwork(),
      identity,
    },
  });
};
