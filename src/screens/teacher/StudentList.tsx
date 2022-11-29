import { StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";
import { _StudentCard } from "../../components";

const students = [
  {
    regNo: "19-ARID-0069",
    firstName: "Akif",
    lastName: "Imran",
    status: "absent",
  },
  {
    regNo: "19-ARID-0069",
    firstName: "Akif",
    lastName: "Imran",
    status: "absent",
  },
  {
    regNo: "19-ARID-0069",
    firstName: "Akif",
    lastName: "Imran",
    status: "absent",
  },
  {
    regNo: "19-ARID-0069",
    firstName: "Akif",
    lastName: "Imran",
    status: "absent",
  },
  {
    regNo: "19-ARID-0069",
    firstName: "Akif",
    lastName: "Imran",
    status: "absent",
  },
  {
    regNo: "19-ARID-0069",
    firstName: "Akif",
    lastName: "Imran",
    status: "absent",
  },
  {
    regNo: "19-ARID-0069",
    firstName: "Akif",
    lastName: "Imran",
    status: "absent",
  },
  {
    regNo: "19-ARID-0069",
    firstName: "Akif",
    lastName: "Imran",
    status: "absent",
  },
  {
    regNo: "19-ARID-0069",
    firstName: "Akif",
    lastName: "Imran",
    status: "absent",
  },
  {
    regNo: "19-ARID-0069",
    firstName: "Akif",
    lastName: "Imran",
    status: "absent",
  },
];
const StudentList = () => {
  return (
    <View>
      <FlatList
        data={students}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.cardsContainer}
        renderItem={({ item, index }) => <_StudentCard student={item} />}
        keyExtractor={(_, index) => index.toString()}
      />
    </View>
  );
};

export default StudentList;

const styles = StyleSheet.create({
  cardsContainer: {
    paddingHorizontal: 4,
  },
});
