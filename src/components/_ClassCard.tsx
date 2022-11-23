import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Card } from "react-native-paper";
import { _Icon } from "./general";
import { Button } from "react-native-paper";

const _ClassCard = ({ item }) => {
  return (
    <Card style={styles.mainCardContainer}>
      <View style={styles.mainContainer}>
        <View style={styles.iconContainer}>
          {/* <_VectorIcons
            type={'Ionicons'}
            name={'md-square-outline'}
            size={85}
            color={'#999999'}
          /> */}
          <Image
            tintColor="#999999"
            source={require("../assets/images/png/class.png")}
            style={styles.imageStyle}
          />
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.classTitleText}>{item.name}</Text>
          <Text style={styles.classDetailsText}>
            {item.conductedClasses} classes conducted.
          </Text>
          <View style={styles.buttonContainer}>
            <Button mode="contained" style={styles.button}>
              Update
            </Button>
            <Button mode="outlined" style={styles.button}>
              Mark
            </Button>
          </View>
        </View>
      </View>
    </Card>
  );
};

export { _ClassCard };

const styles = StyleSheet.create({
  mainCardContainer: {
    flexDirection: "row",
    padding: 10,
    marginTop: 2,
    marginBottom: 4,
    borderRadius: 8,
    overflow: "hidden",
    elevation: 5,
  },
  mainContainer: {
    flexDirection: "row",
  },
  iconContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  detailsContainer: { flex: 3 },
  classTitleText: {
    paddingHorizontal: 4,
    paddingVertical: 2,
    fontSize: 18,
    fontFamily: "Visby-Regular",
    fontStyle: "normal",
    fontWeight: "600",
    color: "#424242",
  },
  classDetailsText: {
    paddingHorizontal: 4,
    paddingVertical: 2,
    fontSize: 15,
    color: "#757575",
  },
  buttonContainer: {
    flexDirection: "row-reverse",
    justifyContent: "center",
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
