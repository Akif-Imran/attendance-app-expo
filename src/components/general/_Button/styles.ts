import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  mainContainer: {
    // flex: 1,
    padding: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 75,
    marginHorizontal: 4,
    // borderWidth: 1,
  },
  btnTitle: {
    flex: 1,
    flexDirection: "row",
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 14,
    // borderWidth: 1,
  },
  small: {
    paddingVertical: 8,
  },
  textSmall: {
    fontFamily: 'Visby-Medium',
    fontSize: 12,
  },
  medium: {
    paddingVertical: 10,
  },
  textMedium: {
    fontFamily: 'Visby-Medium',
    fontSize: 14
  },
  large: {
    paddingVertical: 20,
  },
  textLarge: {
    fontFamily: "Visby-Bold",
    fontSize: 16,
  }
});
