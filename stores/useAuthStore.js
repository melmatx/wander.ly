/* eslint-disable no-undef */

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
import { create } from "zustand";

import useProfileStore from "./useProfileStore";
import getBackendActor from "../src/actor";

const initialState = {
  baseKey: "",
  identity: "",
  principal: "",
  isReady: false,
  isFetching: false,
};

const useAuthStore = create((set, get) => ({
  ...initialState,
  fetchKeyAndIdentity: async () => {
    set({ isFetching: true });

    // Get base key
    let baseKey = SecureStore.getItem("baseKey");

    if (baseKey) {
      baseKey = Ed25519KeyIdentity.fromJSON(baseKey);
    } else {
      baseKey = Ed25519KeyIdentity.generate();

      SecureStore.setItem("baseKey", JSON.stringify(baseKey.toJSON()));
    }

    // Check if testing
    const isTesting = await AsyncStorage.getItem("isTesting");

    if (isTesting) {
      set({
        baseKey,
        identity: "testIdentity",
        principal: "testPrincipal",
        isReady: true,
        isFetching: false,
      });
      return;
    }

    // Get identity from delegation
    const delegation = await AsyncStorage.getItem("delegation");

    // If delegation exists, check if it's valid
    if (delegation) {
      const chain = DelegationChain.fromJSON(JSON.parse(delegation));

      if (isDelegationValid(chain)) {
        const id = new DelegationIdentity(baseKey, chain);

        // Get principal
        const principal = await getBackendActor(id).whoami();

        // Set identity with the base key
        set({ identity: id, principal: principal.toText() });
      } else {
        await AsyncStorage.removeItem("delegation");
      }
    }

    set({ baseKey, isReady: true, isFetching: false });
  },
  setIdentity: async (delegation) => {
    set({ isFetching: true });

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

    // Get principal
    const principal = await getBackendActor(id).whoami();

    set({ identity: id, principal: principal.toText(), isFetching: false });
  },
  loginTest: async () => {
    await AsyncStorage.setItem("isTesting", "true");

    set({ identity: "testIdentity", principal: "testPrincipal" });
  },
  login: async () => {
    if (!get().baseKey) {
      throw new Error("Base key not set");
    }

    // Get public key
    const publicDerKey = toHex(get().baseKey.getPublicKey().toDer());

    // Create url for internet identity integration
    const url = new URL(
      (process.env.EXPO_PUBLIC_TUNNEL_URL1 || "http://127.0.0.1:4943") +
        `/?canisterId=${process.env.EXPO_PUBLIC_CANISTER_ID_II_INTEGRATION}`
    );

    // Set internet identity uri
    const internetIdentityUri = new URL(
      // Must not be the same as the internet identity integration canister (127.0.0.1 OR localhost)
      // `http://127.0.0.1:4943/?canisterId=${process.env.EXPO_PUBLIC_CANISTER_ID_INTERNET_IDENTITY}`

      (process.env.EXPO_PUBLIC_TUNNEL_URL2 || "http://localhost:4943") +
        `/?canisterId=${process.env.EXPO_PUBLIC_CANISTER_ID_INTERNET_IDENTITY}`
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
    await AsyncStorage.removeItem("isTutorialDone");
    await AsyncStorage.removeItem("isTesting");
    await useProfileStore.getState().clearProfile();

    set({ identity: "", principal: "" });
  },
  getActor: () => {
    if (!get().identity) {
      throw new Error("Identity not set");
    }

    return getBackendActor(get().identity);
  },
}));

export default useAuthStore;
