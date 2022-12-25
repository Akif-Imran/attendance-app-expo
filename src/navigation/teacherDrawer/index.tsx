import { StyleSheet, View } from "react-native";
import React, { FC, Dispatch } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { ClassesList, CoursesList, Notification } from "../../screens/teacher";
import TeacherStack from "../teacherStack";
import { colors } from "../../theme";
import globalStyles from "../../theme/globalStyles";
import _CustomDrawer from "./_CustomDrawer";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const Drawer = createDrawerNavigator();

interface TeacherStackProps {
  setAuth: Dispatch<React.SetStateAction<boolean>>;
}

const TeacherDrawer: FC<TeacherStackProps> = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <_CustomDrawer {...props} />}
      screenOptions={{
        // headerShown: false,
        headerTintColor: colors.white,
        headerTitleStyle: {
          ...globalStyles.cardTitleText,
          color: colors.white,
          fontFamily: "Visby-Medium",
        },
        headerStyle: {
          backgroundColor: colors.primary,
        },
        drawerLabelStyle: {
          fontFamily: "Visby-Bold",
          fontSize: 14,
          textAlign: "left",
        },
        drawerActiveBackgroundColor: colors.primary,
        drawerInactiveBackgroundColor: colors.white,
        drawerActiveTintColor: colors.white,
        drawerInactiveTintColor: colors.qtyTextGray,
      }}
    >
      <Drawer.Screen
        name="Timetable"
        component={TeacherStack}
        options={{
          drawerIcon: ({ size, focused }) => (
            <FontAwesome5
              name="table"
              size={20}
              color={focused ? colors.white : colors.iconGray}
            />
          ),
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="Notifications"
        component={Notification}
        options={{
          title: "Notifications",
          drawerIcon: ({ size, focused }) => (
            <Ionicons
              name="notifications"
              size={20}
              color={focused ? colors.white : colors.iconGray}
            />
          ),
        }}
      />
      {/* <Drawer.Screen
        name="Courses"
        component={CoursesList}
        options={{
          title: "My Courses",
          drawerIcon: ({ size, focused }) => (
            <MaterialCommunityIcons
              name="bookshelf"
              size={20}
              color={focused ? colors.white : colors.iconGray}
            />
          ),
        }}
      /> */}
      <Drawer.Screen
        name="Attendance"
        component={ClassesList}
        options={{
          drawerIcon: ({ size, focused }) => (
            <Ionicons
              name="list"
              size={20}
              color={focused ? colors.white : colors.iconGray}
            />
          ),
        }}
      />
    </Drawer.Navigator>
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

export default TeacherDrawer;

const styles = StyleSheet.create({
  iconContainer: {
    paddingLeft: 15,
  },
});
