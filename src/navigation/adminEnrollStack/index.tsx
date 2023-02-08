import { StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native';
import React, { FC, Dispatch, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Enroll, AddStudent, Enrollment, Search } from '../../screens/admin';
import { EnrollmentStackParamsList, EnrollmentStackScreenProps, TeacherStackParamsList } from '../../types';
import { colors } from '../../theme';
import globalStyles from '../../theme/globalStyles';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';
import type { ImagePickerResult, ImagePickerMultipleResult } from 'expo-image-picker';
import { Camera, CameraType } from 'expo-camera';
import { useNavigation } from '@react-navigation/native';
import { useImagesContext } from '../../contexts';

const Stack = createStackNavigator<EnrollmentStackParamsList>();

interface EnrollmentStackProps {}

const TeacherStack: FC<EnrollmentStackProps> = () => {
  const drawerNav = useNavigation();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
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
        name="Enroll"
        component={Enroll}
        options={{
          title: 'Enroll',
        }}
      />
      <Stack.Screen
        name="AddStudent"
        component={AddStudent}
        options={{
          title: 'Add Student',
        }}
      />
      <Stack.Screen
        name="Search"
        component={Search}
        options={{
          title: 'Search',
        }}
      />
      <Stack.Screen
        name="Enrollment"
        component={Enrollment}
        options={({ route }) => ({
          title: `Enroll`,
          headerRightContainerStyle: {
            paddingRight: 8,
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
            // borderWidth: 1,
          },
        })}
      />
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
