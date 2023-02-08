import { StyleSheet, Text, View, Image, ToastAndroid } from 'react-native';
import React, { useLayoutEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Dialog, Portal, RadioButton, TextInput } from 'react-native-paper';
import { PaperTheme, colors, gStyles } from '../../theme';
import { SelectList, MultipleSelectList } from 'react-native-dropdown-select-list';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import Fontisto from '@expo/vector-icons/Fontisto';
import Ionicons from '@expo/vector-icons/Ionicons';
import { FlatList, ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker';
import { ApiStudentObject, EnrollmentStackScreenProps, Features, Pose } from '../../types';
import { useRoute } from '@react-navigation/native';
import { api, session as currentSession } from '../../helpers';

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

const courseList = [
  { key: '1', value: 'PF' },
  { key: '2', value: 'DSA' },
  { key: '3', value: 'OOP' },
  { key: '4', value: 'VP' },
];

const Allocate = () => {
  const [course1, setCourse1] = useState<string>('');
  const [course2, setCourse2] = useState<string>('');
  const [course3, setCourse3] = useState<string>('');
  const [course4, setCourse4] = useState<string>('');
  const [course5, setCourse5] = useState<string>('');
  const [course6, setCourse6] = useState<string>('');

  const [teacher1, setTeacher1] = useState<string>('');
  const [teacher2, setTeacher2] = useState<string>('');
  const [teacher3, setTeacher3] = useState<string>('');
  const [teacher4, setTeacher4] = useState<string>('');
  const [teacher5, setTeacher5] = useState<string>('');
  const [teacher6, setTeacher6] = useState<string>('');
  const [coursesList, setCoursesList] = useState<any[]>([]);
  const [teacherList, setTeacherList] = useState<any[]>([]);
  const [classesList, setClassesList] = useState<any[]>([]);

  const [session, setSession] = useState<string>(currentSession);
  const [classIdentifier, setClassIdentifier] = useState<string>('');

  const [visible, setVisible] = useState<boolean>(false);

  const getCourses = () => {
    api
      .get('/courses/get-all-courses')
      .then((res) => {
        if (res.status === 200) {
          const resData: { courseCode: string; courseName: string; creditHours: string }[] = res.data;
          const coursesData = resData.map((course) => ({ key: course.courseCode, value: course.courseName }));
          setCoursesList(coursesData);
        }
      })
      .catch((err) => console.error(err));
  };

  const getTeacher = () => {
    api
      .get('/Teacher/get-all-teacher')
      .then((res) => {
        if (res.status === 200) {
          const resData: { id: number; firstName: string; lastName: string; department: string }[] = res.data;
          const teacherData = resData.map((teacher) => ({
            key: teacher.id,
            value: `${teacher.firstName} ${teacher.lastName}`,
          }));
          setTeacherList(teacherData);
        }
      })
      .catch((err) => console.error(err));
  };

  const getClasses = () => {
    api
      .get('/Teacher/get-all-classes')
      .then((res) => {
        if (res.status === 200) {
          const resData: { id: number; classIdentifier: string }[] = res.data;
          const classesData = resData.map((cls) => ({ key: cls.id, value: cls.classIdentifier }));
          setClassesList(classesData);
        }
      })
      .catch((err) => console.error(err));
  };

  useLayoutEffect(() => {
    getCourses();
    getTeacher();
    getClasses();
    return () => {};
  }, []);

  const allocate = () => {
    let cArr = [];
    let tArr = [];
    // if (course1 !== '' || teacher1 !== '')
    if (course1 !== '' && teacher1 !== '') {
      cArr.push(course1);
      tArr.push(teacher1);
    } else {
      ToastAndroid.show('Invalid allocation record 1', ToastAndroid.SHORT);
      return;
    }

    api
      .post('/teacher/allocate-courses', {
        classId: classIdentifier,
        session: session,
        teacherIds: tArr,
        courseCodes: cArr,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.error(err));

    /* if (course2 !== '' && teacher2 !== '') {
      cArr.push(course2);
      tArr.push(teacher2);
    } else {
      ToastAndroid.show('Invalid allocation record 2', ToastAndroid.SHORT);
      return;
    }

    if (course3 !== '' && teacher3 !== '') {
      cArr.push(course3);
      tArr.push(teacher3);
    } else {
      ToastAndroid.show('Invalid allocation record 3', ToastAndroid.SHORT);
      return;
    }

    if (course4 !== '' && teacher4 !== '') {
      cArr.push(course4);
      tArr.push(teacher4);
    } else {
      ToastAndroid.show('Invalid allocation record 4', ToastAndroid.SHORT);
      return;
    }

    if (course5 !== '' && teacher5 !== '') {
      cArr.push(course5);
      tArr.push(teacher5);
    } else {
      ToastAndroid.show('Invalid allocation record 5', ToastAndroid.SHORT);
      return;
    }

    if (course6 !== '' && teacher6 !== '') {
      cArr.push(course6);
      tArr.push(teacher6);
    } else {
      ToastAndroid.show('Invalid allocation record 6', ToastAndroid.SHORT);
      return;
    } */
    console.log(cArr, tArr, classIdentifier);
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 15 }}>
        <Text style={[gStyles.tinyHeaderText, { marginHorizontal: 6 }]}>Allocation Info</Text>

        <View>
          {/* class list */}
          <View style={styles.regNoInputContainer}>
            <SelectList
              data={classesList}
              save="key"
              placeholder="Class"
              fontFamily="Visby-Medium"
              search={true}
              searchPlaceholder="Search Course"
              searchicon={<FontAwesome name="search" size={20} color={colors.iconGray} style={{ marginRight: 8 }} />}
              arrowicon={<FontAwesome name="chevron-down" size={12} color={colors.titleText} />}
              setSelected={(val: any) => {
                setClassIdentifier(val);
              }}
              inputStyles={{
                color: colors.titleText,
              }}
              dropdownTextStyles={{
                color: colors.textGray,
              }}
              // defaultOption={{ key: '1', value: 'BS' }} //default selected option
            />
          </View>
          {/* session */}
          <View style={styles.regNoInputContainer}>
            <TextInput
              dense
              blurOnSubmit
              value={session}
              mode="outlined"
              label="Session"
              theme={PaperTheme}
              outlineColor={colors.textGray}
              selectionColor={colors.primary}
              activeOutlineColor={colors.primary}
              onChangeText={(text) => setSession(text)}
              keyboardType="number-pad"
            />
          </View>
          {/* course 1 */}
          <View style={styles.classInfoDropDownContainer}>
            <View style={styles.classInfoDropDown}>
              <SelectList
                data={coursesList}
                save="key"
                placeholder="Course"
                fontFamily="Visby-Medium"
                search={true}
                searchPlaceholder="Search Course"
                searchicon={<FontAwesome name="search" size={20} color={colors.iconGray} style={{ marginRight: 8 }} />}
                arrowicon={<FontAwesome name="chevron-down" size={12} color={colors.titleText} />}
                setSelected={(val) => {
                  setCourse1(val);
                }}
                inputStyles={{
                  color: colors.titleText,
                }}
                dropdownTextStyles={{
                  color: colors.textGray,
                }}
                // defaultOption={{ key: '1', value: 'BS' }} //default selected option
              />
            </View>
            <View style={styles.classInfoDropDown}>
              <SelectList
                data={teacherList}
                save="key"
                placeholder="Teacher"
                fontFamily="Visby-Medium"
                search={true}
                searchPlaceholder="Search Teacher"
                searchicon={<FontAwesome name="search" size={20} color={colors.iconGray} style={{ marginRight: 8 }} />}
                arrowicon={<FontAwesome name="chevron-down" size={12} color={colors.titleText} />}
                setSelected={(val: any) => {
                  setTeacher1(val);
                }}
                inputStyles={{
                  color: colors.titleText,
                }}
                dropdownTextStyles={{
                  color: colors.textGray,
                }}
                // defaultOption={{ key: '1', value: 'BS' }} //default selected option
              />
            </View>
          </View>
          {/* course 2 */}
          <View style={styles.classInfoDropDownContainer}>
            <View style={styles.classInfoDropDown}>
              <SelectList
                data={coursesList}
                save="key"
                placeholder="Course"
                fontFamily="Visby-Medium"
                search={true}
                searchPlaceholder="Search Course"
                searchicon={<FontAwesome name="search" size={20} color={colors.iconGray} style={{ marginRight: 8 }} />}
                arrowicon={<FontAwesome name="chevron-down" size={12} color={colors.titleText} />}
                setSelected={(val: any) => {
                  setCourse2(val);
                }}
                inputStyles={{
                  color: colors.titleText,
                }}
                dropdownTextStyles={{
                  color: colors.textGray,
                }}
                // defaultOption={{ key: '1', value: 'BS' }} //default selected option
              />
            </View>
            <View style={styles.classInfoDropDown}>
              <SelectList
                data={teacherList}
                save="key"
                placeholder="Teacher"
                fontFamily="Visby-Medium"
                search={true}
                searchPlaceholder="Search Teacher"
                searchicon={<FontAwesome name="search" size={20} color={colors.iconGray} style={{ marginRight: 8 }} />}
                arrowicon={<FontAwesome name="chevron-down" size={12} color={colors.titleText} />}
                setSelected={(val: any) => {
                  setTeacher1(val);
                }}
                inputStyles={{
                  color: colors.titleText,
                }}
                dropdownTextStyles={{
                  color: colors.textGray,
                }}
                // defaultOption={{ key: '1', value: 'BS' }} //default selected option
              />
            </View>
          </View>
          {/* course 3 */}
          <View style={styles.classInfoDropDownContainer}>
            <View style={styles.classInfoDropDown}>
              <SelectList
                data={coursesList}
                save="key"
                placeholder="Course"
                fontFamily="Visby-Medium"
                search={true}
                searchPlaceholder="Search Course"
                searchicon={<FontAwesome name="search" size={20} color={colors.iconGray} style={{ marginRight: 8 }} />}
                arrowicon={<FontAwesome name="chevron-down" size={12} color={colors.titleText} />}
                setSelected={(val: any) => {
                  setCourse3(val);
                }}
                inputStyles={{
                  color: colors.titleText,
                }}
                dropdownTextStyles={{
                  color: colors.textGray,
                }}
                // defaultOption={{ key: '1', value: 'BS' }} //default selected option
              />
            </View>
            <View style={styles.classInfoDropDown}>
              <SelectList
                data={teacherList}
                save="key"
                placeholder="Teacher"
                fontFamily="Visby-Medium"
                search={true}
                searchPlaceholder="Search Teacher"
                searchicon={<FontAwesome name="search" size={20} color={colors.iconGray} style={{ marginRight: 8 }} />}
                arrowicon={<FontAwesome name="chevron-down" size={12} color={colors.titleText} />}
                setSelected={(val: any) => {
                  setTeacher3(val);
                }}
                inputStyles={{
                  color: colors.titleText,
                }}
                dropdownTextStyles={{
                  color: colors.textGray,
                }}
                // defaultOption={{ key: '1', value: 'BS' }} //default selected option
              />
            </View>
          </View>
          {/* course 4 */}
          <View style={styles.classInfoDropDownContainer}>
            <View style={styles.classInfoDropDown}>
              <SelectList
                data={coursesList}
                save="key"
                placeholder="Course"
                fontFamily="Visby-Medium"
                search={true}
                searchPlaceholder="Search Course"
                searchicon={<FontAwesome name="search" size={20} color={colors.iconGray} style={{ marginRight: 8 }} />}
                arrowicon={<FontAwesome name="chevron-down" size={12} color={colors.titleText} />}
                setSelected={(val: any) => {
                  setCourse4(val);
                }}
                inputStyles={{
                  color: colors.titleText,
                }}
                dropdownTextStyles={{
                  color: colors.textGray,
                }}
                // defaultOption={{ key: '1', value: 'BS' }} //default selected option
              />
            </View>
            <View style={styles.classInfoDropDown}>
              <SelectList
                data={teacherList}
                save="key"
                placeholder="Teacher"
                fontFamily="Visby-Medium"
                search={true}
                searchPlaceholder="Search Teacher"
                searchicon={<FontAwesome name="search" size={20} color={colors.iconGray} style={{ marginRight: 8 }} />}
                arrowicon={<FontAwesome name="chevron-down" size={12} color={colors.titleText} />}
                setSelected={(val: any) => {
                  setTeacher4(val);
                }}
                inputStyles={{
                  color: colors.titleText,
                }}
                dropdownTextStyles={{
                  color: colors.textGray,
                }}
                // defaultOption={{ key: '1', value: 'BS' }} //default selected option
              />
            </View>
          </View>
          {/* course 5 */}
          <View style={styles.classInfoDropDownContainer}>
            <View style={styles.classInfoDropDown}>
              <SelectList
                data={coursesList}
                save="key"
                placeholder="Course"
                fontFamily="Visby-Medium"
                search={true}
                searchPlaceholder="Search Course"
                searchicon={<FontAwesome name="search" size={20} color={colors.iconGray} style={{ marginRight: 8 }} />}
                arrowicon={<FontAwesome name="chevron-down" size={12} color={colors.titleText} />}
                setSelected={(val: any) => {
                  setCourse5(val);
                }}
                inputStyles={{
                  color: colors.titleText,
                }}
                dropdownTextStyles={{
                  color: colors.textGray,
                }}
                // defaultOption={{ key: '1', value: 'BS' }} //default selected option
              />
            </View>
            <View style={styles.classInfoDropDown}>
              <SelectList
                data={teacherList}
                save="key"
                placeholder="Teacher"
                fontFamily="Visby-Medium"
                search={true}
                searchPlaceholder="Search Teacher"
                searchicon={<FontAwesome name="search" size={20} color={colors.iconGray} style={{ marginRight: 8 }} />}
                arrowicon={<FontAwesome name="chevron-down" size={12} color={colors.titleText} />}
                setSelected={(val: any) => {
                  setTeacher5(val);
                }}
                inputStyles={{
                  color: colors.titleText,
                }}
                dropdownTextStyles={{
                  color: colors.textGray,
                }}
                // defaultOption={{ key: '1', value: 'BS' }} //default selected option
              />
            </View>
          </View>
          {/* course 6 */}
          <View style={styles.classInfoDropDownContainer}>
            <View style={styles.classInfoDropDown}>
              <SelectList
                data={coursesList}
                save="key"
                placeholder="Course"
                fontFamily="Visby-Medium"
                search={true}
                searchPlaceholder="Search Course"
                searchicon={<FontAwesome name="search" size={20} color={colors.iconGray} style={{ marginRight: 8 }} />}
                arrowicon={<FontAwesome name="chevron-down" size={12} color={colors.titleText} />}
                setSelected={(val: any) => {
                  setCourse6(val);
                }}
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
                data={teacherList}
                save="key"
                placeholder="Teacher"
                fontFamily="Visby-Medium"
                search={true}
                searchPlaceholder="Search Teacher"
                searchicon={<FontAwesome name="search" size={20} color={colors.iconGray} style={{ marginRight: 8 }} />}
                arrowicon={<FontAwesome name="chevron-down" size={12} color={colors.titleText} />}
                setSelected={(val: any) => {
                  setTeacher6(val);
                }}
                inputStyles={{
                  color: colors.titleText,
                }}
                dropdownTextStyles={{
                  color: colors.textGray,
                }}
              />
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomButtonsContainer}>
        <View style={styles.individualButtonsContainer}>
          <Button mode="outlined" theme={PaperTheme} onPress={() => {}}>
            Cancel
          </Button>
        </View>
        <View style={styles.individualButtonsContainer}>
          <Button
            mode="contained"
            theme={PaperTheme}
            onPress={() => {
              allocate();
            }}
          >
            Allocate
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Allocate;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingBottom: 15,
    paddingHorizontal: 6,
    backgroundColor: colors.white,
    // borderWidth: 1,
  },
  poseRadio: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginVertical: 4,
    borderColor: colors.borderColor,
    borderRadius: 8,
    borderWidth: 1,
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
