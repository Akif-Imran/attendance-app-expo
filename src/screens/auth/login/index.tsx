import {
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
  ToastAndroid,
} from "react-native";
import React, { useState, FC } from "react";
import Fontisto from "@expo/vector-icons/Fontisto";

//third party imports
import { TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
//my imports
import { colors, gStyles, PaperTheme } from "../../../theme";
import { _Button } from "../../../components/general";

import { styles } from "./styles";
import { useUserContext } from "../../../contexts";
import { api } from "../../../helpers";
import { ApiLoginResponseUser } from "../../../types";

interface LoginProps {}

const Login: FC<LoginProps> = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [secureEntry, setSecureEntry] = useState<boolean>(true);
  const [icon, setIcon] = useState<string>("eye");
  const { setUser, setIsAuthorized } = useUserContext();

  const handleLogin = async () => {
    try {
      console.log("login triggered");
      const response = await api.post("/login/authenticate-user", {
        username,
        password,
      });
      if (response.status === 200) {
        const data: ApiLoginResponseUser = response.data;
        console.log(data);
        if (data.userType) {
          setIsAuthorized(true);
          setUser(data);
        } else {
          ToastAndroid.show("Invalid username or password", ToastAndroid.LONG);
          return;
        }
      }
    } catch (e) {
      ToastAndroid.show("Invalid username or password", ToastAndroid.LONG);
    }
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
              theme={PaperTheme}
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
              theme={PaperTheme}
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
          <_Button title="LOG IN" onPress={handleLogin} size="large" />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Login;
