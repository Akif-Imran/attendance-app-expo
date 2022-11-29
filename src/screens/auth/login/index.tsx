import { Text, View, KeyboardAvoidingView, Platform } from "react-native";
import React, { useState, FC } from "react";
import Fontisto from "@expo/vector-icons/Fontisto";

//third party imports
import { TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
//my imports
import { colors, gStyles } from "../../../theme";
import { _Button } from "../../../components/general";

import { styles } from "./styles";

interface LoginProps {
  setAuth: React.Dispatch<React.SetStateAction<boolean>>;
}
const Login: FC<LoginProps> = ({ setAuth }) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [secureEntry, setSecureEntry] = useState<boolean>(true);
  const [icon, setIcon] = useState<string>("eye");

  //refactor complete theme.
  const textInputTheme = {
    roundness: 15,
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
      text: colors.qtyTextGray,
      placeholder: colors.qtyTextGray,
      primary: colors.primary,
      notification: colors.secondary,
    },
  };
  return (
    //safe are container
    <SafeAreaView style={styles.mainContainer}>
      {/* provides keyboard safe */}
      <KeyboardAvoidingView
        style={styles.keyboardViewContainer}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        {/* text above input fields */}
        <View style={styles.textContainer}>
          <Text style={gStyles.headerText}>Login</Text>
          <Text style={gStyles.descText}>If you don't have an account,</Text>
          <Text style={gStyles.descText}>
            please start
            <Text style={gStyles.descTextPrimaryBold}> here</Text>
          </Text>
        </View>
        {/* username and password fields container */}
        <View style={styles.inputContainer}>
          {/* username field container */}
          <View style={styles.textFieldContainer}>
            <TextInput
              theme={textInputTheme}
              mode="outlined"
              label="Username"
              value={username}
              outlineColor={colors.borderColor}
              selectionColor={colors.primary}
              clearButtonMode="while-editing"
              activeOutlineColor={colors.primary}
              onChangeText={(text) => setUsername(text)}
              style={{
                fontSize: 16,
                color: colors.textGray,
              }}
              left={<TextInput.Icon icon="email" color={colors.iconGray} />}
            />
          </View>
          {/* password field container */}
          <View style={styles.textFieldContainer}>
            <TextInput
              theme={textInputTheme}
              mode="outlined"
              autoCapitalize="none"
              label="Password"
              value={password}
              outlineColor={colors.borderColor}
              selectionColor={colors.primary}
              clearButtonMode="while-editing"
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={secureEntry}
              style={{
                fontSize: 16,
                color: colors.textGray,
              }}
              left={
                <TextInput.Icon
                  icon={() => (
                    <Fontisto name="locked" color={colors.iconGray} size={20} />
                  )}
                />
              }
              right={
                <TextInput.Icon
                  icon={icon}
                  color={colors.iconGray}
                  onPress={() => {
                    setSecureEntry(!secureEntry);
                    setIcon((prev) => (prev === "eye" ? "eye-off" : "eye"));
                  }}
                />
              }
            />
          </View>
          {/* forgot password container */}
          <View style={{ marginTop: 15 }}>
            <Text
              style={[gStyles.descTextPrimaryBold, { textAlign: "center" }]}
            >
              Forgot the password?
            </Text>
          </View>
        </View>
        {/* login button container */}
        <View style={styles.buttonContainer}>
          <_Button title="LOG IN" onPress={() => setAuth(true)} size="large" />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Login;
