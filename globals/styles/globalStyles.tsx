import { StyleSheet } from "react-native";

const globalStyles = StyleSheet.create({
  debugBorder: {
    borderColor: "#f00",
    borderWidth: 1,
  },
  mainTextColor: {
    color: "#ffffff",
  },
  textXl: {
    fontSize: 36,
  },
  textLg: {
    fontSize: 32,
  },
  textMd: {
    fontSize: 28,
  },
  textBase: {
    fontSize: 24,
  },
  textSm: {
    fontSize: 20,
  },
  textXs: {
    fontSize: 16,
  },
  regularBtnStyle: {
    borderRadius: 12,
    width: "100%",
    textAlign: "center",
    padding: 15,
  },
  topRadius: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  topRadiusXl: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  defaultTextInput: {
    borderWidth: 1,
    borderColor: "#ffffff40",
    backgroundColor: "#ffffff20",
    color: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
  },
});

export default globalStyles;
