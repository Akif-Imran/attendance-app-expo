import { StyleSheet, Text, View } from "react-native";
import React, { FC, Dispatch } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { CoursesList, ChildrenList, LecturesList } from "../../screens/student";
import { StudentStackParamsList } from "../../types";
import { colors } from "../../theme";
import globalStyles from "../../theme/globalStyles";
import Ionicons from "@expo/vector-icons/Ionicons";

const Stack = createStackNavigator<StudentStackParamsList>();

interface StudentStackProps {
  setAuth: Dispatch<React.SetStateAction<boolean>>;
}
const TeacherStack: FC<StudentStackProps> = () => {
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
        headerRight: () => (
          <Ionicons name="notifications" size={20} color={colors.white} />
        ),
        headerRightContainerStyle: {
          paddingRight: 8,
        },
      }}
    >
      <Stack.Screen name="Dashboard" component={CoursesList} />
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
