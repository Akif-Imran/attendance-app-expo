import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import _CourseCard from "../../components/_CourseCard";

const CoursesList: React.FC = () => {
  const courseList = [
    {
      session: "SPRING-22",
      course: "CC-2022S",
      title: "COMPILER CONSTRUCTION",
    },
    {
      session: "SPRING-22",
      course: "MAD-2022S",
      title: "MOBILE APPLICATION DEVELOPMENT",
    },
    { session: "SPRING-22", course: "FYP-2022S", title: "FINAL YEAR PROJECT" },
  ];
  return (
    <View style={styles.mainContainer}>
      <FlatList
        style={styles.cardsContainer}
        data={courseList}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <_CourseCard course={item} />}
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
    // borderWidth: 1,
  },
  cardsContainer: {
    // marginHorizontal: 4,
    // borderWidth: 1,
  },
});
