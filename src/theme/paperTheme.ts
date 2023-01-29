import { colors } from './colors'
import type { Theme, Font } from 'react-native-paper'


export const PaperTheme: Theme = {
    roundness: 8,
    fonts: {
        thin: {
            fontFamily: "Visby-Regular",
        },
        regular: {
            fontFamily: "Visby-Medium",
        },
        medium: {
            fontFamily: "Visby-Bold",
        },
    },
    colors: {
        text: colors.titleText,
        placeholder: colors.textGray,
        primary: colors.primary,
        notification: colors.secondary,
        error: colors.error,
        accent: colors.darkGray


    },
};