import { StyleSheet } from "react-native";
import React, { FC } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { CoursesList, ChildrenList, LecturesList, Notifications } from "../../screens/parent";
import { ParentStackParamsList } from "../../types";
import { colors } from "../../theme";
import globalStyles from "../../theme/globalStyles";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useUserContext } from "../../contexts";

const Stack = createStackNavigator<ParentStackParamsList>();

interface ParentStackProps {}

const ParentStack: FC<ParentStackProps> = () => {
  const { setIsAuthorized, setUser } = useUserContext();
  return (
    <Stack.Navigator
      screenOptions={({ navigation }) => ({
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
            onPress={() => navigation.navigate("Notifications")}
          />
        ),
        headerRightContainerStyle: {
          paddingHorizontal: 15,
        },
        headerLeftContainerStyle: {
          paddingHorizontal: 15,
        },
      })}
      initialRouteName="Dashboard"
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
          title: `${route.params.courseCode} ${route.params.courseName}`,
        })}
      />
      <Stack.Screen name="Notifications" component={Notifications} />
    </Stack.Navigator>
  );
};

export default ParentStack;

const styles = StyleSheet.create({});
