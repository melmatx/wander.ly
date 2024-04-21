import { BlurView } from "expo-blur";
import { Image } from "expo-image";
import React, { memo, useMemo } from "react";
import {
  Modal,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { Button, Text } from "react-native-ui-lib";

import globalStyles, { colors, sizes } from "../assets/styles/globalStyles";
import TaskTypes from "../consts/taskTypes";

const CO2_PER_MILE = 0.404; // Average CO2 emissions per mile by car in kg
const CO2_ABSORBED_PER_TREE_PER_YEAR = 21; // Average CO2 absorption per tree per year in kg
const STEP_LENGTH_IN_FEET = 2.5; // Average step length in feet
const FEET_PER_MILE = 5280; // Number of feet in a mile
const WALKING_SPEED_MPH = 3.1; // Average walking speed in miles per hour

const TaskCompletedModal = ({ item, visible, onClose }) => {
  const { savedCO2, savedTrees } = useMemo(() => {
    let savedCO2 = 0;

    switch (item.taskType) {
      case TaskTypes.DISTANCE:
        savedCO2 = item.maxValue * CO2_PER_MILE;
        break;
      case TaskTypes.STEP: {
        // Convert steps to miles
        const miles = (item.maxValue * STEP_LENGTH_IN_FEET) / FEET_PER_MILE;

        savedCO2 = miles * CO2_PER_MILE;
        break;
      }
      case TaskTypes.TIME: {
        // Convert time in seconds to hours
        const hours = item.maxValue / 3600;

        // Calculate distance walked
        const distance = hours * WALKING_SPEED_MPH;

        savedCO2 = distance * CO2_PER_MILE;
      }
    }

    const savedTrees = savedCO2 / CO2_ABSORBED_PER_TREE_PER_YEAR;

    return {
      savedCO2,
      savedTrees,
    };
  }, [item.maxValue, item.taskType]);

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <BlurView
        intensity={Platform.OS === "ios" ? 80 : 35}
        style={globalStyles.flexFull}
        experimentalBlurMethod="dimezisBlurView"
      >
        <SafeAreaView
          style={[globalStyles.flexFull, globalStyles.androidPadding]}
        >
          <ScrollView
            contentContainerStyle={{
              padding: sizes.large,
              rowGap: sizes.xxlarge,
            }}
          >
            <View style={{ rowGap: sizes.large }}>
              <Text h1 semibold>
                🏆 Task Completed
              </Text>

              <View
                style={{
                  borderBottomColor: "gray",
                  borderBottomWidth: StyleSheet.hairlineWidth,
                }}
              />
            </View>

            <View style={{ rowGap: sizes.xxlarge }}>
              <Text style={{ fontSize: 18 }}>
                In today's world, understanding the environmental impact of our
                daily choices is crucial. By using our app to calculate the CO2
                emissions you save by walking, and seeing how many trees it
                would take to absorb that CO2, you can see the real-time
                benefits of opting for greener transportation.
              </Text>

              <Text style={{ fontSize: 18 }}>
                This not only helps in combating climate change but also
                promotes healthier lifestyles and raises awareness about the
                personal steps we can take to reduce our carbon footprint,
                encouraging a more sustainable and environmentally conscious
                community.
              </Text>
            </View>

            <View style={{ rowGap: sizes.large, marginTop: sizes.medium }}>
              <Image
                source={require("../assets/images/eco/car-emissions.jpg")}
                style={{ aspectRatio: 1.4, borderRadius: sizes.medium }}
              />
              <Text h2 semibold>
                Average CO2 emissions per mile by car
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  textAlign: "justify",
                }}
              >
                The typical amount of carbon dioxide (CO2) produced by a vehicle
                for every mile driven.
              </Text>
              <Text h2 center>
                {CO2_PER_MILE} kg
              </Text>
            </View>

            <View
              style={{
                borderBottomColor: "gray",
                borderBottomWidth: StyleSheet.hairlineWidth,
              }}
            />

            <View style={{ rowGap: sizes.large, marginBottom: sizes.small }}>
              <Image
                source={require("../assets/images/eco/tree-absorbed.jpg")}
                style={{ aspectRatio: 1.4, borderRadius: sizes.medium }}
              />
              <Text h2 semibold>
                Average CO2 absorption per tree per year
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  textAlign: "justify",
                }}
              >
                The typical amount of carbon dioxide (CO2) that a single tree
                can remove from the atmosphere over the course of a year.
              </Text>
              <Text h2 center>
                {CO2_ABSORBED_PER_TREE_PER_YEAR} kg
              </Text>
            </View>

            <Text center color={colors.gray} style={{ fontSize: 18 }}>
              "Every mile you choose to walk rather than drive saves enough CO2
              to help a tree breathe easier for a day—your choices plant the
              seeds for a greener tomorrow."
            </Text>

            <View style={{ rowGap: sizes.large }}>
              <View
                style={{
                  borderBottomColor: "gray",
                  borderBottomWidth: StyleSheet.hairlineWidth,
                }}
              />

              <Text h1 semibold>
                Total Eco Savings
              </Text>
              <View style={{ rowGap: sizes.small }}>
                <Text h3>CO2 Emissions Saved: {savedCO2.toFixed(2)} kg</Text>
                <Text h3>Trees Saved: {savedTrees.toFixed(2)}</Text>
              </View>
            </View>

            <Button
              label="Done"
              onPress={onClose}
              style={{ margin: sizes.medium }}
            />
          </ScrollView>
        </SafeAreaView>
      </BlurView>
    </Modal>
  );
};

export default memo(TaskCompletedModal);
