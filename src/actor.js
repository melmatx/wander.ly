import { blsVerify } from "@dfinity/bls-verify";
import { Platform } from "react-native";

import { createActor } from "./declarations/wanderly";

const CANISTER_ID = process.env.EXPO_PUBLIC_CANISTER_ID_WANDERLY;

const NETWORK =
  Platform.OS === "android" ? "http://10.0.2.2:4943" : "http://127.0.0.1:4943";

const getBackendActor = (identity) => {
  return createActor(CANISTER_ID, {
    agentOptions: {
      host: process.env.EXPO_PUBLIC_TUNNEL_URL1 || NETWORK,
      identity,
      fetchOptions: {
        reactNative: {
          __nativeResponseType: "base64",
        },
      },
      callOptions: {
        reactNative: {
          textStreaming: true,
        },
      },
      verifyQuerySignatures: true,
    },
    actorOptions: {
      blsVerify,
    },
  });
};

export default getBackendActor;
