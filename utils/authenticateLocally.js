import * as Burnt from "burnt";
import * as LocalAuthentication from "expo-local-authentication";

import { colors } from "../assets/styles/globalStyles";

const authenticateLocally = async ({
  onSuccess,
  onError,
  errorOnUnavailable = true,
}) => {
  const isEnrolled = await LocalAuthentication.isEnrolledAsync();

  if (isEnrolled) {
    const { success, error } = await LocalAuthentication.authenticateAsync();

    if (error) {
      Burnt.alert({
        title: "Authentication Failed",
        preset: "custom",
        icon: { ios: { name: "lock.slash.fill" } },
        message: "Please try again",
        duration: 1,
      });

      onError?.();
    }

    if (success) {
      // Wait for animation to finish before awarding the point
      await new Promise((resolve) => setTimeout(resolve, 1000));

      onSuccess?.();
    }
  } else {
    Burnt.toast({
      title: "No Biometrics Enrolled",
      message: "Please set up biometrics in your device settings",
      preset: "custom",
      duration: 1.5,
      icon: {
        ios: {
          name: "faceid",
          color: colors.primary,
        },
      },
    });

    if (errorOnUnavailable) {
      onError?.();
    } else {
      onSuccess?.();
    }
  }
};

export default authenticateLocally;
