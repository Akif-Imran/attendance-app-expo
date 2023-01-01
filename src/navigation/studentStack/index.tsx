import { StyleSheet, Text, View } from "react-native";
import React, { FC, Dispatch } from "react";
import {
  StackNavigationOptions,
  createStackNavigator,
} from "@react-navigation/stack";
import { CoursesList, LecturesList, Notification } from "../../screens/student";
import {
  StudentStackDashboardOptionsCallback,
  StudentStackParamsList,
  StudentStackScreenProps,
} from "../../types";
import { colors } from "../../theme";
import globalStyles from "../../theme/globalStyles";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useUserContext } from "../../contexts";

const Stack = createStackNavigator<StudentStackParamsList>();

interface StudentStackProps {
  setAuth: Dispatch<React.SetStateAction<boolean>>;
}
const TeacherStack: FC<StudentStackProps> = () => {
  const { setIsAuthorized, setUser } = useUserContext();

  const stackNavigatorOptions: StackNavigationOptions = {
    headerTintColor: colors.white,
    headerTitleStyle: {
      ...globalStyles.cardTitleText,
      color: colors.white,
      fontFamily: "Visby-Medium",
    },
    headerStyle: {
      backgroundColor: colors.primary,
    },
  };

  const optionsDashboardCallback: StudentStackDashboardOptionsCallback = ({
    navigation,
  }) => ({
    headerRight: () => (
      <MaterialCommunityIcons
        name="logout"
        size={20}
        color={colors.white}
        onPress={() => {
          setIsAuthorized(false);
          setUser(undefined);
        }}
      />
    ),
    headerLeft: ({}) => (
      <Ionicons
        name="notifications"
        size={20}
        color={colors.white}
        onPress={() => navigation.navigate("Notification")}
      />
    ),
    headerRightContainerStyle: {
      paddingHorizontal: 15,
    },
    headerLeftContainerStyle: {
      paddingHorizontal: 15,
    },
  });

  return (
    <Stack.Navigator screenOptions={stackNavigatorOptions}>
      <Stack.Screen
        name="Dashboard"
        component={CoursesList}
        options={optionsDashboardCallback}
      />
      <Stack.Screen
        name="LectureList"
        component={LecturesList}
        options={({ route }) => ({
          title: `${route.params.courseCode}-${route.params.courseName}`,
        })}
      />
      <Stack.Screen name="Notification" component={Notification} />
    </Stack.Navigator>
  );
};

export default TeacherStack;

const styles = StyleSheet.create({});
