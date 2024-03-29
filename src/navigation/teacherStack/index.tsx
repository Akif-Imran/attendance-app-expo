import { StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { FC } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ImageViewer, Notification, Dashboard, StudentList } from '../../screens/teacher';
import { TeacherDrawerScreenProps, TeacherStackParamsList } from '../../types';
import { colors } from '../../theme';
import globalStyles from '../../theme/globalStyles';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

const Stack = createStackNavigator<TeacherStackParamsList>();

interface TeacherStackProps {}

const TeacherStack: FC<TeacherStackProps> = (props: TeacherStackProps) => {
  const drawerNav = useNavigation<TeacherDrawerScreenProps<'Timetable'>['navigation']>();

  return (
    <Stack.Navigator
      screenOptions={{
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
        name="Dashboard"
        component={Dashboard}
        options={{
          title: 'Timetable',
        }}
      />
      <Stack.Screen
        name="ImageViewer"
        component={ImageViewer}
        options={{
          title: 'Image Viewer',
        }}
      />
      <Stack.Screen
        name="StudentList"
        component={StudentList}
        options={({ route }) => ({
          title: `${route.params.class} ${route.params.course}`,
          headerRightContainerStyle: {
            paddingRight: 8,
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
            // borderWidth: 1,
          },
        })}
      />
      <Stack.Screen name="Notification" component={Notification} />
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
