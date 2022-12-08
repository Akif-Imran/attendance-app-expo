import { StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";
import { Card } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { ParentStackScreenProps, TeacherStackScreenProps } from "../../types";
import { colors, gStyles } from "../../theme";

const LecturesList = () => {
  const data = [
    {
      date: new Date(2022, 10, 25, 8, 41),
      status: "present",
    },
    {
      date: new Date(2022, 10, 28, 8, 33),
      status: "absent",
    },
    {
      date: new Date(2022, 10, 29, 8, 35),
      status: "present",
    },
    {
      date: new Date(2022, 10, 30, 8, 34),
      status: "absent",
    },
    {
      date: new Date(2022, 11, 1, 8, 34),
      status: "present",
    },
    {
      date: new Date(2022, 11, 2, 8, 37),
      status: "absent",
    },
    {
      date: new Date(2022, 11, 5, 8, 32),
      status: "present",
    },
    {
      date: new Date(2022, 11, 6, 8, 32),
      status: "present",
    },
    {
      date: new Date(2022, 11, 7, 8, 36),
      status: "absent",
    },
    {
      date: new Date(2022, 11, 8, 8, 37),
      status: "present",
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
  attendance: {
    date: Date;
    status: "present" | "absent";
  };
}

const statusColor = {
  present: colors.primary,
  absent: colors.error,
};

const _LectureCard: React.FC<_LectureCardProps> = (props) => {
  const navigation =
    useNavigation<ParentStackScreenProps<"CoursesList">["navigation"]>();
  const { date, status } = props.attendance;
  return (
    <Card style={styles.cardContainer} elevation={2}>
      {/* <Image source={images[2]} style={styles.imageContainer} /> */}
      <View style={styles.coursesDetailsContainer}>
        <View>
          <Text style={gStyles.cardTitleText}>{date.toDateString()}</Text>
          <Text style={gStyles.cardDetailsText}>
            {date.toLocaleTimeString()}
          </Text>
        </View>
        {/* <Text style={gStyles.cardTitleText}>{title}</Text> */}
        <View style={styles.statusContainer}>
          <Text
            style={[styles.courseDetailsText, { color: statusColor[status] }]}
          >
            {status}
          </Text>
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
