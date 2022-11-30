import { StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";
import { _StudentCard } from "../../components";
import { _Button } from "../../components/general";
import { Button } from "react-native-paper";
import { colors } from "../../theme";
import globalStyles from "../../theme/globalStyles";

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
    <View style={styles.mainContainer}>
      <View style={styles.cardsContainer}>
        <FlatList
          data={students}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContentContainer}
          renderItem={({ item, index }) => <_StudentCard student={item} />}
          keyExtractor={(_, index) => index.toString()}
        />
      </View>
      <View style={styles.submitButton}>
        <Button
          icon="send"
          mode="contained"
          color={colors.primary}
          onPress={() => {}}
          // style={styles.submitButton}
          labelStyle={styles.buttonText}
        >
          SUBMIT
        </Button>
      </View>
    </View>
  );
};

export default StudentList;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    // paddingHorizontal: 4,
    backgroundColor: colors.white,
  },
  listContentContainer: {
    paddingHorizontal: 4,
    paddingBottom: 45,
  },
  cardsContainer: {
    flex: 9.5,
    // paddingHorizontal: 4,
  },
  submitButton: {
    // display: "flex",
    width: "98%",
    position: "absolute",
    bottom: 0,
    marginTop: 4,
    paddingHorizontal: 2,
    paddingBottom: 4,
    justifyContent: "center",
    marginHorizontal: 4,
    borderRadius: 50,
  },
  buttonText: {
    ...globalStyles.descText,
    color: colors.white,
  },
});
