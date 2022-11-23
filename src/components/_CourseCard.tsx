import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Card } from "react-native-paper";
import bg_Image_1 from "../assets/images/jpg/abstract-bg-1.jpg";
import bg_Image_2 from "../assets/images/jpg/abstract-bg-2.jpg";
import bg_Image_3 from "../assets/images/jpg/abstract-bg-3.jpg";
import bg_Image_4 from "../assets/images/jpg/abstract-bg-4.jpg";
import { useNavigation } from "@react-navigation/native";

const images = [bg_Image_1, bg_Image_2, bg_Image_3, bg_Image_4];

const _CourseCard = (props) => {
  const navigation = useNavigation();
  const { session, course, title } = props.course;

  return (
    <Card
      style={styles.mainContainer}
      onPress={() =>
        navigation.navigate("ClassesList", { course: props.course })
      }
    >
      <Image
        source={images[Math.floor(Math.random() * 4)]}
        style={styles.imageContainer}
      />
      <View style={styles.couresDetailsContainer}>
        <Text style={styles.courseDetailsText}>{`${session} | ${course}`}</Text>
        <Text style={styles.courseTitleText}>{title}</Text>
      </View>
    </Card>
  );
};

export default _CourseCard;

const styles = StyleSheet.create({
  mainContainer: {
    // flex: 1,
    elevation: 8,
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
  couresDetailsContainer: {
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
    fontSize: 18,
    color: "#757575",
  },
});
