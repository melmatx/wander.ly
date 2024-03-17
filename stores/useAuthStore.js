import { toHex } from "@dfinity/agent";
import {
  Ed25519KeyIdentity,
  DelegationChain,
  DelegationIdentity,
  isDelegationValid,
} from "@dfinity/identity";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Linking from "expo-linking";
import * as SecureStore from "expo-secure-store";
import * as WebBrowser from "expo-web-browser";
import { URL } from "react-native-url-polyfill";
import { create } from "zustand";

import useProfileStore from "./useProfileStore";
import getBackendActor from "../src/actor";

const initialState = {
  baseKey: "",
  identity: "",
  principal: "",
  isRegistered: false,
  isReady: false,
};

const useAuthStore = create((set, get) => ({
  ...initialState,
  fetchKeyAndIdentity: async () => {
    // Get base key
    let baseKey = SecureStore.getItem("baseKey");

    if (baseKey) {
      baseKey = Ed25519KeyIdentity.fromJSON(baseKey);
    } else {
      baseKey = Ed25519KeyIdentity.generate();

      SecureStore.setItem("baseKey", JSON.stringify(baseKey.toJSON()));
    }

    // Get identity from delegation
    const delegation = await AsyncStorage.getItem("delegation");

    // If delegation exists, check if it's valid
    if (delegation) {
      const chain = DelegationChain.fromJSON(JSON.parse(delegation));

      if (isDelegationValid(chain)) {
        const id = new DelegationIdentity(baseKey, chain);

        // Get principal
        // const principal = get().getPrincipal(id);

        // Set identity with the base key
        set({ baseKey, identity: id });
      } else {
        await AsyncStorage.removeItem("delegation");
      }
    }

    // No delegation, set base key
    set({ baseKey });

    // Check if user is registered
    const isRegistered = await AsyncStorage.getItem("isRegistered");

    if (isRegistered === "true") {
      console.log(isRegistered);
      // Fetch role and profile
      await useProfileStore.getState().fetchRoleAndProfile(get().identity);

      set({ isRegistered: true });
    }

    set({ isReady: true });
  },
  setIdentity: async (delegation) => {
    // Decode delegation from uri result
    const decodedFromUri = decodeURIComponent(delegation);
    const chain = DelegationChain.fromJSON(JSON.parse(decodedFromUri));

    if (!get().baseKey) {
      throw new Error("Base key not set");
    }

    // Get identity
    const id = DelegationIdentity.fromDelegation(get().baseKey, chain);

    // Save delegation
    await AsyncStorage.setItem("delegation", JSON.stringify(chain.toJSON()));

    // Dismiss the browser
    WebBrowser.dismissBrowser();

    // Check if user is already registered
    if (await useProfileStore.getState().fetchRoleAndProfile(id)) {
      set({ isRegistered: true });

      // Save registered status
      await AsyncStorage.setItem("isRegistered", "true");
    }

    // Get principal
    // const principal = get().getPrincipal(id);

    set({ identity: id });
  },
  loginTest: () => set({ identity: "testIdentity" }),
  login: async () => {
    if (!get().baseKey) {
      throw new Error("Base key not set");
    }

    // Get public key
    const publicDerKey = toHex(get().baseKey.getPublicKey().toDer());

    // Replace with own ii integration canister
    // const url = new URL(
    //   "http://127.0.0.1:4943/?canisterId=" +
    //     process.env.EXPO_PUBLIC_CANISTER_ID_II_INTEGRATION
    // );

    // Create url for internet identity integration
    const url = new URL(
      process.env.EXPO_PUBLIC_NGROK_URL +
        "/?canisterId=" +
        process.env.EXPO_PUBLIC_CANISTER_ID_II_INTEGRATION
    );

    // Set internet identity uri
    const internetIdentityUri = new URL(
      process.env.EXPO_PUBLIC_NGROK_URL +
        "/?canisterId=" +
        process.env.EXPO_PUBLIC_CANISTER_ID_INTERNET_IDENTITY
    );
    url.searchParams.set(
      "internet_identity_uri",
      encodeURIComponent(internetIdentityUri.toString())
    );

    // Set redirect uri
    const redirectUri = Linking.createURL("/");
    url.searchParams.set("redirect_uri", encodeURIComponent(redirectUri));

    // Set public key
    url.searchParams.set("pubkey", publicDerKey);

    return await WebBrowser.openBrowserAsync(url.toString());
  },
  logout: async () => {
    await AsyncStorage.removeItem("delegation");
    await AsyncStorage.removeItem("isRegistered");
    await useProfileStore.getState().clearProfile();

    set({ identity: "", principal: "", isRegistered: false });
  },
  setIsRegistered: (isRegistered) => {
    set({ isRegistered });
  },
  getActor: (identity) => {
    if (!identity && !get().identity) {
      throw new Error("Identity not set");
    }

    return getBackendActor(identity || get().identity);
  },
}));

export default useAuthStore;
