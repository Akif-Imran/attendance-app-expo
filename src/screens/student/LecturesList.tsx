import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import React from "react";
import { Card } from "react-native-paper";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  ParentStackScreenProps,
  StudentStackScreenProps,
  StudentViewAttendanceObject,
  TeacherStackScreenProps,
} from "../../types";
import { colors, gStyles } from "../../theme";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

interface LecturesListProps {}

const LecturesList: React.FC<LecturesListProps> = () => {
  const route = useRoute<StudentStackScreenProps<"LectureList">["route"]>();
  const data = route.params.attendances;

  return (
    <View style={styles.mainContainer}>
      <FlatList
        data={data}
        renderItem={({ index, item }) => <_LectureCard attendance={item} />}
        keyExtractor={(_, index) => index.toString()}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

// const images = [bg_Image_1, bg_Image_2, bg_Image_3, bg_Image_4];
interface _LectureCardProps {
  attendance: StudentViewAttendanceObject;
}

const statusColor = {
  present: colors.primary,
  absent: colors.error,
};

const _LectureCard: React.FC<_LectureCardProps> = ({ attendance }) => {
  const navigation =
    useNavigation<ParentStackScreenProps<"CoursesList">["navigation"]>();
  const { heldOnDate, status, time } = attendance;

  const handleChallenge = () => {
    Alert.alert(
      "Challenge Attendance!",
      "Are you sure?", // <- this part is optional, you can pass an empty string
      [
        {
          text: "Challenge",
          onPress: () => console.log("OK Pressed"),
          style: "default",
        },
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
      ],
      { cancelable: false }
    );
  };
  return (
    <Card style={styles.cardContainer} elevation={2} onPress={handleChallenge}>
      {/* <Image source={images[2]} style={styles.imageContainer} /> */}
      <View style={styles.coursesDetailsContainer}>
        {/* date and time */}
        <View style={styles.infoContainer}>
          <Text style={gStyles.cardTitleText}>{heldOnDate}</Text>
          <Text style={gStyles.cardDetailsText}>{time}</Text>
        </View>
        {/* challenge button */}
        {/* <TouchableOpacity
          style={styles.challengeButton}
          onPress={}
        >
          <FontAwesome5 name="ban" color={colors.error} size={20} />
        </TouchableOpacity> */}

        {/* attendance status */}
        <View style={styles.statusContainer}>
          <Text
            style={[styles.courseDetailsText, { color: statusColor[status] }]}
          >
            {status}
          </Text>
        </View>
      </View>
    </Card>
  );
};

export default LecturesList;

const styles = StyleSheet.create({
  mainContainer: {
    paddingHorizontal: 4,
    paddingTop: 15,
  },
  cardContainer: {
    // flex: 1,
    // elevation: 8,
    paddingHorizontal: 4,
    marginVertical: 4,
    borderRadius: 8,
    marginBottom: 5,
    // borderWidth: 1,
  },
  imageContainer: {
    resizeMode: "cover",
    width: "100%",
    height: 150,
    borderWidth: 1,
  },
  infoContainer: {
    flex: 3,
    // borderWidth: 1,
  },
  challengeButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    marginHorizontal: 10,
    borderColor: colors.borderColor,
    borderWidth: 1,
  },
  coursesDetailsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 12,
  },
  statusContainer: {
    flex: 1,
    justifyContent: "center",
    // borderWidth: 1,
  },
  courseTitleText: {
    paddingHorizontal: 4,
    paddingVertical: 2,
    fontSize: 18,
    fontFamily: "Visby-Regular",
    fontStyle: "normal",
    fontWeight: "600",
    color: "#424242",
  },
  courseDetailsText: {
    paddingHorizontal: 4,
    paddingVertical: 2,
    fontSize: 16,
    fontFamily: "Visby-Regular",
    color: "#757575",
  },
});
