import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import _CourseCard from "./_CourseCard";
import { ParentStackScreenProps } from "../../types";
import { useRoute } from "@react-navigation/native";

const CoursesList: React.FC = () => {
  const route = useRoute<ParentStackScreenProps<"CoursesList">["route"]>();
  const courseList = route.params.courses;
  // const courseList = [
  //   {
  //     session: "SPRING-2022",
  //     course: "CS-808",
  //     title: "DSA",
  //     percentage: "75.0",
  //   },
  //   {
  //     session: "SPRING-2022",
  //     course: "CS-809",
  //     title: "COAL",
  //     percentage: "72.8",
  //   },
  // ];
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

