import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Login } from "../../screens/auth";
import TeacherStack from "../teacherStack";

const Stack = createStackNavigator();
const AuthStack = () => {
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {isAuthorized ? (
        <Stack.Screen name="TeacherStack">
          {(props) => <TeacherStack {...props} setAuth={setIsAuthorized} />}
        </Stack.Screen>
      ) : (
        <Stack.Screen name="Login">
          {(props) => <Login {...props} setAuth={setIsAuthorized} />}
        </Stack.Screen>
      )}
    </Stack.Navigator>
  );
};

export default AuthStack;
