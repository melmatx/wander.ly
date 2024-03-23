import Ionicons from "@expo/vector-icons/Ionicons";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useScrollToTop } from "@react-navigation/native";
import { format } from "date-fns";
import { LinearGradient } from "expo-linear-gradient";
import React, { useCallback, useRef } from "react";
import { Alert, SafeAreaView, ScrollView, View } from "react-native";
import { AnimatedScanner, Avatar, Button, Text } from "react-native-ui-lib";

import globalStyles, { colors, sizes } from "../assets/styles/globalStyles";
import BottomSheet from "../components/BottomSheet";
import FormInput from "../components/FormInput";
import InfoSheetContent from "../components/InfoSheetContent";
import avatarColorsConfig from "../consts/avatarConfig";
import Routes from "../navigation/Routes";
import useAuthStore from "../stores/useAuthStore";

const PALETTE = ["#FF4848", "#0079FF", "#00DFA2", "#F6FA70"];

const Profile = ({ navigation, route }) => {
  const profileSheetRef = useRef(null);
  const infoSheetRef = useRef(null);
  const scrollViewRef = useRef(null);

  const logout = useAuthStore((state) => state.logout);
  const bottomTabHeight = useBottomTabBarHeight();

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

  const bottomSheetFooter = useCallback(
    () => (
      <Button
        label="Logout"
        onPress={handleLogout}
        style={{ marginHorizontal: sizes.large }}
      />
    ),
    [handleLogout]
  );

  useScrollToTop(scrollViewRef);

  return (
    <SafeAreaView style={globalStyles.flexFull}>
      <View style={{ padding: sizes.large }}>
        <View style={[globalStyles.rowCenter, globalStyles.spaceBetween]}>
          <Text h1 white>
            {route.name}
          </Text>

          <Button link onPress={onProfilePress}>
            <Avatar
              size={35}
              label="MP"
              autoColorsConfig={avatarColorsConfig}
            />
          </Button>
        </View>
      </View>

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

        <LinearGradient
          colors={[PALETTE[0], colors.dark]}
          locations={[0.1, 0.9]}
          style={[
            globalStyles.spaceBetween,
            {
              height: 150,
              padding: sizes.large,
              borderRadius: sizes.medium,
            },
          ]}
        >
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

          <Text profile>
            🏆 <Text white>0</Text>
          </Text>
        </LinearGradient>

        <LinearGradient
          colors={[PALETTE[1], colors.dark]}
          locations={[0.1, 0.9]}
          style={[
            globalStyles.spaceBetween,
            {
              height: 150,
              padding: sizes.large,
              borderRadius: sizes.medium,
            },
          ]}
        >
          <Text profile white>
            1500km
          </Text>
          <Text h2 white>
            Distance walked
          </Text>
        </LinearGradient>

        <LinearGradient
          colors={[PALETTE[2], colors.dark]}
          locations={[0.1, 0.9]}
          style={[
            globalStyles.spaceBetween,
            {
              height: 150,
              padding: sizes.large,
              borderRadius: sizes.medium,
            },
          ]}
        >
          <Text profile white>
            200
          </Text>
          <Text h2 white>
            Trees saved
          </Text>
        </LinearGradient>

        <LinearGradient
          colors={[PALETTE[3], colors.dark]}
          locations={[0.1, 0.9]}
          style={[
            globalStyles.spaceBetween,
            {
              height: 150,
              padding: sizes.large,
              borderRadius: sizes.medium,
            },
          ]}
        >
          <Text profile white>
            200lbs
          </Text>
          <Text h2 white>
            Carbon emissions saved
          </Text>
        </LinearGradient>

        <View style={{ marginVertical: sizes.medium, rowGap: sizes.large }}>
          <Button
            label="Awarded Posts"
            outline
            outlineColor={colors.primary}
            style={{ columnGap: sizes.small }}
          >
            <Ionicons name="star" size={20} color={colors.primary} />
          </Button>

          <Button
            label="Liked Posts"
            outline
            outlineColor={colors.primary}
            style={{ columnGap: sizes.small }}
          >
            <Ionicons name="heart" size={20} color={colors.primary} />
          </Button>
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

          <FormInput
            value="Mel Mathew"
            item={{ label: "Name", isViewing: true }}
          />
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
