import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ToastAndroid,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { _StudentCard } from "../../components";
import { _Button } from "../../components/general";
import { colors, gStyles } from "../../theme";
import globalStyles from "../../theme/globalStyles";
import * as ImagePicker from "expo-image-picker";
import { useImagesContext, useUserContext } from "../../contexts";
import { useNavigation, useRoute } from "@react-navigation/native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  ApiStudentsByClass,
  ChangeStatusCallbackType,
  TeacherAttendanceStackScreenProps,
  UpdateStudentListType,
} from "../../types";
import { api } from "../../helpers";
import { useStudentContext } from "../../contexts/StudentListProvider";

const UpdateStudentList = () => {
  const navigation = useNavigation<TeacherAttendanceStackScreenProps<"UpdateStudentList">["navigation"]>();
  const route = useRoute<TeacherAttendanceStackScreenProps<"UpdateStudentList">["route"]>();
  const { item, lectureNo } = route.params;
  const { classId, className, courseCode, courseName, creditHours, lectures, teacherId } = item;
  const { images, setImages } = useImagesContext();
  const [visible, setIsVisible] = useState(false);
  const [isFetching, setIsFetching] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const { students, setStudents } = useStudentContext();
  const { user } = useUserContext();

  const fetchStudents = async () => {
    setIsFetching(true);
    console.log("fetching Students", students);
    api
      .post(`/student/get-student-attendance-by-lecture`, {
        teacherId,
        courseCode,
        courseName,
        creditHours,
        classId,
        className,
        lecture: lectures[lectureNo],
      })
      .then((res) => {
        if (res.status === 200) {
          const resData: UpdateStudentListType = res.data;
          console.log(resData);
          setStudents(resData.attendances);
          // setImages(resData.lectureImages.map((value) => ({ uri: value })));
        }
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsFetching(false);
        setIsRefreshing(false);
      });
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        allowsMultipleSelection: true,
        // aspect: [4, 3],
        quality: 1,
      });
      console.log(result);
      if (!result.cancelled) {
        if ("selected" in result) {
          setImages(result.selected);
          ToastAndroid.show("Make sure all Images are selected!", ToastAndroid.SHORT);
        } else {
          setImages([result]);
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

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
        setImages([...images, result]);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const changeStatus: ChangeStatusCallbackType = (regNo, status) => {
    console.log(regNo, status);
    let arr = [...students];
    const index = students.findIndex((value) => value.regno === regNo);
    const s = students[index];
    s.status = status;
    arr.splice(index, 1, s);
    setStudents(arr);
  };

  const markAttendance = async () => {
    try {
      ToastAndroid.show("Please wait...", ToastAndroid.LONG);
      if (!user) return;
      const attendances = students.flatMap((value) => [
        {
          regNo: value.regno,
          status: value.status,
        },
      ]);
      if (!user) return;
      const obj = {
        teacherId: user?.id,
        courseName,
        className,
        venue: lectures[lectureNo].venue,
        slot: lectures[lectureNo].lectureSlotId,
        jsonDate: new Date(lectures[lectureNo].heldOnDate).toJSON(),
        Session: lectures[lectureNo].session,
        attendances: attendances,
      };
      let formData = new FormData();
      Object.entries(obj).forEach((value) => {
        if (Array.isArray(value[1])) {
          console.log("array", value[0]);
          let arr = [];
          for (let obj of value[1]) {
            arr.push(JSON.stringify(obj));
          }
          formData.append("attendances", JSON.stringify(arr));
        } else {
          formData.append(value[0], value[1]);
        }
      });
      const response = await api.post("/attendance/mark-attendance", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status === 200) {
        ToastAndroid.show("Attendance Marked Successfully", ToastAndroid.LONG);
        setIsRefreshing(true);
        fetchStudents();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const goToImageViewer = async () => {
    try {
      ToastAndroid.show("Please wait...", ToastAndroid.LONG);
      if (!user) return;
      if (!students) return;
      const attendances = students.flatMap((value) => [
        {
          regNo: value.regno,
          status: value.status,
        },
      ]);
      const obj = {
        teacherId: user?.id,
        courseName: route.params.item.courseName,
        className: route.params.item.className,
        venue: route.params.item.lectures[lectureNo].venue,
        slot: route.params.item.lectures[lectureNo].lectureSlotId,
        jsonDate: new Date(route.params.item.lectures[lectureNo].heldOnDate).toJSON(),
        Session: route.params.item.lectures[lectureNo].session,
        attendances: attendances,
      };
      navigation.navigate("ImageViewer", obj);
    } catch (err) {
      console.error(err);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <>
          <TouchableOpacity style={styles.iconContainer} onPress={goToImageViewer}>
            <MaterialCommunityIcons name="animation" size={20} color={colors.white} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconContainer} onPress={pickImage}>
            <Ionicons name="image" color={colors.white} size={23} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconContainer} onPress={captureImage}>
            <FontAwesome5 name="camera" size={20} color={colors.white} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconContainer} onPress={markAttendance}>
            <MaterialCommunityIcons name="send" size={20} color={colors.white} />
          </TouchableOpacity>
        </>
      ),
    });

    return () => {};
  }, [navigation, students]);

  useEffect(() => {
    fetchStudents();
  }, [route.params.item.className]);

  return (
    <View style={styles.mainContainer}>
      <FlatList
        data={students}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContentContainer}
        renderItem={({ item, index }) => <_StudentCard student={item} changeStatus={changeStatus} key={item.id} />}
        ListEmptyComponent={() => (
          <View>
            {isFetching ? (
              <View style={styles.activityIndicatorContainer}>
                <ActivityIndicator color={colors.primary} size="large" animating={isFetching} />
              </View>
            ) : (
              <View style={styles.mainContainer}>
                <Text style={styles.title}>204 Response...</Text>
              </View>
            )}
          </View>
        )}
        refreshControl={
          <RefreshControl
            enabled={true}
            refreshing={isRefreshing}
            colors={[colors.primary]}
            progressBackgroundColor={colors.white}
            onRefresh={() => {
              setIsRefreshing(true);
              fetchStudents();
            }}
          />
        }
        keyExtractor={(_, index) => index.toString()}
      />
    </View>
  );
};

export default UpdateStudentList;

const styles = StyleSheet.create({
  iconContainer: {
    paddingLeft: 15,
  },
  mainContainer: {
    flex: 1,
    // paddingHorizontal: 4,
    backgroundColor: colors.white,
    // borderWidth: 1,
  },
  activityIndicatorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    ...gStyles.cardTitleText,
    textAlign: "center",
    color: colors.titleText,
    fontFamily: "Visby-Medium",
  },
  listContentContainer: {
    // flex: 1,
    paddingHorizontal: 4,
    // paddingBottom: 45,
  },
  cardsContainer: {
    flex: 9.5,
    // paddingHorizontal: 4,
  },
  submitButton: {
    // display: "flex",
    width: "98%",
    position: "absolute",
    bottom: 0,
    marginTop: 4,
    paddingHorizontal: 2,
    paddingBottom: 4,
    justifyContent: "center",
    marginHorizontal: 4,
    borderRadius: 50,
  },
  buttonText: {
    ...globalStyles.descText,
    color: colors.white,
  },
});
