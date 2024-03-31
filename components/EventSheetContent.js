import Ionicons from "@expo/vector-icons/Ionicons";
import { format } from "date-fns";
import React from "react";
import { View } from "react-native";
import { Button, Text } from "react-native-ui-lib";

import globalStyles, { colors, sizes } from "../assets/styles/globalStyles";

const EventSheetContent = ({ event, onButtonPress, onShare }) => {
  // Random remaining slots
  const eventSlots = Math.floor(Math.random() * 10);

  return (
    <View
      style={[
        globalStyles.flexFull,
        globalStyles.spaceBetween,
        {
          rowGap: sizes.medium,
          padding: sizes.large,
        },
      ]}
    >
      <View style={{ rowGap: sizes.small }}>
        <Text h1 white>
          {event.title}
        </Text>
        <Text white>{event.description}</Text>
      </View>

      <View style={{ rowGap: sizes.small }}>
        <Text color={colors.gray}>Remaining slots: {eventSlots}</Text>
        <Text color={colors.gray}>
          Event deadline: {format(event.deadline, "MMM dd, yyyy, hh:mm a")}
        </Text>
      </View>

      <View style={globalStyles.rowCenter}>
        <Button
          label="Done"
          onPress={onButtonPress}
          style={globalStyles.flexFull}
        />
        <Button link style={{ padding: sizes.large }} onPress={onShare}>
          <Ionicons name="share-outline" size={25} color="white" />
        </Button>
      </View>
    </View>
  );
};

export default EventSheetContent;
