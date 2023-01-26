import { StyleSheet, Text, View, Image } from "react-native";
import React, { useState } from "react";
import { Card, RadioButton } from "react-native-paper";
import { colors, gStyles, PaperTheme } from "../../theme";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import globalStyles from "../../theme/globalStyles";
import { useNavigation } from "@react-navigation/native";
import { ParentStackScreenProps } from "../../types";

interface _ChildCard {
  student: any;
}

const _ChildCard: React.FC<_ChildCard> = ({ student }) => {
  const [value, setValue] = useState("present");
  const navigation = useNavigation<ParentStackScreenProps<"Dashboard">["navigation"]>();
  return (
    <Card
      elevation={4}
      style={styles.mainContainer}
      onPress={() =>
        navigation.navigate("CoursesList", {
          childName: `${student.firstName} ${student.lastName}`,
          courses: [
            {
              session: "SPRING-2022",
              course: "CS-808",
              title: "DSA",
              percentage: "75.0",
            },
            {
              session: "SPRING-2022",
              course: "CS-809",
              title: "COAL",
              percentage: "72.8",
            },
          ],
        })
      }
    >
      <View style={styles.contentContainer}>
        <View style={styles.imageContainer}>
          <Image source={student.img} style={styles.imageStyle} />
        </View>
        <View style={styles.detailsContainer}>
          <View style={styles.iconWithTextContainer}>
            {/* icons container */}
            {/* <View style={styles.iconContainer}>
              <View style={styles.perIconContainer}>
                <FontAwesome name="user" size={14} color={colors.iconColor} />
              </View>
              <View style={styles.perIconContainer}>
                <FontAwesome
                  name="id-card"
                  size={14}
                  color={colors.iconColor}
                />
              </View>
              <View style={styles.perIconContainer}>
                <FontAwesome5
                  name="school"
                  size={14}
                  color={colors.iconColor}
                />
              </View>
            </View> */}
            {/* text container */}
            <View style={styles.studentDetailsTextContainer}>
              <Text style={gStyles.cardInfoTitleText}>
                {student.firstName} {student.lastName}
              </Text>
              <Text style={styles.cardDetailsText}>
                {/* <Text style={gStyles.cardTitleText}>Reg No.</Text> */}
                {student.regNo}
              </Text>
              <Text style={styles.cardDetailsText}>
                {/* <Text style={gStyles.cardTitleText}>Reg No.</Text> */}
                {student.class}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </Card>
  );
};

export default _ChildCard;

const styles = StyleSheet.create({
  mainContainer: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginVertical: 2,
    // borderWidth: 1,
  },
  imageStyle: {
    width: 80,
    height: 80,
    borderRadius: 4,
    // borderWidth: 1,
  },
  imageContainer: {
    // borderRadius: 50,
    overflow: "hidden",
  },
  cardDetailsText: {
    ...globalStyles.cardDetailsText,
    paddingVertical: 4,
    fontSize: 14,
    // borderWidth: 1,
  },
  cardTitleText: {
    ...globalStyles.cardTitleText,
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
    justifyContent: "space-between",
    paddingLeft: 10,
    // borderWidth: 1,
  },
  iconWithTextContainer: {
    flexDirection: "row",
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
    paddingHorizontal: 4,
    // borderWidth: 1,
  },
  contentContainer: {
    flexDirection: "row",
  },
  radioContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    // paddingHorizontal: 6,
    // paddingVertical: 6,
    paddingRight: 6,
    borderRadius: 15,
    // borderWidth: 1,
  },
  radioButtonMain: {
    flexDirection: "row",
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
