import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Card } from "react-native-paper";
import bg_Image_1 from "../assets/images/jpg/abstract-bg-1.jpg";
import bg_Image_2 from "../assets/images/jpg/abstract-bg-2.jpg";
import bg_Image_3 from "../assets/images/jpg/abstract-bg-3.jpg";
import bg_Image_4 from "../assets/images/jpg/abstract-bg-4.jpg";
import { useNavigation } from "@react-navigation/native";
import { TeacherStackScreenProps } from "../types";
import { gStyles } from "../theme";

const images = [bg_Image_1, bg_Image_2, bg_Image_3, bg_Image_4];

const _CourseCard = (props) => {
  const navigation =
    useNavigation<TeacherStackScreenProps<"CoursesList">["navigation"]>();
  const { session, course, title } = props.course;

  return (
    <Card
      style={styles.mainContainer}
      elevation={3}
      onPress={() =>
        navigation.navigate("ClassesList", { course: props.course })
      }
    >
      <Image source={images[2]} style={styles.imageContainer} />
      <View style={styles.coursesDetailsContainer}>
        <Text style={gStyles.cardDetailsText}>{`${session} | ${course}`}</Text>
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
