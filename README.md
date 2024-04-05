# How to run?

1. yarn install
2. dfx start --clean
3. dfx deploy
4. dfx generate
5. Open .env file and copy the canister ids to EXPO_PUBLIC_CANISTER_ID_WANDERLY, EXPO_PUBLIC_CANISTER_ID_INTERNET_IDENTITY, and EXPO_PUBLIC_CANISTER_ID_II_INTEGRATION
6. lt --port 8080 (copy link to EXPO_PUBLIC_TUNNEL_URL1, make sure to install [LocalTunnel](https://localtunnel.me) first)
   - 8080 is based on the port specified on dfx.json
7. lt --port 8080 again (copy link to EXPO_PUBLIC_TUNNEL_URL2)
   - We need two tunnels because internet identity and the integration won't work with the same url
8. npx expo prebuild --clean
9. npx expo run:ios (or run:android)
   - --device (to select device)

> **Note:** To run app on physical device for iOS, open **ios** folder in your project directory, then open **Wanderly.xcworkspace** with Xcode. Click on Wanderly on the side bar then go to the **Signing & Capabilities** Tab. Once in there, remove **Push Notifications** capability and then add your free team for signing. Afterwards, close Xcode and run app again with run:ios (use --device to select your physical device).

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
- [Installing Localtunnel](https://theboroer.github.io/localtunnel-www/)

# Localtunnel Password

You can view your password by visiting: https://whatismyipaddress.com/

> Don't forget to visit the [landing page](https://mc6mb-riaaa-aaaan-qmafa-cai.icp0.io/)
