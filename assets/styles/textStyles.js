import { StyleSheet } from "react-native";


const textStyles = StyleSheet.create({
  logo: {
    fontFamily: "Lexend-SemiBold",
    fontSize: 50,
  },
  heading: {
    fontFamily: "Lexend-SemiBold",
    fontSize: 30,
    includeFontPadding: false,
  },
  subHeading: {
    fontFamily: "Lexend-Medium",
    fontSize: 24,
  },
  title: {
    fontFamily: "Lexend-SemiBold",
    fontSize: 20,
  },
  subTitle: {
    fontFamily: "Lexend-Medium",
    fontSize: 16,
  },
  body: {
    fontFamily: "Lexend-Regular",
    fontSize: 14,
  },
  caption: {
    fontFamily: "Lexend-Regular",
    color: "gray",
  },
  link: {
    fontFamily: "Lexend-Regular",
    textDecorationLine: "underline",
    fontSize: 16,
  },
  icon: {
    fontSize: 80,
  },
  iconRow: {
    fontSize: 40,
    color: "gray",
    fontFamily: "Lexend-Regular",
  },
});

export default textStyles;
