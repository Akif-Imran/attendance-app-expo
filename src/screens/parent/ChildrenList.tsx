import { StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";
import _ChildCard from "./_ChildCard";
import { _Button } from "../../components/general";
import { Button } from "react-native-paper";
import { colors } from "../../theme";
import globalStyles from "../../theme/globalStyles";

const students = [
  {
    regNo: "2019-ARID-0001",
    firstName: "Ahsan",
    lastName: "Ali",
    class: "BSCS-8A",
    img: require("../../assets/images/ImagesAttendance/Ahsan-Ali.jpg"),
  },
  {
    regNo: "2019-ARID-0002",
    firstName: "Adeel",
    lastName: "Anjum",
    class: "BSCS-8A",
    img: require("../../assets/images/ImagesAttendance/Adeel-Anjum.jpg"),
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
          renderItem={({ item, index }) => <_ChildCard student={item} />}
          keyExtractor={(_, index) => index.toString()}
        />
      </View>
      {/* <View style={styles.submitButton}>
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
      </View> */}
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
