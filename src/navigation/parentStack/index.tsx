import { StyleSheet, Text, View } from "react-native";
import React, { FC, Dispatch } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { CoursesList, ChildrenList, LecturesList } from "../../screens/parent";
import { TeacherStackParamsList, ParentStackParamsList } from "../../types";
import { colors } from "../../theme";
import globalStyles from "../../theme/globalStyles";

const Stack = createStackNavigator<ParentStackParamsList>();

interface ParentStackProps {
  setAuth: Dispatch<React.SetStateAction<boolean>>;
}
const TeacherStack: FC<ParentStackProps> = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: colors.white,
        headerTitleStyle: {
          ...globalStyles.cardTitleText,
          color: colors.white,
          fontFamily: "Visby-Medium",
        },
        headerStyle: {
          backgroundColor: colors.primary,
        },
      }}
    >
      <Stack.Screen name="Dashboard" component={ChildrenList} />
      <Stack.Screen
        name="CoursesList"
        component={CoursesList}
        options={({ route }) => ({
          title: route.params.childName,
        })}
      />
      <Stack.Screen
        name="LectureList"
        component={LecturesList}
        options={({ route }) => ({
          title: route.params.courseName,
        })}
      />
    </Stack.Navigator>
  );
};

export default TeacherStack;

const styles = StyleSheet.create({});
