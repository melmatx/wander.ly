# Wander.ly

Wander.ly is a revolutionary mobile app designed to address critical health, business, and environmental challenges in the Philippines. By merging mobile health tech with blockchain technology, Wander.ly creates a motivational ecosystem that encourages physical activity, supports local businesses, and promotes eco-friendly transportation. Users are rewarded for meeting walking goals, participating in local business airdrops, and reducing their carbon footprint. [Check out the website!](https://mc6mb-riaaa-aaaan-qmafa-cai.icp0.io/)

## Introduction

Wander.ly aims to combat the rising sedentary lifestyle in the Philippines by incentivizing physical activity through a rewarding system that also supports local economies and encourages eco-friendly behaviors. This app is for anyone looking to improve their health, support local businesses, and make a positive environmental impact.

### Highlighted Features:

- **AI-Generated Walking Goals:** Personalized morning, afternoon, and evening walking targets help users stay active throughout the day.
- **Community Sharing through Swipe Cards:** After completing tasks or participating in airdrops, users can share and interact with posts in a Tinder-style community feed.
- **Local Business Airdrops:** Supports small businesses by driving physical traffic through rewarding walking tasks that unlock special offers.
- **Environmental Impact Tracking:** Tracks and displays the positive environmental impact of users’ walking activities, like carbon emission savings and trees preserved.
- **Exploration and Leveling Up:** Encourages exploration and personal growth by leveling up users as they discover new places and complete tasks.

## How It Works

1. **Personalized Tasks:** Users select from AI-generated, personalized walking tasks on the Explore screen, tailored to fit their fitness goals and daily schedules.
2. **Rewards for Activity:** Completing tasks helps users level up and unlock new features, keeping them engaged and motivated.
3. **Community Interaction:** Users post their walking experiences to the community feed, where they can interact with other users' posts through likes, shares, and awards.
4. **Support Local Businesses:** Users participate in airdrop events at local businesses, where walking to a designated area and scanning a QR code yields rewards.
5. **Track Environmental Impact:** The app tracks the environmental savings from walking, raising awareness and fostering a mindset geared towards sustainability.

# Installation

### Prerequisites

- [DFX](https://internetcomputer.org/docs/current/developer-docs/getting-started/install/)
- [Mops for Motoko](https://mops.one/docs/install)
- [Expo](https://docs.expo.dev/get-started/installation/)
- [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable)
- [Android Studio](https://developer.android.com/codelabs/basic-android-kotlin-compose-install-android-studio#0) (for Android) or [Xcode](https://apps.apple.com/us/app/xcode/id497799835?mt=12) (for iOS)
- [LocalTunnel](https://localtunnel.me) (or [telebit.cloud](https://telebit.cloud)) for sharing local development environment

### Install

```
1. yarn install
2. dfx start --clean
3. dfx deploy
4. dfx generate
5. Open .env file and copy the canister ids to EXPO_PUBLIC_CANISTER_ID_WANDERLY, EXPO_PUBLIC_CANISTER_ID_INTERNET_IDENTITY, and EXPO_PUBLIC_CANISTER_ID_II_INTEGRATION
6. npx expo prebuild --clean
```

# Usage

1. Connect your physical device or open a simulator through Android Studio or Xcode.

```
2. npx expo run:ios (or run:android)
   Add --device (to select device)
```

```
3. npx expo start --clear
```

- Note: If it only goes to the launcher screen and not to the actual app, scan the QR code from the terminal where your started Expo with your device (if it does not show up, press **C**).

4. Get started by pressing the Login with **Internet Identity button**.

## Optional: Make Internet Identity work with Physical Devices Locally

1. Make sure Localtunnel is installed.

```
2. lt --port 4943 (copy link to EXPO_PUBLIC_TUNNEL_URL1)
```

- 4943 is based on the port specified on dfx.json

```
3. lt --port 4943 again (copy link to EXPO_PUBLIC_TUNNEL_URL2)
```

- We need two tunnels of the localhost because internet identity and the integration won't work with the same url

4. If you decide to only use it with simulators, just remove the **EXPO_PUBLIC_TUNNEL_URL1** and **EXPO_PUBLIC_TUNNEL_URL2** in the .env file.

> **Note:** To run the app on physical iOs devices, open the **ios** folder in your project directory, then open **Wanderly.xcworkspace** with Xcode. Click on Wanderly on the side bar then go to the **Signing & Capabilities** Tab. Once in there, remove **Push Notifications** capability and then add your free team for signing. Afterwards, close Xcode and run app again with run:ios (use --device to select your physical device).

## Bonus: Use the app offline with Expo Dev Client and EAS Update

1. Make sure both **expo-dev-client** and **expo-updates** is installed before you build the app.
2. Configure expo-updates on the project so that it ties to your Expo account.

```
3. npx expo prebuild --clean
```

```
4. npx expo run:ios/android --device (This will build the development build with eas update on your device)
```

5. After installing the dev build, login to your Expo account on the launcher screen of the app. (If it does not appear, shake or three-tap your screen)
6. Run **eas update** on the root directory of the project and insert update message.
7. The update will be be stored on the EAS servers. You can view it on the [Expo Dashboard](https://expo.dev/), and then selecting the project (e.g. Wanderly) -> Updates.
8. Open the app on your device and view the update on the Extensions tab of the launcher screen. Open it and voila! Turn off your internet connection and it will still work.

> **Note:** After doing this, you don't need to run prebuild and run:ios/android all the time anymore after making changes. You just need to run **eas update** and select the update on the launcher screen of the app.

> Source: https://docs.expo.dev/eas-update/expo-dev-client/

## Roadmap

- [x] Internet Identity Login
- [ ] AI-Generated Walking Goals
- [x] Tinder-style Community Feed
- [x] Upload images to share for walking journeys
- [x] Manage Posts (CRUD)
- [ ] Beta Testing
- [ ] Physical Airdrop Events IC implementation
- [ ] Walk with a friend
- [ ] Crypto Wallets Integration
- [ ] Donate Points to NGOs/Charity
- [ ] Local Business Collaboration
- [ ] Sustainability Initiatives and New Opportunities

## License

This project is licensed under the MIT license, see LICENSE.md for details.

## References

- [Internet Computer](https://internetcomputer.org)
