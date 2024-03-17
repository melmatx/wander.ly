import { StatusBar, StyleSheet } from "react-native";

export const sizes = {
  xsmall: 3,
  small: 5,
  medium: 10,
  large: 15,
  xlarge: 20,
  xxlarge: 25,
};

export const colors = {
  primary: "#0CC0DF",
  secondary: "#FFCBCB",
  tertiary: "#F6F6F6",
  dark: "#1c1c1e",
  darkgray: "#2c2c2e",
};

const globalStyles = StyleSheet.create({
  flexFull: {
    flex: 1,
  },
  flexCenter: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  center: {
    alignItems: "center",
  },
  rowCenter: {
    flexDirection: "row",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
  },
  spaceBetween: {
    justifyContent: "space-between",
  },
  androidPadding: {
    paddingTop: StatusBar.currentHeight,
  },
});

export default globalStyles;
