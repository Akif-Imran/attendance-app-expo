import { StyleSheet, Text, View, Image } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, TextInput } from 'react-native-paper';
import { PaperTheme, colors, gStyles } from '../../theme';
import { SelectList } from 'react-native-dropdown-select-list';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';

const degreeList = [{ key: '1', value: 'BS' }];

const disciplineList = [
  { key: '1', value: 'CS' },
  { key: '2', value: 'IT' },
  { key: '3', value: 'GC' },
  { key: '4', value: 'AI' },
];

const sectionList = [
  { key: '1', value: 'A' },
  { key: '2', value: 'B' },
  { key: '3', value: 'C' },
  { key: '4', value: 'D' },
];

const Enroll = () => {
  const [regNo, setRegNo] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [degree, setDegree] = useState<string>('');
  const [discipline, setDiscipline] = useState<string>('');
  const [section, setSection] = useState<string>('');
  const [semester, setSemester] = useState<string>('');
  const [features, setFeatures] = useState<number[]>([]);
  return (
    <SafeAreaView style={styles.mainContainer}>
      <View>
        <View style={{ flexDirection: 'row' }}>
          <View style={styles.profileImageContainer}>
            <Image
              source={require('../../assets/images/png/icons8-male-user-100.png')}
              style={{ width: 80, height: 80, tintColor: colors.iconGray }}
              resizeMethod="auto"
              resizeMode="contain"
            />
          </View>
          <View style={{ flex: 2, justifyContent: 'flex-end', alignItems: 'flex-start' }}>
            <Button mode="contained" theme={PaperTheme} onPress={() => {}}>
              Choose Image
            </Button>
          </View>
        </View>

        <View>
          <View style={styles.regNoInputContainer}>
            <TextInput
              dense
              value={regNo}
              mode="outlined"
              label="Registration No"
              theme={PaperTheme}
              outlineColor={colors.textGray}
              selectionColor={colors.primary}
              activeOutlineColor={colors.primary}
              onChangeText={(text) => setRegNo(text)}
              left={<TextInput.Icon icon="email" color={colors.iconGray} />}
            />
          </View>
          <View style={{ flexDirection: 'row' }}>
            <View style={styles.nameInputContainer}>
              <TextInput
                dense
                value={firstName}
                mode="outlined"
                label="First Name"
                theme={PaperTheme}
                outlineColor={colors.textGray}
                selectionColor={colors.primary}
                activeOutlineColor={colors.primary}
                onChangeText={(text) => setFirstName(text)}
                left={<TextInput.Icon icon="account" color={colors.iconGray} />}
              />
            </View>
            <View style={styles.nameInputContainer}>
              <TextInput
                dense
                value={lastName}
                mode="outlined"
                label="Last Name"
                theme={PaperTheme}
                outlineColor={colors.textGray}
                selectionColor={colors.primary}
                activeOutlineColor={colors.primary}
                onChangeText={(text) => setLastName(text)}
                left={<TextInput.Icon icon="account" color={colors.iconGray} />}
              />
            </View>
          </View>
          <View style={styles.regNoInputContainer}>
            <TextInput
              dense
              blurOnSubmit
              value={semester}
              mode="outlined"
              label="Semester"
              theme={PaperTheme}
              outlineColor={colors.textGray}
              selectionColor={colors.primary}
              activeOutlineColor={colors.primary}
              onChangeText={(text) => setSemester(text)}
              keyboardType="number-pad"
              // left={<TextInput.Icon icon="account" color={colors.iconGray} />}
            />
          </View>
        </View>

        <View style={styles.classInfoDropDownContainer}>
          <View style={styles.classInfoDropDown}>
            <SelectList
              search={false}
              placeholder="Degree"
              setSelected={(val: string) => setDegree(val)}
              data={degreeList}
              save="value"
              fontFamily="Visby-Medium"
              arrowicon={<FontAwesome name="chevron-down" size={12} color={colors.titleText} />}
              defaultOption={{ key: '1', value: 'BS' }} //default selected option
              inputStyles={{
                color: colors.titleText,
              }}
              dropdownTextStyles={{
                color: colors.textGray,
              }}
            />
          </View>
          <View style={styles.classInfoDropDown}>
            <SelectList
              search={false}
              placeholder="Discipline"
              setSelected={(val: string) => setDiscipline(val)}
              data={disciplineList}
              save="value"
              fontFamily="Visby-Medium"
              arrowicon={<FontAwesome name="chevron-down" size={12} color={colors.titleText} />}
              inputStyles={{
                color: colors.titleText,
              }}
              dropdownTextStyles={{
                color: colors.textGray,
              }}
            />
          </View>
          <View style={styles.classInfoDropDown}>
            <SelectList
              search={false}
              data={sectionList}
              setSelected={(val: string) => setSection(val)}
              save="value"
              placeholder="Section"
              fontFamily="Visby-Medium"
              arrowicon={<FontAwesome name="chevron-down" size={12} color={colors.titleText} />}
              inputStyles={{
                color: colors.titleText,
              }}
              dropdownTextStyles={{
                color: colors.textGray,
              }}
            />
          </View>
        </View>

        <View style={{ marginVertical: 4, marginHorizontal: 4 }}>
          <Text style={gStyles.cardTitleText}>Feature Set</Text>
          <View style={{ marginVertical: 8 }}>
            <FlatList
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              data={features}
              renderItem={() => (
                <TouchableOpacity
                  style={{ marginRight: 4 }}
                  onPress={() => {
                    let arr = new Array(features.length - 1).fill(1, features.length - 1);
                    setFeatures(arr);
                  }}
                >
                  <Image
                    source={require('../../assets/images/png/photo-placeholder.png')}
                    style={{ width: 80, height: 80 }}
                    resizeMethod="auto"
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              )}
              ListFooterComponent={() => (
                <TouchableOpacity
                  style={styles.addImageButton}
                  activeOpacity={0.5}
                  onPress={() => setFeatures([...features, 1])}
                >
                  <AntDesign name="plus" size={30} color={colors.primary} />
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </View>

      <View style={styles.bottomButtonsContainer}>
        <View style={styles.individualButtonsContainer}>
          <Button mode="outlined" theme={PaperTheme} onPress={() => {}}>
            Cancel
          </Button>
        </View>
        <View style={styles.individualButtonsContainer}>
          <Button mode="contained" theme={PaperTheme} onPress={() => {}}>
            Add
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Enroll;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingBottom: 15,
    paddingHorizontal: 15,
    backgroundColor: colors.white,
    // borderWidth: 1,
  },
  profileImageContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    marginHorizontal: 4,
    // borderWidth: 1,
  },
  regNoInputContainer: {
    marginHorizontal: 4,
    marginVertical: 4,
    // borderWidth: 1,
  },
  nameInputContainer: {
    flex: 1,
    marginHorizontal: 4,
    marginVertical: 4,
    // borderWidth: 1,
  },
  classInfoDropDownContainer: {
    flexDirection: 'row',
    marginVertical: 2,
    // borderWidth: 1,
  },
  classInfoDropDown: {
    flex: 1,
    marginVertical: 4,
    marginHorizontal: 4,
    // borderWidth: 1,
  },
  addImageButton: {
    width: 80,
    height: 80,
    borderColor: colors.titleText,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    borderWidth: 1,
  },
  bottomButtonsContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    // borderWidth: 1,
  },
  individualButtonsContainer: {
    marginHorizontal: 4,
  },
});
