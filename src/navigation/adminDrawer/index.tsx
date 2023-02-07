import { StyleSheet, View } from 'react-native';
import React, { FC, Dispatch } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
// import { Attendance, Notification } from '../../screens/teacher';
import { Allocate, Notification } from '../../screens/admin';
import EnrollStack from '../adminEnrollStack';
import { colors } from '../../theme';
import globalStyles from '../../theme/globalStyles';
import _CustomDrawer from './_CustomDrawer';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useUserContext } from '../../contexts';
import { AdminDrawerParamsList } from '../../types';

const Drawer = createDrawerNavigator<AdminDrawerParamsList>();

interface AdminDrawerProps {}

const AdminDrawer: FC<AdminDrawerProps> = () => {
  const { setIsAuthorized, setUser } = useUserContext();

  return (
    <Drawer.Navigator
      drawerContent={(props) => <_CustomDrawer {...props} />}
      screenOptions={{
        // headerShown: false,
        headerTintColor: colors.white,
        headerTitleStyle: {
          ...globalStyles.cardTitleText,
          color: colors.white,
          fontFamily: 'Visby-Medium',
        },
        headerStyle: {
          backgroundColor: colors.primary,
        },
        drawerLabelStyle: {
          fontFamily: 'Visby-Bold',
          fontSize: 14,
          textAlign: 'left',
        },
        drawerActiveBackgroundColor: colors.primary,
        drawerInactiveBackgroundColor: colors.white,
        drawerActiveTintColor: colors.white,
        drawerInactiveTintColor: colors.qtyTextGray,
      }}
    >
      <Drawer.Screen
        name="EnrollStack"
        component={EnrollStack}
        options={{
          headerShown: true,
          title: 'Enroll',
          drawerIcon: ({ size, focused }) => (
            <FontAwesome5 name="user-plus" size={20} color={focused ? colors.white : colors.iconGray} />
          ),
        }}
      />
      <Drawer.Screen
        name="Allocate"
        component={Allocate}
        options={{
          headerShown: true,
          drawerIcon: ({ size, focused }) => (
            <MaterialIcons name="assignment-turned-in" size={20} color={focused ? colors.white : colors.iconGray} />
          ),
        }}
      />
      <Drawer.Screen
        name="Notifications"
        component={Notification}
        options={{
          title: 'Notifications',
          drawerIcon: ({ size, focused }) => (
            <Ionicons name="notifications" size={20} color={focused ? colors.white : colors.iconGray} />
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

export default AdminDrawer;

const styles = StyleSheet.create({
  iconContainer: {
    paddingLeft: 15,
  },
});
