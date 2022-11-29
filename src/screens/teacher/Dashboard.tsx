import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { TeacherStackScreenProps } from "../../types";

const Dashboard = () => {
  const navigation =
    useNavigation<TeacherStackScreenProps<"Dashboard">["navigation"]>();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("CoursesList")}
      style={{
        padding: 10,
        borderWidth: 1,
      }}
    >
      <Text>Courses</Text>
    </TouchableOpacity>
  );
};

export default Dashboard;

const styles = StyleSheet.create({});
