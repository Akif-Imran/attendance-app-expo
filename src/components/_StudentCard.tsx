import { StyleSheet, Text, View, Image, Switch } from "react-native";
import React, { useState } from "react";
import { Card, RadioButton } from "react-native-paper";
import { colors, gStyles, PaperTheme } from "../theme";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import globalStyles from "../theme/globalStyles";

interface _StudentCard {
  student: any;
}

const _StudentCard: React.FC<_StudentCard> = ({
  student,
}: {
  student: {
    regNo: string;
    firstName: string;
    lastName: string;
    status: string;
  };
}) => {
  const [value, setValue] = useState("present");
  const [isPresent, setIsPresent] = useState(false);

  const toggleSwitch = () => setIsPresent((previousState) => !previousState);
  return (
    <Card elevation={4} style={styles.mainContainer}>
      <View style={styles.contentContainer}>
        <View style={styles.imageContainer}>
          <Image source={student.img} style={styles.imageStyle} />
        </View>
        <View style={styles.detailsContainer}>
          <View style={styles.iconWithTextContainer}>
            {/* icons container */}
            <View style={styles.iconContainer}>
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
            </View>
            {/* text container */}
            <View style={styles.studentDetailsTextContainer}>
              <Text style={styles.cardDetailsText}>
                {/* <Text style={gStyles.cardTitleText}>Reg No.</Text> */}
                {student.regNo}
              </Text>
              <Text style={styles.cardDetailsText}>
                {student.firstName} {student.lastName}
              </Text>
            </View>
          </View>

          {/* <View style={styles.iconWithTextContainer}>
            <FontAwesome name="id-card" size={20} color={colors.iconColor} />
            <Text style={gStyles.cardDetailsText}>
              {student.regNo}
            </Text>
          </View>
          <View style={styles.iconWithTextContainer}>
            <FontAwesome name="user" size={20} color={colors.iconColor} />
            <Text style={gStyles.cardDetailsText}>
              {student.firstName} {student.lastName}
            </Text>
          </View> */}

          <View style={styles.radioButtonMain}>
            <View>
              <Text style={gStyles.cardDetailsText}>
                {isPresent ? "present" : "absent"}
              </Text>
            </View>
            <View>
              <Switch
                trackColor={{ false: colors.error, true: colors.primary }}
                thumbColor={isPresent ? colors.white : colors.white}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isPresent}
              />
            </View>
          </View>
          {/* <RadioButton.Group
            onValueChange={(newValue) => setValue(newValue)}
            value={value}
          >
            <View style={styles.radioButtonMain}>
              <Switch
                trackColor={{ false: colors.error, true: colors.primary }}
                thumbColor={isPresent ? colors.white : colors.white}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isPresent}
              />
              {/* <RadioButton.Item
                theme={PaperTheme}
                label="Present"
                value="present"
                color={colors.primary}
                uncheckedColor={colors.iconGray}
                labelStyle={gStyles.cardDetailsText}
                style={[styles.radioItemStyle, { marginLeft: -18 }]}
                position="leading"
              />

              <RadioButton.Item
                theme={PaperTheme}
                label="Absent"
                value="absent"
                color={colors.error}
                uncheckedColor={colors.iconGray}
                labelStyle={gStyles.cardDetailsText}
                style={styles.radioItemStyle}
                position="leading"
              /> */}
          {/* </View> */}
          {/* <Text style={gStyles.cardDetailsText}>Present</Text> */}
          {/* <View style={styles.radioContainer}></View>
            <View style={styles.radioContainer}></View> */}
          {/* <Text style={gStyles.cardDetailsText}>Absent</Text> */}
          {/* </RadioButton.Group> */}
          {/* <Text style={gStyles.cardDetailsText}>{student.status}</Text> */}
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
    paddingRight: 6,
    borderRadius: 15,
    // paddingHorizontal: 6,
    // paddingVertical: 6,
    // borderWidth: 1,
  },
  radioButtonMain: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingLeft: 35,
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
