import Ionicons from "@expo/vector-icons/Ionicons";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useScrollToTop } from "@react-navigation/native";
import * as Burnt from "burnt";
import { format } from "date-fns";
import Graphemer from "graphemer";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";
import {
  ActivityIndicator,
  Alert,
  Keyboard,
  SafeAreaView,
  ScrollView,
  StatusBar,
  View,
} from "react-native";
import { AnimatedScanner, Avatar, Button, Text } from "react-native-ui-lib";
import { useShallow } from "zustand/react/shallow";

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
import useEcoStore from "../stores/useEcoStore";
import useProfileStore from "../stores/useProfileStore";
import fetchCountryFlags from "../utils/fetchCountryFlags";

const profileState = {
  name: "",
  country: "",
};

const Profile = ({ navigation }) => {
  const [profileData, setProfileData] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    profileState
  );

  const [isViewing, setIsViewing] = useState(true);
  const [countries, setCountries] = useState([]);

  const previousState = useRef({});
  const profileSheetRef = useRef(null);
  const infoSheetRef = useRef(null);
  const scrollViewRef = useRef(null);

  const { profile, isFetching, updateProfile } = useProfileStore(
    useShallow((state) => ({
      isFetching: state.isFetching,
      profile: state.profile,
      updateProfile: state.updateProfile,
    }))
  );
  const { distanceWalked, treesSaved, carbonEmissionsSaved } = useEcoStore(
    useShallow((state) => ({
      distanceWalked: state.distanceWalked,
      treesSaved: state.treesSaved,
      carbonEmissionsSaved: state.carbonEmissionsSaved,
    }))
  );
  const logout = useAuthStore((state) => state.logout);
  const bottomTabHeight = useBottomTabBarHeight();

  useEffect(() => {
    // Fetch profile
    console.log(profile);
    setProfileData(profile);
  }, [profile]);

  useEffect(() => {
    // Fetch countries
    fetchCountryFlags().then(setCountries);
  }, []);

  const avatarLabel = useMemo(() => {
    if (!profileData.name) {
      return "😄";
    }

    return profileData.name
      .split(" ")
      .slice(0, 2)
      .map((name) => {
        const splitter = new Graphemer();
        return splitter.splitGraphemes(name)[0];
      })
      .join("");
  }, [profileData.name]);

  const banners = useMemo(
    () => [
      {
        customTitle: (
          <View style={[globalStyles.rowCenter, globalStyles.spaceBetween]}>
            <Text profile>Achievements</Text>

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
            🏆 <Text>{profile.achievements.toString()}</Text>
          </Text>
        ),
      },
      {
        title: `${distanceWalked}km`,
        description: "Distance walked",
      },
      {
        title: treesSaved,
        description: "Trees saved",
      },
      {
        title: `${carbonEmissionsSaved}kg`,
        description: "Carbon emissions saved",
      },
    ],
    [
      carbonEmissionsSaved,
      distanceWalked,
      navigation,
      profile.achievements,
      treesSaved,
    ]
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
      {
        label: "Top Patrons",
        icon: "medal",
        color: colors.tertiary,
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

  const onStartEdit = useCallback(() => {
    // Save unedited data
    previousState.current = profileData;
  }, [profileData]);

  const onFinishEdit = useCallback(async () => {
    // Check if there are no changes to the profile
    const hasNoChanges = Object.keys(profileData).every(
      (key) => profileData[key] === previousState.current[key]
    );

    if (hasNoChanges) {
      console.log("No changes");
      return;
    }

    // Update profile
    Burnt.alert({
      title: "Updating profile...",
      preset: "spinner",
      shouldDismissByTap: false,
    });

    await updateProfile(profileData);
  }, [profileData]);

  const onEditProfile = useCallback(() => {
    setIsViewing((prev) => !prev);

    if (isViewing) {
      onStartEdit();
    } else {
      onFinishEdit();
    }
  }, [isViewing, onFinishEdit, onStartEdit]);

  const onCancelEdit = useCallback(() => {
    if (isViewing) {
      // Do nothing if not editing
      return;
    }

    // Reset to previous data
    setProfileData(previousState.current);

    // Disable editing
    setIsViewing(true);

    // Close the keyboard
    Keyboard.dismiss();
  }, [isViewing]);

  const renderSheetFooter = useCallback(
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
            size={22}
            color={colors.primary}
            style={{ marginRight: sizes.small }}
          />
        </Button>
        <Button label="Logout" onPress={handleLogout}>
          <Ionicons
            name="log-out-outline"
            size={22}
            color="white"
            style={{ marginRight: sizes.small }}
          />
        </Button>
      </View>
    ),
    [handleLogout, isViewing, onEditProfile]
  );

  useScrollToTop(scrollViewRef);

  return (
    <SafeAreaView style={[globalStyles.flexFull, globalStyles.androidPadding]}>
      <AppHeader>
        <Button link onPress={onProfilePress}>
          <Avatar
            size={35}
            label={avatarLabel}
            autoColorsConfig={avatarColorsConfig}
          />
        </Button>
      </AppHeader>

      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={{
          rowGap: sizes.large,
          padding: sizes.large,
          paddingBottom: bottomTabHeight + StatusBar.currentHeight,
        }}
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
              <Text>Level 5</Text>
              <Text h1>Earth Warrior</Text>
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
              outlineColor={tab.color || colors.primary}
              style={{ columnGap: sizes.small }}
              onPress={tab.onPress}
            >
              <Ionicons
                name={tab.icon}
                size={20}
                color={tab.color || colors.primary}
              />
            </Button>
          ))}
        </View>

        <Text color={colors.gray} center>
          Member since{" "}
          {profile.createdAt && format(profile.createdAt, "MMMM yyyy")}
        </Text>
      </ScrollView>

      <BottomSheet
        ref={profileSheetRef}
        index={-1}
        snapPoints={["85%"]}
        enablePanDownToClose
        footerComponent={!isFetching && renderSheetFooter}
        onClose={onCancelEdit}
      >
        {isFetching ? (
          <View
            style={[globalStyles.center, { top: "20%", rowGap: sizes.large }]}
          >
            <ActivityIndicator size="large" />
            <Text style={{ color: colors.gray }}>Loading Profile...</Text>
          </View>
        ) : (
          <>
            <View
              style={{
                alignSelf: "flex-end",
                paddingHorizontal: sizes.xlarge,
                height: sizes.xlarge,
              }}
            >
              {!isViewing && (
                <Button link label="Cancel" onPress={onCancelEdit} />
              )}
            </View>

            <View style={{ rowGap: sizes.large, padding: sizes.large }}>
              <Avatar
                size={100}
                label={avatarLabel}
                autoColorsConfig={avatarColorsConfig}
                containerStyle={{ alignSelf: "center" }}
              />

              <FormInput
                value={profileData.name}
                setData={(name) => setProfileData({ name })}
                item={{
                  label: "Name",
                  placeholder: "Add name",
                  isViewing,
                }}
              />
              <FormInput
                value={profileData.country}
                setData={(country) => setProfileData({ country })}
                item={{
                  label: "Country",
                  placeholder: "Add country",
                  isViewing,
                  isDropdown: true,
                  dropdownData: [
                    {
                      label: "Please select a country:",
                      value: "",
                      disabled: true,
                    },
                    ...countries,
                  ],
                }}
              />
            </View>
          </>
        )}
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
