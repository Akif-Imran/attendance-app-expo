import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { FC, Dispatch, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
  Attendance,
  ImageViewer,
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
import * as ImagePicker from "expo-image-picker";
import type {
  ImagePickerResult,
  ImagePickerMultipleResult,
} from "expo-image-picker";
import { Camera, CameraType } from "expo-camera";
import { useNavigation } from "@react-navigation/native";

const Stack = createStackNavigator<TeacherStackParamsList>();

interface TeacherStackProps {
  setAuth: Dispatch<React.SetStateAction<boolean>>;
}
const TeacherStack: FC<TeacherStackProps> = () => {
  const drawerNav = useNavigation();
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        allowsMultipleSelection: true,
        // aspect: [4, 3],
        quality: 1,
      });
      console.log(result);
      if (!result.cancelled) {
      }
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: colors.white,
        headerTitleStyle: {
          ...globalStyles.cardTitleText,
          color: colors.white,
          fontFamily: "Visby-Medium",
        },
        // headerShown: false,
        headerStyle: {
          backgroundColor: colors.primary,
        },
        headerLeft: () => (
          <>
            <TouchableOpacity
              style={styles.iconContainer}
              onPress={() => drawerNav.openDrawer()}
            >
              <MaterialCommunityIcons
                name="menu"
                size={20}
                color={colors.white}
              />
            </TouchableOpacity>
          </>
        ),
        headerLeftContainerStyle: {
          paddingRight: 8,
          flexDirection: "row",
          justifyContent: "flex-end",
          alignItems: "center",
          // borderWidth: 1,
        },
      }}
    >
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          title: "Timetable",
        }}
      />
      <Stack.Screen
        name="ImageViewer"
        component={ImageViewer}
        options={{
          title: "Image Viewer",
        }}
      />
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
          title: `${route.params.class} ${route.params.course}`,
          headerRight: () => (
            <>
              <TouchableOpacity
                style={styles.iconContainer}
                onPress={pickImage}
              >
                <Ionicons name="image" color={colors.white} size={23} />
              </TouchableOpacity>
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
