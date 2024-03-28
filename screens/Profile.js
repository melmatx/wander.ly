import Ionicons from "@expo/vector-icons/Ionicons";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useScrollToTop } from "@react-navigation/native";
import * as Burnt from "burnt";
import { format } from "date-fns";
import React, { useCallback, useMemo, useReducer, useRef } from "react";
import { Alert, SafeAreaView, ScrollView, View } from "react-native";
import { AnimatedScanner, Avatar, Button, Text } from "react-native-ui-lib";

import globalStyles, { colors, sizes } from "../assets/styles/globalStyles";
import AppHeader from "../components/AppHeader";
import BottomSheet from "../components/BottomSheet";
import FormInput from "../components/FormInput";
import InfoSheetContent from "../components/InfoSheetContent";
import ProfileBanner from "../components/ProfileBanner";
import avatarColorsConfig from "../consts/avatarConfig";
import palette from "../consts/profilePalette";
import Routes from "../navigation/Routes";
import useAuthStore from "../stores/useAuthStore";

const Profile = ({ navigation }) => {
  const [isViewing, toggleViewingMode] = useReducer((state) => !state, true);

  const profileSheetRef = useRef(null);
  const infoSheetRef = useRef(null);
  const scrollViewRef = useRef(null);

  const logout = useAuthStore((state) => state.logout);
  const bottomTabHeight = useBottomTabBarHeight();

  const banners = useMemo(
    () => [
      {
        customTitle: (
          <View style={[globalStyles.rowCenter, globalStyles.spaceBetween]}>
            <Text profile white>
              Achievements
            </Text>

            <Button
              link
              activeOpacity={0.3}
              onPress={() => navigation.navigate(Routes.ACHIEVEMENTS)}
            >
              <Ionicons name="arrow-forward-circle" size={40} color="white" />
            </Button>
          </View>
        ),
        customDescription: (
          <Text profile>
            🏆 <Text white>0</Text>
          </Text>
        ),
      },
      {
        title: "1500km",
        description: "Distance walked",
      },
      {
        title: "200",
        description: "Trees saved",
      },
      {
        title: "200lbs",
        description: "Carbon emissions saved",
      },
    ],
    [navigation]
  );

  const postsTabs = useMemo(
    () => [
      {
        label: "Your Posts",
        icon: "person",
        onPress: () => navigation.navigate(Routes.YOUR_POSTS),
      },
      {
        label: "Awarded Posts",
        icon: "star",
        onPress: () => navigation.navigate(Routes.AWARDED_POSTS),
      },
      {
        label: "Liked Posts",
        icon: "heart",
        onPress: () => navigation.navigate(Routes.LIKED_POSTS),
      },
    ],
    [navigation]
  );

  const handleLogout = useCallback(() => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Logout",
        onPress: logout,
      },
    ]);
  }, [logout]);

  const onProfilePress = useCallback(() => {
    profileSheetRef.current?.expand();
  }, []);

  const onInfoPress = useCallback(() => {
    infoSheetRef.current?.expand();
  }, []);

  const handleInfoButton = useCallback(() => {
    infoSheetRef.current?.close();
  }, []);

  const onEditProfile = useCallback(() => {
    toggleViewingMode();

    // If the user is viewing the profile, do nothing
    // TODO: Check if the data is the same as the previous data
    if (isViewing) {
      return;
    }

    Burnt.alert({
      title: "Updating profile",
      preset: "spinner",
      shouldDismissByTap: false,
    });

    // Simulating a delay
    setTimeout(() => {
      Burnt.dismissAllAlerts();

      Burnt.alert({
        title: "Profile updated",
        preset: "done",
        duration: 0.8,
      });
    }, 1500);
  }, [isViewing]);

  const bottomSheetFooter = useCallback(
    () => (
      <View style={{ marginHorizontal: sizes.large, rowGap: sizes.large }}>
        <Button
          label={isViewing ? "Edit" : "Save"}
          onPress={onEditProfile}
          outline
          outlineColor={colors.primary}
        >
          <Ionicons
            name={isViewing ? "create-outline" : "save-outline"}
            size={20}
            color={colors.primary}
            style={{ marginRight: sizes.small }}
          />
        </Button>
        <Button label="Logout" onPress={handleLogout} />
      </View>
    ),
    [handleLogout, isViewing, onEditProfile]
  );

  useScrollToTop(scrollViewRef);

  return (
    <SafeAreaView style={globalStyles.flexFull}>
      <AppHeader>
        <Button link onPress={onProfilePress}>
          <Avatar size={35} label="MP" autoColorsConfig={avatarColorsConfig} />
        </Button>
      </AppHeader>

      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={{
          rowGap: sizes.large,
          padding: sizes.large,
          // paddingBottom: bottomTabHeight + StatusBar.currentHeight,
        }}
        contentInset={{ bottom: bottomTabHeight }}
      >
        <View
          style={{
            alignItems: "center",
            alignSelf: "center",
            paddingVertical: sizes.large,
            borderRadius: sizes.large,
            overflow: "hidden",
          }}
        >
          <AnimatedScanner
            opacity={0.3}
            progress={30}
            duration={1500}
            backgroundColor="black"
            containerStyle={{ zIndex: 1 }}
          />

          <Text globe>🌎</Text>
        </View>

        <View>
          <View style={[globalStyles.rowCenter, globalStyles.spaceBetween]}>
            <View>
              <Text white>Level 5</Text>
              <Text h1 white>
                Earth Warrior
              </Text>
            </View>

            <Button link onPress={onInfoPress}>
              <Ionicons
                name="information-circle-outline"
                size={30}
                color="white"
              />
            </Button>
          </View>

          <View style={{ marginVertical: sizes.medium }}>
            <AnimatedScanner
              backgroundColor="gray"
              progress={30}
              duration={1600}
              containerStyle={{
                backgroundColor: colors.primary,
                height: sizes.small,
                borderRadius: sizes.small,
              }}
            />
          </View>
        </View>

        {banners.map((banner, index) => (
          <ProfileBanner
            key={`banner-${index}`}
            title={banner.title}
            description={banner.description}
            customTitle={banner.customTitle}
            customDescription={banner.customDescription}
            gradientColor={palette[index]}
          />
        ))}

        <View style={{ marginVertical: sizes.medium, rowGap: sizes.large }}>
          {postsTabs.map((tab, index) => (
            <Button
              key={`tab-${index}`}
              label={tab.label}
              outline
              outlineColor={colors.primary}
              style={{ columnGap: sizes.small }}
              onPress={tab.onPress}
            >
              <Ionicons name={tab.icon} size={20} color={colors.primary} />
            </Button>
          ))}
        </View>

        <Text color="gray" center>
          Member since {format(new Date(), "MMMM yyyy")}
        </Text>
      </ScrollView>

      <BottomSheet
        ref={profileSheetRef}
        index={-1}
        snapPoints={["85%"]}
        enablePanDownToClose
        footerComponent={bottomSheetFooter}
      >
        <View style={{ rowGap: sizes.large, padding: sizes.large }}>
          <Avatar
            size={100}
            label="MP"
            autoColorsConfig={avatarColorsConfig}
            containerStyle={{ alignSelf: "center" }}
          />

          <FormInput value="Mel Mathew" item={{ label: "Name", isViewing }} />
        </View>
      </BottomSheet>

      <BottomSheet ref={infoSheetRef} detached>
        <InfoSheetContent
          title="Level Up!"
          description="You level up by exploring the world. Keep exploring!"
          onButtonPress={handleInfoButton}
        />
      </BottomSheet>
    </SafeAreaView>
  );
};
export default Profile;
