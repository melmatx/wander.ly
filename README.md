# Landing Page

```
https://mc6mb-riaaa-aaaan-qmafa-cai.icp0.io/
```
**Repository:** https://github.com/spcf-coMeLex/wander.ly-landing

# How to run?

1. yarn install
2. dfx start --clean
3. dfx deploy
4. dfx generate
5. Open .env file and copy the canister ids to **EXPO_PUBLIC_CANISTER_ID_WANDERLY**, **EXPO_PUBLIC_CANISTER_ID_INTERNET_IDENTITY**, and **EXPO_PUBLIC_CANISTER_ID_II_INTEGRATION**
6. npx expo prebuild --clean
7. npx expo run:ios (or run:android)
   - --device (to select device)
8. npx expo start --clear

# Optional: Make Internet Identity work with Physical Devices Locally

1. Install [LocalTunnel](https://localtunnel.me) (or [telebit.cloud](https://telebit.cloud))
2. lt --port 4943 (copy link to **EXPO_PUBLIC_TUNNEL_URL1**)
   - 4943 is based on the port specified on dfx.json
3. lt --port 4943 again (copy link to **EXPO_PUBLIC_TUNNEL_URL2**)
   - We need two tunnels of the localhost because internet identity and the integration won't work with the same url
4. If you decide to only use it with simulators, just remove the **EXPO_PUBLIC_TUNNEL_URL1** and **EXPO_PUBLIC_TUNNEL_URL2** in the .env file.

> **Note:** To run app on physical device for iOS, open **ios** folder in your project directory, then open **Wanderly.xcworkspace** with Xcode. Click on Wanderly on the side bar then go to the **Signing & Capabilities** Tab. Once in there, remove **Push Notifications** capability and then add your free team for signing. Afterwards, close Xcode and run app again with run:ios (use --device to select your physical device).

## Localtunnel Password

You can view your password by visiting: https://whatismyipaddress.com/

# Bonus: Use the app offline with Expo Dev Client and EAS Update 

1. Make sure both **expo-dev-client** and **expo-updates** is installed before you build the app.
2. Configure expo-updates on the project so that it ties to your Expo account.
3. **npx expo prebuild --clean**
4. **npx expo run:ios/android --device** (This will build the development build with eas update on your device)
5. After installing the dev build, login to your Expo account on the launcher screen of the app. (If it does not appear, shake or three-tap your screen)
6. Run **eas update** on the root directory of the project and insert update message.
7. The update will be be stored on the EAS servers. You can view it on the [Expo Dashboard](https://expo.dev/), and then selecting the project (e.g. Wanderly) -> Updates. 
8. Open the app on your device and view the update on the Extensions tab of the launcher screen. Open it and voila! Turn off your internet connection and it will still work.

> **Note:** After doing this, you don't need to run prebuild and run:ios/android all the time anymore after making changes. You just need to run **eas update** and select the update on the launcher screen of the app.

> **Source:** https://docs.expo.dev/eas-update/expo-dev-client/

# Environment Variables

- EXPO_PUBLIC_MAPBOX_DOWNLOAD_TOKEN
- EXPO_PUBLIC_MAPBOX_PUBLIC_TOKEN
- EXPO_PUBLIC_CANISTER_ID_WANDERLY
- EXPO_PUBLIC_CANISTER_ID_INTERNET_IDENTITY
- EXPO_PUBLIC_CANISTER_ID_II_INTEGRATION
- EXPO_PUBLIC_TUNNEL_URL1
- EXPO_PUBLIC_TUNNEL_URL2

# Prerequisites

- [Installing DFX](https://internetcomputer.org/docs/current/developer-docs/getting-started/install/)
- [Installing Mops for Motoko](https://mops.one/docs/install)
- [Installing Expo](https://docs.expo.dev/get-started/installation/)

# Programmers

- Mel Mathew C. Palaña (Full-stack developer)
- Alexander John Cammado (Backend developer)
