import { Image, ImageBackground } from "expo-image";
import React, { useState } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";
import { Button, Text } from "react-native-ui-lib";

import globalStyles, { sizes } from "../assets/styles/globalStyles";
import useAuthStore from "../stores/useAuthStore";
import useProfileStore from "../stores/useProfileStore";

const Login = () => {
  const [logoLoaded, setLogoLoaded] = useState(false);

  // const login = useAuthStore((state) => state.login);
  const login = useAuthStore((state) => state.loginTest);
  const isFetching = useProfileStore((state) => state.isFetching);

  return (
    <ImageBackground
      source={require("../assets/images/bg.jpg")}
      transition={300}
      style={globalStyles.flexFull}
    >
      <SafeAreaView style={globalStyles.flexFull}>
        {!logoLoaded && (
          <View style={[StyleSheet.absoluteFill, globalStyles.flexCenter]}>
            <ActivityIndicator size="large" />
          </View>
        )}

        <View
          style={[
            globalStyles.flexFull,
            globalStyles.spaceBetween,
            { padding: sizes.xlarge },
          ]}
        >
          <View style={globalStyles.flexCenter}>
            <View
              style={[
                globalStyles.center,
                {
                  rowGap: sizes.medium,
                },
              ]}
            >
              <Image
                source={require("./../assets/images/logo.png")}
                transition={300}
                style={{ height: 250, width: 300 }}
              />

              <View
                style={[globalStyles.rowCenter, { columnGap: sizes.medium }]}
              >
                {logoLoaded && (
                  <Text body color="lightgray">
                    Powered by:{" "}
                  </Text>
                )}
                <Image
                  source={require("./../assets/images/dfinity.png")}
                  onLoad={() => setLogoLoaded(true)}
                  style={{ height: 30, width: 60 }}
                />
              </View>
            </View>
          </View>

          <Button
            semibold
            label={isFetching ? " " : "Login with Internet Identity"}
            style={{
              marginHorizontal: sizes.xlarge,
              marginVertical: sizes.medium,
            }}
            enableShadow
            onPress={login}
            disabled={isFetching}
          >
            {isFetching && <ActivityIndicator />}
          </Button>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default Login;
