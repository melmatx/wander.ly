import Ionicons from "@expo/vector-icons/Ionicons";
import React, { memo, useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { TextField } from "react-native-ui-lib";

import { colors, sizes } from "../assets/styles/globalStyles";

const TextInput = (props) => {
  const trailingAccessory = useMemo(() => {
    let accessory;

    if (props.isPassword && props.value) {
      accessory = (
        <TouchableOpacity onPress={props.onTogglePasswordsVisibility}>
          <Ionicons
            name={props.arePasswordsVisible ? "eye-off" : "eye"}
            size={24}
            color={colors.primary}
          />
        </TouchableOpacity>
      );
    }

    if (props.isDropdown) {
      accessory = (
        <Ionicons name="chevron-down" size={24} color={colors.primary} />
      );
    }

    if (props.isDate) {
      accessory = <Ionicons name="calendar" size={24} color={colors.primary} />;
    }

    if (accessory) {
      return (
        <View style={{ position: "absolute", right: sizes.small }}>
          {accessory}
        </View>
      );
    }

    return null;
  }, [props]);

  return (
    <TextField
      h1
      white
      labelStyle={{ color: props.isViewing ? "lightgray" : "gray" }}
      fieldStyle={[
        { paddingVertical: sizes.medium },
        props.isTextArea && { height: 150 },
        trailingAccessory && { paddingRight: sizes.xxlarge },
        !props.isViewing && {
          borderBottomWidth: StyleSheet.hairlineWidth,
          borderBottomColor: "gray",
        },
        props.fieldStyle,
      ]}
      readOnly={props.isViewing}
      autoCapitalize={props.isEmail ? "none" : "words"}
      secureTextEntry={props.isPassword && !props.arePasswordsVisible}
      trailingAccessory={!props.isViewing && trailingAccessory}
      validationMessageStyle={{
        paddingVertical: sizes.medium,
      }}
      {...props}
    />
  );
};

export default memo(TextInput);
