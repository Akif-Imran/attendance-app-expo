import { StyleSheet } from "react-native";
import { colors } from "./colors";

const globalStyles = StyleSheet.create({
    headerText: {
        fontFamily: "Visby-Heavy",
        fontSize: 24,
        color: colors.titleText,
    },
    cardInfoTitleText: {
        fontFamily: "Visby-Bold",
        fontSize: 16,
        color: colors.titleText,
        textAlign: "left",
        textAlignVertical: "center",
        // borderWidth: 1,
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
    cardDetailsText: {
        // paddingHorizontal: 4,
        // paddingVertical: 2,
        fontSize: 16,
        fontFamily: "Visby-Regular",
        color: colors.xHeavyGray,
    },
    cardTitleText: {
        // paddingHorizontal: 4,
        // paddingVertical: 2,
        fontSize: 16,
        fontFamily: "Visby-Regular",
        color: colors.lightGray,
    },
    cardDescText: {
        fontSize: 14,
        fontFamily: 'Visby-Regular',
        color: colors.xHeavyGray,
    }
})

export default globalStyles;