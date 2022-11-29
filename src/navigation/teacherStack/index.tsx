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
  StudentList,
} from "../../screens/teacher";
import { TeacherStackParamsList } from "../../types";
import { colors } from "../../theme";

const Stack = createStackNavigator<TeacherStackParamsList>();

interface TeacherStackProps {
  setAuth: Dispatch<React.SetStateAction<boolean>>;
}
const TeacherStack: FC<TeacherStackProps> = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: colors.titleText,
      }}
    >
      <Stack.Screen name="Dashboard" component={Dashboard} />
      <Stack.Screen
        name="CoursesList"
        component={CoursesList}
        options={{
          title: "Courses List",
        }}
      />
      <Stack.Screen
        name="ClassesList"
        component={ClassesList}
        options={{
          title: "Classes List",
        }}
      />
      <Stack.Screen name="StudentList" component={StudentList} />
      <Stack.Screen name="Notification" component={Notification} />
      <Stack.Screen name="Course" component={Course} />
    </Stack.Navigator>
  );
};

export default TeacherStack;

const styles = StyleSheet.create({});
