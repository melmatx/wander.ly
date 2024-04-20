import { Platform } from "react-native";

const getPlatformNetwork = (isAlt = false) =>
  Platform.OS === "android"
    ? "http://10.0.2.2:4943"
    : isAlt
      ? "http://localhost:4943"
      : "http://127.0.0.1:4943";

export default getPlatformNetwork;
