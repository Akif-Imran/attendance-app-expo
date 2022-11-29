import { StyleSheet, Text, View, Image } from "react-native";
import React, { useState } from "react";
import { Card, RadioButton } from "react-native-paper";
import { colors, gStyles } from "../theme";

interface _StudentCard {
  student: any;
}

const _StudentCard: React.FC<_StudentCard> = ({ student }) => {
  const [value, setValue] = useState("present");
  return (
    <Card elevation={4} style={styles.mainContainer}>
      <View style={styles.contentContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={require("../assets/images/jpg/abstract-bg-1.jpg")}
            style={styles.imageStyle}
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={gStyles.cardDetailsText}>
            {/* <Text style={gStyles.cardTitleText}>Reg No.</Text> */}
            {student.regNo}
          </Text>
          <Text style={gStyles.cardDetailsText}>
            {student.firstName} {student.lastName}
          </Text>
          <RadioButton.Group
            onValueChange={(newValue) => setValue(newValue)}
            value={value}
          >
            <View style={styles.radioButtonMain}>
              <View style={styles.radioContainer}>
                <RadioButton value="present" color={colors.primary} />
                <Text style={gStyles.cardDetailsText}>Present</Text>
              </View>
              <View style={styles.radioContainer}>
                <RadioButton value="absent" color={colors.error} />
                <Text style={gStyles.cardDetailsText}>Absent</Text>
              </View>
            </View>
          </RadioButton.Group>
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
    width: 75,
    height: 75,
    borderRadius: 50,
    // borderWidth: 1,
  },
  imageContainer: {
    borderRadius: 50,
    overflow: "hidden",
  },
  textContainer: {
    paddingLeft: 10,
    // borderWidth: 1,
  },
  contentContainer: {
    flexDirection: "row",
  },
  radioContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 6,
    paddingVertical: 6,
    borderRadius: 15,
    // borderWidth: 1,
  },
  radioButtonMain: {
    flexDirection: "row",
  },
});
