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
import globalStyles from "../../theme/globalStyles";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Ionicons from "@expo/vector-icons/Ionicons";

const Stack = createStackNavigator<TeacherStackParamsList>();

interface TeacherStackProps {
  setAuth: Dispatch<React.SetStateAction<boolean>>;
}
const TeacherStack: FC<TeacherStackProps> = () => {
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
      <Stack.Screen
        name="StudentList"
        component={StudentList}
        options={({ route }) => ({
          title: `${route.params.class}-${route.params.course}`,
          headerRight: () => (
            <>
              <View style={styles.iconContainer}>
                <Ionicons name="image" color={colors.white} size={23} />
              </View>
              <View style={styles.iconContainer}>
                <FontAwesome5 name="camera" size={20} color={colors.white} />
              </View>
              <View style={styles.iconContainer}>
                <MaterialCommunityIcons
                  name="send"
                  size={20}
                  color={colors.white}
                />
              </View>
            </>
          ),
          headerRightContainerStyle: {
            paddingRight: 8,
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "center",
            // borderWidth: 1,
          },
        })}
      />
      <Stack.Screen name="Notification" component={Notification} />
      <Stack.Screen name="Course" component={Course} />
    </Stack.Navigator>
  );
};

const AttendanceLeftButtons = () => {
  return (
    <View style={{ flex: 1, borderWidth: 1 }}>
      <View>
        <FontAwesome5 name="camera" size={20} color={colors.white} />
      </View>
    </View>
  );
};

export default TeacherStack;

const styles = StyleSheet.create({
  iconContainer: {
    paddingLeft: 15,
  },
});
