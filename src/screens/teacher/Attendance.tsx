import { BackHandler, StyleSheet, Text, View } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ClassesList from "./ClassesList";
import LectureList from "./LecturesList";

const Stack = createStackNavigator();

const Attendance = () => {
  return (
    <Stack.Navigator
      initialRouteName="ClassesList"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="ClassesList" component={ClassesList} />
      <Stack.Screen name="LectureList" component={LectureList} />
    </Stack.Navigator>
  );
};

export default Attendance;

const styles = StyleSheet.create({});

