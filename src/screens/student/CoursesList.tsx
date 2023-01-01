import { FlatList, StyleSheet, Text, View, RefreshControl } from "react-native";
import React, { useEffect, useState } from "react";
import _CourseCard from "./_CourseCard";
import {
  ApiLoginResponseStudent,
  ApiCourseList,
  ApiCourseWithAttendances,
  ParentStackScreenProps,
} from "../../types";
import { colors, gStyles } from "../../theme";
import { api } from "../../helpers";
import { useUserContext } from "../../contexts";

/* const courseList = [
    {
      session: "SPRING-22",
      course: "CC-2022S",
      title: "COMPILER CONSTRUCTION",
      percentage: "81",
      last: "present",
    },
    {
      session: "SPRING-22",
      course: "MAD-2022S",
      title: "MOBILE APPLICATION DEVELOPMENT",
      percentage: "94",
      last: "present",
    },
    {
      session: "SPRING-22",
      course: "FYP-2022S",
      title: "FINAL YEAR PROJECT",
      percentage: "67",
      last: "absent",
    },
  ]; */

const CoursesList: React.FC = () => {
  const [courseList, setCourseList] = useState<ApiCourseList>([]);
  const [isFetching, setIsFetching] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const { user } = useUserContext();
  const session: string = "spring-2022";

  const fetchCourses: (
    user: ApiLoginResponseStudent,
    refreshCall: boolean
  ) => void = (user: ApiLoginResponseStudent, refreshCall: boolean) => {
    setIsRefreshing(refreshCall);
    const res = api
      .get(
        `/student/get-student-courses?regNo=${user.regNo}&classId=${user.classId}&session=${session}`
      )
      .then((res) => {
        if (res.status === 200) {
          const resData: ApiCourseList = res.data;
          setCourseList(resData);
        }
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsRefreshing(false);
      });
  };

  useEffect(() => {
    if (!user) return;
    fetchCourses(user as ApiLoginResponseStudent, false);
    setIsFetching(false);
  }, [user]);

  return (
    <View style={styles.mainContainer}>
      <FlatList
        style={styles.cardsContainer}
        data={courseList}
        contentContainerStyle={styles.listContainerStyle}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <_CourseCard course={item} />}
        ListEmptyComponent={() => (
          <View style={styles.mainContainer}>
            <Text style={styles.title}>No Courses Enrolled!</Text>
          </View>
        )}
        refreshControl={
          <RefreshControl
            enabled={true}
            refreshing={isRefreshing}
            colors={[colors.primary]}
            progressBackgroundColor={colors.white}
            onRefresh={() =>
              fetchCourses(user as ApiLoginResponseStudent, true)
            }
          />
        }
      />
    </View>
  );
};

export default CoursesList;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "white",
    paddingTop: 15,
    // borderWidth: 1,
  },
  title: {
    ...gStyles.cardTitleText,
    textAlign: "center",
    color: colors.titleText,
    fontFamily: "Visby-Medium",
  },
  listContainerStyle: {
    paddingHorizontal: 6,
  },
  cardsContainer: {
    // marginHorizontal: 4,
    // borderWidth: 1,
  },
});

