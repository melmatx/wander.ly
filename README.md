# How to run?

1. dfx start --clean
2. dfx deploy
3. npx expo prebuild --clean
4. npx expo run:ios (or run:android)
   - --device (to select device)
  
> **Note:** To run app on physical device for iOS, open **ios** folder in your project directory, then open **Wanderly.xcworkspace** with Xcode. Click on Wanderly on the side bar then go to the **Signing & Capabilities** Tab. Once in there, remove **Push Notifications** capability and then add your free team for signing. Afterwards, close Xcode and run app again with run:ios (use --device to select your physical device).

# Environment Variables

- EXPO_PUBLIC_MAPBOX_DOWNLOAD_TOKEN
- EXPO_PUBLIC_MAPBOX_PUBLIC_TOKEN
- EXPO_PUBLIC_GEOCODING_API_KEY
- EXPO_PUBLIC_CANISTER_ID_WANDERLY
- EXPO_PUBLIC_CANISTER_ID_INTERNET_IDENTITY
- EXPO_PUBLIC_CANISTER_ID_II_INTEGRATION
- EXPO_PUBLIC_NGROK_URL