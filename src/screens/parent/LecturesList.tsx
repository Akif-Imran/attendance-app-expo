import { StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";
import { Card } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { ParentStackScreenProps, StudentViewAttendanceObject, TeacherStackScreenProps } from "../../types";
import { colors, gStyles } from "../../theme";

const LecturesList = () => {
  const data: StudentViewAttendanceObject[] = [
    {
      heldOnDate: "Tuesday, December 27, 2022",
      lectureId: 1001,
      attendanceNo: 1,
      status: "present",
      time: "12:39 PM",
    },
    {
      heldOnDate: "Sunday, January 1, 2023",
      lectureId: 1007,
      attendanceNo: 1,
      status: "present",
      time: "8:44 PM",
    },
    {
      heldOnDate: "Monday, January 2, 2023",
      lectureId: 1009,
      attendanceNo: 1,
      status: "present",
      time: "11:39 AM",
    },
    {
      heldOnDate: "Sunday, January 15, 2023",
      lectureId: 4014,
      attendanceNo: 1,
      status: "absent",
      time: "1:49 PM",
    },
  ];

  return (
    <View style={styles.mainContainer}>
      <FlatList
        data={data}
        renderItem={({ index, item }) => <_LectureCard attendance={item} />}
        keyExtractor={(_, index) => index.toString()}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

// const images = [bg_Image_1, bg_Image_2, bg_Image_3, bg_Image_4];
interface _LectureCardProps {
  attendance: StudentViewAttendanceObject;
}

const statusColor = {
  present: colors.primary,
  absent: colors.error,
};

const _LectureCard: React.FC<_LectureCardProps> = (props) => {
  const navigation = useNavigation<ParentStackScreenProps<"CoursesList">["navigation"]>();
  const { heldOnDate, status, time } = props.attendance;
  return (
    <Card style={styles.cardContainer} elevation={2}>
      {/* <Image source={images[2]} style={styles.imageContainer} /> */}
      <View style={styles.coursesDetailsContainer}>
        <View>
          <Text style={gStyles.cardTitleText}>{heldOnDate}</Text>
          <Text style={gStyles.cardDetailsText}>{time}</Text>
        </View>
        {/* <Text style={gStyles.cardTitleText}>{title}</Text> */}
        <View style={styles.statusContainer}>
          <Text style={[styles.courseDetailsText, { color: statusColor[status] }]}>{status}</Text>
        </View>
      </View>
    </Card>
  );
};

export default LecturesList;

const styles = StyleSheet.create({
  mainContainer: {
    paddingHorizontal: 4,
    paddingTop: 15,
  },
  cardContainer: {
    // flex: 1,
    // elevation: 8,
    paddingHorizontal: 4,
    marginVertical: 4,
    borderRadius: 8,
    marginBottom: 5,
    // borderWidth: 1,
  },
  imageContainer: {
    resizeMode: "cover",
    width: "100%",
    height: 150,
    borderWidth: 1,
  },
  coursesDetailsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 12,
  },
  statusContainer: {
    justifyContent: "center",
  },
  courseTitleText: {
    paddingHorizontal: 4,
    paddingVertical: 2,
    fontSize: 18,
    fontFamily: "Visby-Regular",
    fontStyle: "normal",
    fontWeight: "600",
    color: "#424242",
  },
  courseDetailsText: {
    paddingHorizontal: 4,
    paddingVertical: 2,
    fontSize: 16,
    fontFamily: "Visby-Regular",
    color: "#757575",
  },
});
