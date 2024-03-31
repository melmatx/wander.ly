# How to run?

1. dfx start --clean
2. dfx deploy
3. dfx generate (copy canister ids to env)
4. ngrok http 4943 (copy link to env)
5. npx expo prebuild --clean
6. npx expo run:ios (or run:android)
   - --device (to select device)
  
> **Note:** To run app on physical device for iOS, open **ios** folder in your project directory, then open **Wanderly.xcworkspace** with Xcode. Click on Wanderly on the side bar then go to the **Signing & Capabilities** Tab. Once in there, remove **Push Notifications** capability and then add your free team for signing. Afterwards, close Xcode and run app again with run:ios (use --device to select your physical device).

# Environment Variables

- EXPO_PUBLIC_MAPBOX_DOWNLOAD_TOKEN
- EXPO_PUBLIC_MAPBOX_PUBLIC_TOKEN
- EXPO_PUBLIC_CANISTER_ID_WANDERLY
- EXPO_PUBLIC_CANISTER_ID_INTERNET_IDENTITY
- EXPO_PUBLIC_CANISTER_ID_II_INTEGRATION
- EXPO_PUBLIC_NGROK_URL

# Prerequisites

- [Installing DFX](https://internetcomputer.org/docs/current/developer-docs/getting-started/install/)
- [Installing ngrok](https://ngrok.com/docs/getting-started/)
- [Installing Expo](https://docs.expo.dev/get-started/installation/)
- [Installing Mops for Motoko](https://mops.one/docs/install)

> Don't forget to visit the [landing page](https://mc6mb-riaaa-aaaan-qmafa-cai.icp0.io/)
