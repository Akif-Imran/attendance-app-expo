import { BackHandler, StyleSheet, Text, View } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import CoursesList from "./CoursesList";
import ClassesList from "./ClassesList";

const Stack = createStackNavigator();

const Attendance = () => {
  return (
    <Stack.Navigator
      initialRouteName="CoursesList"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="CoursesList" component={CoursesList} />
      <Stack.Screen name="ClassesList" component={ClassesList} />
    </Stack.Navigator>
  );
};

export default Attendance;

const styles = StyleSheet.create({});
