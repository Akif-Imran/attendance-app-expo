import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import _CourseCard from "./_CourseCard";
import { ParentStackScreenProps } from "../../types";

const CoursesList: React.FC = () => {
  const courseList = [
    {
      session: "SPRING-22",
      course: "CC-2022S",
      title: "COMPILER CONSTRUCTION",
      percentage: "81",
    },
    {
      session: "SPRING-22",
      course: "MAD-2022S",
      title: "MOBILE APPLICATION DEVELOPMENT",
      percentage: "94",
    },
    {
      session: "SPRING-22",
      course: "FYP-2022S",
      title: "FINAL YEAR PROJECT",
      percentage: "67",
    },
  ];
  return (
    <View style={styles.mainContainer}>
      <FlatList
        style={styles.cardsContainer}
        data={courseList}
        contentContainerStyle={styles.listContainerStyle}
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
  listContainerStyle: {
    paddingHorizontal: 6,
  },
  cardsContainer: {
    // marginHorizontal: 4,
    // borderWidth: 1,
  },
});
