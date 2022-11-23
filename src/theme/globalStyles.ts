import { StyleSheet } from "react-native";
import colors from "./colors";

const globalStyles = StyleSheet.create({
    headerText: {
        fontFamily: "Visby-Heavy",
        fontSize: 24,
        color: colors.titleText,
    },
    smallHeaderText: {
        fontFamily: "Visby-Bold",
        fontSize: 20,
        color: colors.titleText,
    },
    tinyHeaderText: {
        fontFamily: "Visby-Bold",
        fontSize: 20,
        color: colors.titleText,
    },
    largeDescText: {
        fontFamily: "Visby-Bold",
        fontSize: 16,
        color: colors.qtyTextGray,
    },
    descText: {
        fontFamily: "Visby-Bold",
        fontSize: 14,
        color: colors.qtyTextGray,
    },
    descTextPrimaryBold: {
        fontFamily: "Visby-Bold",
        fontSize: 14,
        // textAlign: "center",
        textAlignVertical: 'center',
        color: colors.primary,
    },
    descTextPrimary: {
        fontFamily: "Visby-Medium",
        fontSize: 14,
        textAlign: "center",
        color: colors.primary,
    },
})

export default globalStyles;