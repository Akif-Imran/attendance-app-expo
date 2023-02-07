import { StyleSheet, Text, View, Image } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Card, TextInput } from 'react-native-paper';
import { PaperTheme, colors, gStyles } from '../../theme';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import { FlatList, ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { EnrollmentStackScreenProps } from '../../types';

const Enroll = () => {
  const navigation = useNavigation<EnrollmentStackScreenProps<'Enroll'>['navigation']>();

  return (
    <SafeAreaView style={styles.mainContainer}>
      <Card style={styles.card} onPress={() => navigation.navigate('AddStudent')} elevation={4}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}
        >
          <View
            style={{
              marginHorizontal: 15,
            }}
          >
            <MaterialCommunityIcons name="plus" size={25} color={colors.primary} />
          </View>
          <Text style={gStyles.cardDetailsText}>Add New</Text>
        </View>
      </Card>

      <Card style={styles.card} onPress={() => navigation.navigate('Enrollment')} elevation={4}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}
        >
          <View
            style={{
              marginHorizontal: 15,
            }}
          >
            <MaterialCommunityIcons name="plus" size={25} color={colors.primary} />
          </View>
          <Text style={gStyles.cardDetailsText}>Enroll</Text>
        </View>
      </Card>
    </SafeAreaView>
  );
};

export default Enroll;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    paddingBottom: 15,
    paddingHorizontal: 15,
    backgroundColor: colors.white,
    // borderWidth: 1,
  },
  card: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderColor: colors.iconGray,
    borderRadius: 8,
    marginVertical: 4,
    // borderWidth: 1,
  },
});
