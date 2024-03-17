import React from "react";
import { SafeAreaView, View } from "react-native";
import { Text } from "react-native-ui-lib";

import globalStyles, { sizes } from "../assets/styles/globalStyles";

const Profile = ({ route }) => {
  return (
    <SafeAreaView style={globalStyles.flexFull}>
      <View style={{ padding: sizes.large }}>
        <View style={{ marginBottom: sizes.xlarge }}>
          <Text h1 white>
            {route.name}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default Profile;
