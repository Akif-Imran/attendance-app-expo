import { BackHandler, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { FC } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ClassesList from './ClassesList';
import LectureList from './LecturesList';
import ImageViewer from './ImageViewer';
import UpdateStudentList from './UpdateStudentList';
import { colors } from '../../theme';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import globalStyles from '../../theme/globalStyles';
import { TeacherAttendanceStackParamsList, TeacherDrawerScreenProps } from '../../types';

const Stack = createStackNavigator<TeacherAttendanceStackParamsList>();

interface AttendanceProps {}

const Attendance: FC<AttendanceProps> = () => {
  const drawerNav = useNavigation<TeacherDrawerScreenProps<'Attendance'>['navigation']>();

  return (
    <Stack.Navigator
      initialRouteName="ClassesList"
      screenOptions={{
        headerShown: true,
        headerTintColor: colors.white,
        headerTitleStyle: {
          ...globalStyles.cardTitleText,
          color: colors.white,
          fontFamily: 'Visby-Medium',
        },
        // headerShown: false,
        headerStyle: {
          backgroundColor: colors.primary,
        },
        headerLeft: () => (
          <>
            <TouchableOpacity style={styles.iconContainer} onPress={() => drawerNav.openDrawer()}>
              <MaterialCommunityIcons name="menu" size={20} color={colors.white} />
            </TouchableOpacity>
          </>
        ),
        headerLeftContainerStyle: {
          paddingRight: 8,
          flexDirection: 'row',
          justifyContent: 'flex-end',
          alignItems: 'center',
          // borderWidth: 1,
        },
      }}
    >
      <Stack.Screen
        name="ClassesList"
        component={ClassesList}
        options={{
          title: 'Classes',
        }}
      />
      <Stack.Screen
        name="LectureList"
        component={LectureList}
        options={({ route }) => ({
          title: `${route.params.item.className} ${route.params.item.courseName}`,
        })}
      />
      <Stack.Screen
        name="UpdateStudentList"
        component={UpdateStudentList}
        options={({ route }) => ({
          title: `${route.params.item.className} ${route.params.item.courseName} ${route.params.lectureNo + 1}`,
          headerRightContainerStyle: {
            paddingRight: 8,
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
            // borderWidth: 1,
          },
        })}
      />
      <Stack.Screen
        name="ImageViewer"
        component={ImageViewer}
        options={{
          title: 'Image Viewer',
        }}
      />
    </Stack.Navigator>
  );
};

export default Attendance;

const styles = StyleSheet.create({
  iconContainer: {
    paddingLeft: 15,
  },
});

