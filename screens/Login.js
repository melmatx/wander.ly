import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { ActivityIndicator, SafeAreaView, View } from "react-native";
import { Button, Text } from "react-native-ui-lib";

import globalStyles, { sizes } from "../assets/styles/globalStyles";
import useAuthStore from "../stores/useAuthStore";
import useProfileStore from "../stores/useProfileStore";

const Login = () => {
  const login = useAuthStore((state) => state.login);
  // const login = useAuthStore((state) => state.loginTest);
  const isFetching = useProfileStore((state) => state.isFetching);

  return (
    <>
      <LinearGradient
        colors={["rgba(0,0,0,0.5)", "rgba(0,0,0,0.1)", "transparent"]}
        locations={[0, 0.8, 1]}
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          height: 200,
        }}
      />

      <SafeAreaView style={globalStyles.flexFull}>
        <StatusBar style="light" animated />
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
                style={{ height: 300, width: 300 }}
              />

              <View
                style={[
                  globalStyles.rowCenter,
                  { columnGap: sizes.small, marginTop: sizes.small },
                ]}
              >
                <Text body color="lightgray">
                  Powered by:{" "}
                </Text>
                <Image
                  source={require("./../assets/images/dfinity.png")}
                  style={{ height: 35, width: 60 }}
                />
              </View>
            </View>
          </View>

          <Button
            label={isFetching ? " " : "Login with Internet Identity"}
            labelProps={{ h2: true }}
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
    </>
  );
};

export default Login;
