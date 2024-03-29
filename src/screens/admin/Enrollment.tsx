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
import { ApiStudentObject, CourseResponseObj, EnrollmentStackScreenProps, Features, Pose } from '../../types';
import { useRoute } from '@react-navigation/native';
import { api, session } from '../../helpers';

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

const Enrollment = () => {
  const route = useRoute<EnrollmentStackScreenProps<'Enrollment'>['route']>();
  const data = route.params.data;
  const [regNo, setRegNo] = useState<string>(data?.regno || '');
  const [firstName, setFirstName] = useState<string>(data?.firstName || '');
  const [lastName, setLastName] = useState<string>(data?.lastName || '');
  const [degree, setDegree] = useState<string>(data?.degree || '');
  const [discipline, setDiscipline] = useState<string>(data?.discipline || '');
  const [section, setSection] = useState<string>(data?.section || '');
  const [semester, setSemester] = useState<string>(data?.semester.toString() || '');
  const [sUsername, setSUsername] = useState<string>('');
  const [sPassword, setSPassword] = useState<string>('456');
  const [pFirstName, setPFirstName] = useState<string>('');
  const [pLastName, setPLastName] = useState<string>('');
  const [pUsername, setPUsername] = useState<string>('');
  const [pPassword, setPPassword] = useState<string>('456');
  const [offeredCourses, setOfferedCourses] = useState<any[]>([]);
  // const [features, setFeatures] = useState<number[]>([]);

  const [secureEntry, setSecureEntry] = useState<boolean>(true);
  const [icon, setIcon] = useState<string>('eye');

  const [pSecureEntry, setPSecureEntry] = useState<boolean>(true);
  const [pIcon, setPIcon] = useState<string>('eye');

  const [random, setRandom] = useState<number>(Math.floor(Math.random() * 10000));

  const [enrolledCourses, setEnrolledCourses] = React.useState([]);

  const [features, setFeatures] = useState<Features[]>([]);
  const [currentPose, setCurrentPose] = useState<Pose>('Left');
  const [visible, setVisible] = useState<boolean>(false);
  const [remainingPoses, setRemainingPoses] = useState<Pose[]>(['Front', 'Left', 'Right']);
  const [loading, setLoading] = useState<boolean>(false);
  const [isPromoting, setIsPromoting] = useState<boolean>(false);

  const captureImage = async () => {
    try {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        allowsMultipleSelection: true,
        quality: 1,
      });
      console.log(result);
      if (!result.cancelled) {
        addImage(result);
        // setFeatures([...features, { ...result, pose: pose }]);
        //remove current pose from remaining poses
      }
    } catch (e) {
      console.error(e);
    }
  };

  console.log('images', features);
  console.log('courses', enrolledCourses);
  console.log('pose', currentPose);

  const handlePickFeatures = async () => {
    hideDialog();
    await captureImage();
  };

  const removeImage = (index: number) => {
    console.log('removedImage index', index);
    let arr = [...features];
    let remaining = [...remainingPoses];
    const toBeRemoved = arr[index];
    remaining.push(toBeRemoved.pose);
    arr.splice(index, 1);
    setFeatures(arr);
    setRemainingPoses(remaining);
  };

  const addImage = (capturedImg: ImagePicker.ImageInfo) => {
    let newFeatures = [...features, { ...capturedImg, pose: currentPose }];
    let newPose = remainingPoses[0];
    let newRemainingPoses = remainingPoses.filter((value) => value !== currentPose);
    // setFeatures([...features, { ...result, pose: pose }]);
    setFeatures(newFeatures);
    setCurrentPose(newPose);
    setRemainingPoses(newRemainingPoses);
  };

  const showDialog = () => {
    if (features.length !== 3) setVisible(true);
    else {
      ToastAndroid.show('Feature set complete!', ToastAndroid.SHORT);
    }
  };

  const hideDialog = () => setVisible(false);

  const getOfferedCourses = () => {
    api
      .get(`/courses/get-offered-courses?classId=${data?.classId}&session=${session}`)
      .then((res) => {
        if (res.status === 200) {
          const resData: CourseResponseObj[] = res.data;
          const filtered = resData.map((course) => ({ key: course.courseCode, value: course.courseName }));
          setOfferedCourses(filtered);
        }
      })
      .catch((err) => console.error(err));
  };

  const promoteStudent = () => {
    setIsPromoting(true);
    let formData = new FormData();
    let obj = {
      regNo,
      firstName: firstName,
      lastName: lastName,
      semester: semester,
      degree,
      discipline,
      section,
    };

    Object.entries(obj).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((item) => {
          formData.append(key, item);
        });
      } else {
        formData.append(key, value);
      }
    });
    api
      .post(`/student/promote-student?session=${session}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        if (res.status === 200) {
          const resData: CourseResponseObj[] = res.data;
          const filtered = resData.map((course) => ({ key: course.courseCode, value: course.courseName }));
          setOfferedCourses(filtered);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => {
        setIsPromoting(false);
      });
  };

  useLayoutEffect(() => {
    getOfferedCourses();
    return () => {};
  }, []);

  const enrollStudent = () => {
    setLoading(true);
    console.log('called');

    let formData = new FormData();
    let poses = [];
    for (let image of features) {
      let localUri = image.uri;
      poses.push(image.pose);
      console.log('uri', localUri);
      let filename = localUri.split('/').pop() || '';
      console.log('filename', filename);
      let match = /\.(\w+)$/.exec(filename);
      console.log('match', match);
      let type = match ? `image/${match[1]}` : `image`;
      console.log('type', type);
      let photo = image;

      formData.append('files', {
        name: filename,
        type: type,
        uri: photo.uri,
      });
    }
    let obj = {
      regNo,
      firstName: firstName,
      lastName: lastName,
      semester: semester,
      degree,
      discipline,
      section,
      enrolledCourses: enrolledCourses,
      poses: poses,
    };

    Object.entries(obj).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((item) => {
          formData.append(key, item);
        });
      } else {
        formData.append(key, value);
      }
    });
    console.log(JSON.stringify(formData));

    api
      .post(`/student/enroll-student?session=${session}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        if (res.status === 200) {
          console.log(JSON.stringify(res.data));
          const resData = res.data;
          ToastAndroid.show('Student Enrolled', ToastAndroid.SHORT);
        }
      })
      .catch((err) => {
        console.error(err.response);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>Select Pose</Dialog.Title>
          <Dialog.Content>
            <RadioButton.Group onValueChange={(newValue) => setCurrentPose(newValue)} value={currentPose}>
              {remainingPoses.map((value, index) => (
                <View style={styles.poseRadio} key={index.toString()}>
                  <Text style={gStyles.cardTitleText}>{value}</Text>
                  <RadioButton value={value} theme={PaperTheme} color={colors.primary} />
                </View>
              ))}
            </RadioButton.Group>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog} theme={PaperTheme}>
              Cancel
            </Button>
            <Button onPress={handlePickFeatures} theme={PaperTheme}>
              Done
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 15 }}>
        <Text style={[gStyles.tinyHeaderText, { marginHorizontal: 6 }]}>Student Info</Text>
        {/* <View style={{ flexDirection: 'row' }}>
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
        </View> */}

        <View>
          <View style={styles.regNoInputContainer}>
            <TextInput
              dense
              value={regNo}
              mode="outlined"
              editable={false}
              label="Registration No"
              theme={PaperTheme}
              outlineColor={colors.textGray}
              selectionColor={colors.primary}
              activeOutlineColor={colors.primary}
              onChangeText={(text) => setRegNo(text)}
              left={<TextInput.Icon icon="email" color={colors.iconGray} />}
              // right={
              //   <TextInput.Icon
              //     icon="information"
              //     color={colors.iconGray}
              //     onPress={() => {
              //       setRegNo('2019-ARID-0069');
              //       ToastAndroid.show('Arid Generated', ToastAndroid.SHORT);
              //     }}
              //   />
              // }
            />
          </View>
          {/* student firstname and lastname */}
          <View style={{ flexDirection: 'row' }}>
            <View style={styles.nameInputContainer}>
              <TextInput
                dense
                value={firstName}
                mode="outlined"
                editable={false}
                label="First Name"
                theme={PaperTheme}
                outlineColor={colors.textGray}
                selectionColor={colors.primary}
                activeOutlineColor={colors.primary}
                onChangeText={(text) => {
                  setFirstName(text);
                  setSUsername(`${text}-${lastName}${random}`);
                }}
                left={<TextInput.Icon icon="account" color={colors.iconGray} />}
              />
            </View>
            <View style={styles.nameInputContainer}>
              <TextInput
                dense
                value={lastName}
                mode="outlined"
                editable={false}
                label="Last Name"
                theme={PaperTheme}
                outlineColor={colors.textGray}
                selectionColor={colors.primary}
                activeOutlineColor={colors.primary}
                onChangeText={(text) => {
                  setLastName(text);
                  setSUsername(`${firstName}-${text}${random}`);
                }}
                left={<TextInput.Icon icon="account" color={colors.iconGray} />}
              />
            </View>
          </View>
          {/* student username and password */}
          {/* <View style={{ flexDirection: 'row' }}>
            <View style={styles.nameInputContainer}>
              <TextInput
                dense
                value={sUsername}
                mode="outlined"
                label="Username"
                theme={PaperTheme}
                outlineColor={colors.textGray}
                selectionColor={colors.primary}
                activeOutlineColor={colors.primary}
                onChangeText={(text) => setSUsername(text)}
                left={<TextInput.Icon icon="account" color={colors.iconGray} />}
              />
            </View>
            <View style={styles.nameInputContainer}>
              <TextInput
                dense
                theme={PaperTheme}
                mode="outlined"
                label="Password"
                value={sPassword}
                onChangeText={(text) => setSPassword(text)}
                secureTextEntry={secureEntry}
                left={<TextInput.Icon icon={() => <Fontisto name="locked" color={colors.iconGray} size={20} />} />}
                right={
                  <TextInput.Icon
                    icon={icon}
                    color={colors.iconGray}
                    onPress={() => {
                      setSecureEntry(!secureEntry);
                      setIcon((prev) => (prev === 'eye' ? 'eye-off' : 'eye'));
                    }}
                  />
                }
              />
            </View>
          </View> */}
        </View>

        {/* <View style={styles.classInfoDropDownContainer}>
          <View style={styles.classInfoDropDown}>
            <TextInput
              dense
              blurOnSubmit
              editable={false}
              value={degree}
              mode="outlined"
              label="Degree"
              theme={PaperTheme}
              outlineColor={colors.textGray}
              selectionColor={colors.primary}
              activeOutlineColor={colors.primary}
              onChangeText={(text) => setDegree(text)}
              keyboardType="number-pad"
            />
          </View>
          <View style={styles.classInfoDropDown}>
            <TextInput
              dense
              blurOnSubmit
              editable={false}
              value={discipline}
              mode="outlined"
              label="Discipline"
              theme={PaperTheme}
              outlineColor={colors.textGray}
              selectionColor={colors.primary}
              activeOutlineColor={colors.primary}
              onChangeText={(text) => setDiscipline(text)}
            />
          </View>
          <View style={styles.classInfoDropDown}>
            <TextInput
              dense
              blurOnSubmit
              editable={false}
              value={section}
              mode="outlined"
              label="Section"
              theme={PaperTheme}
              outlineColor={colors.textGray}
              selectionColor={colors.primary}
              activeOutlineColor={colors.primary}
              onChangeText={(text) => setSection(text)}
              keyboardType="number-pad"
            />
          </View>
        </View> */}

        <View style={styles.regNoInputContainer}>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ flex: 6 }}>
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
              />
            </View>
            <View style={{ flex: 4, marginTop: 6, marginLeft: 4 }}>
              <Button
                mode="contained"
                theme={PaperTheme}
                onPress={() => {
                  promoteStudent();
                }}
                loading={isPromoting}
              >
                Promote
              </Button>
            </View>
          </View>
        </View>

        <View style={styles.regNoInputContainer}>
          <MultipleSelectList
            data={offeredCourses}
            label="Courses"
            save="key"
            placeholder="Courses"
            fontFamily="Visby-Medium"
            search={true}
            searchPlaceholder="Search Course"
            searchicon={<FontAwesome name="search" size={20} color={colors.iconGray} style={{ marginRight: 8 }} />}
            arrowicon={<FontAwesome name="chevron-down" size={12} color={colors.titleText} />}
            setSelected={(val: any) => {
              setEnrolledCourses(val);
              console.log(val);
            }}
            labelStyles={{
              color: colors.textGray,
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

        <View style={{ marginVertical: 4, marginHorizontal: 4 }}>
          <Text style={gStyles.cardTitleText}>Feature Set</Text>
          <View style={{ marginVertical: 8 }}>
            <FlatList
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              data={features}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  style={{ marginRight: 4 }}
                  onPress={() => {
                    removeImage(index);
                  }}
                >
                  <Image
                    // source={require('../../assets/images/png/photo-placeholder.png')}
                    source={{ uri: item.uri }}
                    style={{ width: 80, height: 80 }}
                    resizeMethod="auto"
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              )}
              ListFooterComponent={() => (
                <TouchableOpacity style={styles.addImageButton} activeOpacity={0.5} onPress={showDialog}>
                  <AntDesign name="plus" size={30} color={colors.primary} />
                </TouchableOpacity>
              )}
            />
          </View>
        </View>

        {/* <View style={{ borderColor: colors.borderColor, borderTopWidth: 1 }} /> */}
        {/* <Text style={[gStyles.tinyHeaderText, { marginHorizontal: 6 }]}>Parent Info</Text>

        <View style={{ flexDirection: 'row' }}>
          <View style={styles.nameInputContainer}>
            <TextInput
              dense
              value={pFirstName}
              mode="outlined"
              editable={false}
              label="First Name"
              theme={PaperTheme}
              outlineColor={colors.textGray}
              selectionColor={colors.primary}
              activeOutlineColor={colors.primary}
              onChangeText={(text) => {
                setPFirstName(text);
                setPUsername(`${text}-${lastName}${random}`);
              }}
              left={<TextInput.Icon icon="account" color={colors.iconGray} />}
            />
          </View>
          <View style={styles.nameInputContainer}>
            <TextInput
              dense
              value={pLastName}
              mode="outlined"
              editable={false}
              label="Last Name"
              theme={PaperTheme}
              outlineColor={colors.textGray}
              selectionColor={colors.primary}
              activeOutlineColor={colors.primary}
              onChangeText={(text) => {
                setPLastName(text);
                setPUsername(`${pFirstName}-${text}${random}`);
              }}
              left={<TextInput.Icon icon="account" color={colors.iconGray} />}
            />
          </View>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <View style={styles.nameInputContainer}>
            <TextInput
              dense
              value={pUsername}
              mode="outlined"
              editable={false}
              label="Username"
              theme={PaperTheme}
              outlineColor={colors.textGray}
              selectionColor={colors.primary}
              activeOutlineColor={colors.primary}
              onChangeText={(text) => setPUsername(text)}
              left={<TextInput.Icon icon="account" color={colors.iconGray} />}
            />
          </View>
          <View style={styles.nameInputContainer}>
            <TextInput
              dense
              theme={PaperTheme}
              mode="outlined"
              editable={false}
              label="Password"
              value={pPassword}
              onChangeText={(text) => setPPassword(text)}
              secureTextEntry={pSecureEntry}
              left={<TextInput.Icon icon={() => <Fontisto name="locked" color={colors.iconGray} size={20} />} />}
              right={
                <TextInput.Icon
                  icon={pIcon}
                  color={colors.iconGray}
                  onPress={() => {
                    setPSecureEntry((prev) => !prev);
                    setPIcon((prev) => (prev === 'eye' ? 'eye-off' : 'eye'));
                  }}
                />
              }
            />
          </View>
        </View> */}
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
              enrollStudent();
            }}
            loading={loading}
          >
            Enroll
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Enrollment;

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
