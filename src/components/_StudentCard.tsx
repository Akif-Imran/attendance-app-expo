import { StyleSheet, Text, View, Image, Switch } from "react-native";
import React, { useState } from "react";
import { Card, RadioButton, ToggleButton } from "react-native-paper";
import { colors, gStyles, PaperTheme } from "../theme";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import globalStyles from "../theme/globalStyles";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ApiStudentObject, ChangeStatusCallbackType } from "../types";

interface _StudentCard {
  student: ApiStudentObject;
  changeStatus: ChangeStatusCallbackType;
}

const _StudentCard: React.FC<_StudentCard> = ({ student, changeStatus }) => {
  const [isPresent, setIsPresent] = useState<boolean>(
    Boolean(student.status === "present")
  );

  const percentage = (student.presentCount / student.lectureCount) * 100 || 0;

  const toggleStatus = () => {
    changeStatus(
      student.regno,
      student.status === "present" ? "absent" : "present"
    );
    setIsPresent((previousState) => !previousState);
  };

  const getColor = (percentage: string) => {
    const percent = parseInt(percentage);
    if (percent < 75) return colors.error;
    return colors.primary;
  };

  return (
    <Card elevation={4} style={styles.mainContainer}>
      <View style={styles.contentContainer}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: student.imageURL }} style={styles.imageStyle} />
        </View>
        <View style={styles.detailsContainer}>
          {/* student details container */}
          <View style={styles.iconWithTextContainer}>
            {/* <View style={{ flexDirection: "row" }}> */}
            {/* icons container */}
            {/* <View style={styles.iconContainer}>
                <View style={styles.perIconContainer}>
                  <FontAwesome
                    name="id-card"
                    size={20}
                    color={colors.iconColor}
                  />
                </View>
                <View style={styles.perIconContainer}>
                  <FontAwesome name="user" size={20} color={colors.iconColor} />
                </View>
              </View> */}
            {/* text container */}
            {/* </View> */}
            <View style={styles.studentDetailsTextContainer}>
              <Text style={styles.studentName}>
                {student.firstName} {student.lastName}
              </Text>
              <Text style={styles.cardDetailsText}>{student.regno}</Text>
            </View>
            <View>
              <Text
                style={[
                  styles.courseDetailsText,
                  { color: getColor(percentage.toFixed(1)) },
                ]}
              >
                {percentage.toFixed(1)} %
              </Text>
            </View>
          </View>
          {/* status container */}
          <View style={styles.statusContainer}>
            {student.latestAttendanceStatus === "present" ? (
              <Text style={styles.cardDetailsText}>
                Last Class:{" "}
                <Text style={{ color: colors.primary }}>
                  {student.latestAttendanceStatus}
                </Text>
              </Text>
            ) : (
              <Text style={styles.cardDetailsText}>
                Last Class:{" "}
                <Text style={{ color: colors.error }}>
                  {student.latestAttendanceStatus}
                </Text>
              </Text>
            )}
            <TouchableOpacity
              style={[
                styles.toggleButton,
                student.status === "present"
                  ? styles.toggleButtonPositive
                  : styles.toggleButtonNegative,
              ]}
              onPress={toggleStatus}
            >
              <Text style={styles.attendanceStatusText}>{student.status}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Card>
  );
};

export default _StudentCard;

const styles = StyleSheet.create({
  mainContainer: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginVertical: 2,
    // borderWidth: 1,
  },
  toggleButton: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
    // borderWidth: 1,
  },
  toggleButtonPositive: {
    backgroundColor: colors.primary,
  },
  toggleButtonNegative: {
    backgroundColor: colors.error,
  },
  attendanceStatusText: {
    // ...gStyles.cardDetailsText,
    ...gStyles.descText,
    color: colors.white,
    textAlign: "center",
    textAlignVertical: "center",
    // borderWidth: 1,
  },
  studentName: {
    fontFamily: "Visby-Bold",
    fontSize: 16,
    color: colors.titleText,
    textAlign: "left",
    textAlignVertical: "center",
    // borderWidth: 1,
  },
  imageStyle: {
    width: 100,
    height: 100,
    borderRadius: 4,
    // borderWidth: 1,
  },
  imageContainer: {
    overflow: "hidden",
    // borderRadius: 50,
  },
  cardDetailsText: {
    ...globalStyles.cardDetailsText,
    paddingVertical: 4,
    // borderWidth: 1,
  },
  perIconContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 4,
    // borderWidth: 1,
  },
  detailsContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    paddingLeft: 15,
    // borderWidth: 1,
  },
  iconWithTextContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    // borderWidth: 1,
  },
  iconContainer: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 4,
    // borderWidth: 1,
  },
  studentDetailsTextContainer: {
    // paddingHorizontal: 4,
    // borderWidth: 1,
  },
  courseDetailsText: {
    paddingHorizontal: 4,
    paddingVertical: 2,
    fontSize: 16,
    fontFamily: "Visby-Regular",
    color: colors.titleText,
  },
  contentContainer: {
    flexDirection: "row",
  },
  radioContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingRight: 6,
    borderRadius: 15,
    // paddingHorizontal: 6,
    // paddingVertical: 6,
    // borderWidth: 1,
  },
  statusContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // paddingLeft: 35,
    // borderWidth: 1,
  },
  radioItemStyle: {
    borderRadius: 8,
    paddingVertical: -10,
    // marginVertical: -10,
    // marginLeft: -18,
    // borderWidth: 1,
  },
});
