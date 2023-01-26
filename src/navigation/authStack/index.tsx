import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack';
import { Login } from '../../screens/auth';
import AdminDrawer from '../adminDrawer';
import TeacherDrawer from '../teacherDrawer';
import ParentStack from '../parentStack';
import StudentStack from '../studentStack';
import { AuthStackParamsList } from '../../types';
import { useUserContext } from '../../contexts';

const Stack = createStackNavigator<AuthStackParamsList>();
const AuthStack = () => {
  const { isAuthorized, user } = useUserContext();
  const options: StackNavigationOptions = {
    headerShown: false,
  };
  if (isAuthorized) {
    switch (user?.userType) {
      case 'Teacher': {
        return (
          <Stack.Navigator screenOptions={options}>
            <Stack.Screen name="TeacherDrawer" component={TeacherDrawer} />
          </Stack.Navigator>
        );
      }
      case 'Student': {
        return (
          <Stack.Navigator screenOptions={options}>
            <Stack.Screen name="StudentStack" component={StudentStack} />
          </Stack.Navigator>
        );
      }
      case 'Parent': {
        return (
          <Stack.Navigator screenOptions={options}>
            <Stack.Screen name="ParentStack" component={ParentStack} />
          </Stack.Navigator>
        );
      }
      case 'Admin': {
        return (
          <Stack.Navigator screenOptions={options}>
            <Stack.Screen name="AdminStack" component={AdminDrawer} />
          </Stack.Navigator>
        );
      }
      default:
        return (
          <Stack.Navigator screenOptions={options}>
            <Stack.Screen name="Login" component={Login} />
          </Stack.Navigator>
        );
    }
  }
  return (
    <Stack.Navigator screenOptions={options}>
      {/* <Stack.Screen name="TeacherStack">
            {(props) => <TeacherStack {...props} setAuth={setIsAuthorized} />}
          </Stack.Screen> */}
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
};

export default AuthStack;
