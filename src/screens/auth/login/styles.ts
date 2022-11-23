import { StyleSheet } from "react-native";
import { colors } from "../../../theme";


export const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 80,
        backgroundColor: colors.white,
        // borderWidth: 1,
    },
    keyboardViewContainer: {
        flex: 1,
        // borderWidth: 1,
    },
    textContainer: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-end",
        alignItems: "center",
        // borderWidth: 1,
    },
    inputContainer: {
        flex: 2,
        // alignItems: "center",
        // borderWidth: 1,
    },
    textFieldContainer: {
        // flex: 1,
        marginVertical: 8,
        // borderWidth: 1,
    },
    buttonContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        // borderWidth: 1,
    },
});
