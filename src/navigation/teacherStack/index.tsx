import { StyleSheet, Text, View } from "react-native";
import React, { FC, Dispatch } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
  Attendance,
  ClassesList,
  Course,
  CoursesList,
  Notification,
  Dashboard,
} from "../../screens/teacher";

const Stack = createStackNavigator();

interface TeacherStackProps {
  setAuth: Dispatch<React.SetStateAction<boolean>>;
}
const TeacherStack: FC<TeacherStackProps> = () => {
  return (
    <Stack.Navigator>
      {/* <Stack.Screen name="Dashboard" component={Dashboard} /> */}
      <Stack.Screen name="CoursesList" component={CoursesList} />
      <Stack.Screen name="ClassesList" component={ClassesList} />
      <Stack.Screen name="Course" component={Course} />
      <Stack.Screen name="Notification" component={Notification} />
      <Stack.Screen name="Attendance" component={Attendance} />
    </Stack.Navigator>
  );
};

export default TeacherStack;

const styles = StyleSheet.create({});
