import { StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";
import _ClassCard from "../../components/_ClassCard";

const ClassesList = () => {
  //get teacher credentails from context api
  const classesList = [
    { name: "BSCS-7A", conductedClasses: 12 },
    { name: "BSCS-7B", conductedClasses: 11 },
    { name: "BSCS-7C", conductedClasses: 10 },
    { name: "BSIT-7A", conductedClasses: 12 },
    { name: "BSCS-7A", conductedClasses: 12 },
    { name: "BSCS-7B", conductedClasses: 11 },
    { name: "BSCS-7C", conductedClasses: 10 },
    { name: "BSIT-7A", conductedClasses: 12 },
    { name: "BSCS-7A", conductedClasses: 12 },
    { name: "BSCS-7B", conductedClasses: 11 },
    { name: "BSCS-7C", conductedClasses: 10 },
    { name: "BSIT-7A", conductedClasses: 12 },
  ];

  return (
    <View style={styles.mainContainer}>
      <FlatList
        data={classesList}
        contentContainerStyle={styles.listContainerStyle}
        renderItem={({ item }) => <_ClassCard item={item} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default ClassesList;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  listContainerStyle: {
    paddingHorizontal: 6,
  },
});
