import Ionicons from "@expo/vector-icons/Ionicons";
import React, { memo, useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { TextField } from "react-native-ui-lib";

import { colors, sizes } from "../assets/styles/globalStyles";
import textStyles from "../assets/styles/textStyles";

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
      style={textStyles.subTitle}
      labelStyle={[
        textStyles.subTitle,
        { color: props.isViewing ? colors.tertiary : "gray" },
      ]}
      fieldStyle={{
        ...(!props.isViewing && {
          borderBottomWidth: StyleSheet.hairlineWidth,
          borderBottomColor: "gray",
        }),
        paddingVertical: sizes.medium,
        paddingRight: sizes.xxlarge,
      }}
      readOnly={props.isViewing}
      autoCapitalize={props.isEmail ? "none" : "words"}
      secureTextEntry={props.isPassword && !props.arePasswordsVisible}
      trailingAccessory={!props.isViewing && trailingAccessory}
      validationMessageStyle={{
        paddingVertical: sizes.medium,
        ...textStyles.body,
      }}
      {...props}
    />
  );
};

export default memo(TextInput);
