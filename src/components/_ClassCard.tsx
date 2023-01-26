import { Image, StyleSheet, Text, View } from "react-native";
import React, { FC } from "react";
import { Card } from "react-native-paper";
import { _Icon } from "./general";
import { gStyles } from "../theme";
import { _Button } from "./general";
import { useNavigation } from "@react-navigation/native";
import {
  TeacherAttendanceStackScreenProps,
  TeacherStackScreenProps,
  TeacherTaughtClassesClass,
  TeacherTaughtClassesLecture,
} from "../types";

interface _ClassCardProps {
  item: TeacherTaughtClassesClass;
}

const _ClassCard: FC<_ClassCardProps> = ({ item }) => {
  const navigation = useNavigation<TeacherAttendanceStackScreenProps<"ClassesList">["navigation"]>();
  const lastClass: TeacherTaughtClassesLecture | undefined =
    item.lectures.length !== 0 ? item.lectures[item.lectures.length - 1] : undefined;
  return (
    <Card
      style={styles.mainCardContainer}
      onPress={() =>
        navigation.navigate("LectureList", {
          item,
        })
      }
    >
      <View style={styles.mainContainer}>
        {/* <View style={styles.iconContainer}>
          <Image
            tintColor="#999999"
            source={require("../assets/images/png/class.png")}
            style={styles.imageStyle}
          />
        </View> */}
        <View style={styles.detailsContainer}>
          <Text style={gStyles.cardInfoTitleText}>
            {item.className} {item.courseName}
          </Text>
          <Text style={gStyles.cardDetailsText}>Last Class {lastClass ? lastClass.heldOnDate : "NA"}</Text>
          <Text style={gStyles.cardDetailsText}>{item.lectures.length} classes conducted.</Text>
          <View style={styles.buttonContainer}>
            {/* <View style={styles.individualButtonContainer}>
              <_Button
                title="Mark"
                onPress={() => navigation.navigate("StudentList")}
                size="small"
              />
            </View> */}
          </View>
        </View>
      </View>
    </Card>
  );
};

export default _ClassCard;

const styles = StyleSheet.create({
  mainCardContainer: {
    flexDirection: "row",
    elevation: 4,
    padding: 10,
    marginTop: 4,
    marginBottom: 4,
    borderRadius: 8,
    overflow: "hidden",
  },
  mainContainer: {
    flexDirection: "row",
  },
  iconContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  detailsContainer: {
    flex: 3,
  },
  classTitleText: {
    paddingHorizontal: 4,
    paddingVertical: 2,
    fontSize: 18,
    fontFamily: "Visby-Regular",
    fontStyle: "normal",
    fontWeight: "600",
    color: "#424242",
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row-reverse",
    justifyContent: "center",
    // borderWidth: 1,
  },
  individualButtonContainer: {
    flex: 1,
    justifyContent: "center",
    height: 40,
    // borderWidth: 1,
  },
  button: {
    flex: 1,
    marginHorizontal: 4,
  },
  imageStyle: {
    width: 85,
    height: 85,
  },
});

