import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Card } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { ParentStackScreenProps, TeacherStackScreenProps } from "../../types";
import { colors, gStyles } from "../../theme";

const _CourseCard = (props) => {
  const navigation =
    useNavigation<ParentStackScreenProps<"CoursesList">["navigation"]>();
  const { session, course, title, percentage } = props.course;

  const getColor = (percentage: string) => {
    const percent = parseInt(percentage);
    if (percent < 75) return colors.error;
    return colors.primary;
  };
  return (
    <Card
      style={styles.mainContainer}
      elevation={3}
      onPress={() => navigation.navigate("LectureList", { courseName: course })}
    >
      <View style={styles.coursesDetailsContainer}>
        <View style={styles.courseWithPercentage}>
          <Text
            style={gStyles.cardDetailsText}
          >{`${session} | ${course}`}</Text>
          <Text
            style={[styles.courseDetailsText, { color: getColor(percentage) }]}
          >
            {percentage}%
          </Text>
        </View>
        <Text style={gStyles.cardTitleText}>{title}</Text>
      </View>
    </Card>
  );
};

export default _CourseCard;

const styles = StyleSheet.create({
  mainContainer: {
    // flex: 1,
    // elevation: 8,
    // marginHorizontal: 4,
    marginVertical: 2,
    overflow: "hidden",
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
  courseWithPercentage: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  coursesDetailsContainer: {
    padding: 12,
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
