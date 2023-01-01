import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Platform,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import type {
  ApiTimetableSession,
  ApiTimetableSessionByDay,
  TeacherStackScreenProps,
} from "../../types";
import { Button, Card } from "react-native-paper";
import globalStyles from "../../theme/globalStyles";
import { colors } from "../../theme";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { api } from "../../helpers";
import { useUserContext } from "../../contexts";

const timetable = [
  {
    day: "Sunday",
    sessions: [],
  },
  {
    day: "Monday",
    sessions: [
      {
        subject: "COAL",
        class: "BSCS-6A",
        venue: "LT-11",
        start: "8:00 AM",
        stop: "8:30 AM",
      },
      {
        subject: "PF",
        class: "BSCS-7A",
        venue: "LT-11",
        start: "8:35 AM",
        stop: "9:05 AM",
      },
    ],
  },
  {
    day: "Tuesday",
    sessions: [
      {
        subject: "COAL",
        class: "BSCS-6A",
        venue: "LT-11",
        start: "8:00 AM",
        stop: "8:30 AM",
      },
      {
        subject: "PF",
        class: "BSCS-7A",
        venue: "LT-11",
        start: "8:35 AM",
        stop: "9:05 AM",
      },
    ],
  },
  {
    day: "Wednesday",
    sessions: [
      {
        subject: "MAP",
        class: "BSCS-6A",
        venue: "LT-11",
        start: "8:00 AM",
        stop: "8:30 AM",
      },
    ],
  },
  {
    day: "Thursday",
    sessions: [],
  },
  {
    day: "Friday",
    sessions: [
      {
        subject: "COAL",
        class: "BSCS-6A",
        venue: "LT-11",
        start: "8:00 AM",
        stop: "8:30 AM",
      },
      {
        subject: "PF",
        class: "BSCS-7A",
        venue: "LT-11",
        start: "8:35 AM",
        stop: "9:05 AM",
      },
    ],
  },
  {
    day: "Saturday",
    sessions: [],
  },
];

const Dashboard = () => {
  const navigation =
    useNavigation<TeacherStackScreenProps<"Dashboard">["navigation"]>();
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [ApiTimetable, setApiTimetable] =
    useState<Array<ApiTimetableSessionByDay>>();
  const { user } = useUserContext();

  useEffect(() => {
    if (!user) return;
    const fetchTimetables = async () => {
      const response = await api.get(
        `/teacher/get-teacher-timetable/${user.id}`
      );
      if (response.status === 200) {
        const apiData: Array<ApiTimetableSessionByDay> = response.data;
        console.log(apiData);
        setApiTimetable(apiData);
      }
    };
    fetchTimetables().catch((error) =>
      console.error("Teacher-Dashboard: Timetable")
    );
  }, [user]);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const showDatePicker = () => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode: "date",
      display: "spinner",
      is24Hour: true,
    });
  };

  return (
    <View style={styles.mainContainer}>
      {/* <TouchableOpacity
        onPress={() => navigation.navigate("CoursesList")}
        style={{
          padding: 10,
          borderWidth: 1,
        }}
      >
        <Text>Courses</Text>
      </TouchableOpacity> */}

      <View style={styles.dateContainer}>
        <View style={styles.dateInnerContainer}>
          <Text style={styles.subjectText}>{date.toDateString()}</Text>
        </View>
        <View style={styles.dateInnerContainer}>
          <Button
            onPress={() => showDatePicker()}
            mode="contained"
            color={colors.primary}
            labelStyle={styles.buttonText}
          >
            Select
          </Button>
          <Button
            onPress={() => {
              setDate(new Date());
            }}
            mode="contained"
            color={colors.primary}
            labelStyle={styles.buttonText}
          >
            Today
          </Button>
        </View>
      </View>
      {ApiTimetable ? (
        <FlatList
          data={[ApiTimetable[date.getDay()]]}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.timetableListContentContainer}
          renderItem={({ item, index }) => (
            <View>
              <Text style={styles.dayText}>{item.day}</Text>
              <View>
                <Card key={index} style={styles.cardStyle}>
                  {item.sessions.length === 0 ? (
                    <View style={[styles.detailsContainer, styles.noClasses]}>
                      <Text style={styles.subjectText}>No Classes</Text>
                    </View>
                  ) : (
                    <RenderCard sessions={item.sessions} />
                  )}
                </Card>
              </View>
            </View>
          )}
          keyExtractor={(_, index) => index.toString()}
        />
      ) : null}
    </View>
  );
};

interface RenderCardProps {
  sessions: Array<ApiTimetableSession>;
}
const RenderCard: React.FC<RenderCardProps> = ({ sessions }) => {
  const navigation =
    useNavigation<TeacherStackScreenProps<"Dashboard">["navigation"]>();
  return (
    <>
      {sessions.map((value, index) => (
        <TouchableOpacity
          style={[
            styles.detailsContainer,
            sessions.length === index + 1 ? null : styles.classSeparator,
          ]}
          key={index}
          onPress={() =>
            navigation.navigate("StudentList", {
              class: value.class,
              course: value.subject,
              slot: value.slot,
              venue: value.venue,
            })
          }
        >
          <View style={styles.classDetails}>
            {/* <View style={styles.icons}>
            <FontAwesome5
              name="book-open"
              size={18}
              color={colors.iconGray}
            />
            <FontAwesome5
              name="school"
              size={18}
              color={colors.iconGray}
            />
            <Ionicons
              name="location"
              size={18}
              color={colors.iconGray}
            />
          </View> */}
            <View style={styles.text}>
              <Text style={styles.subjectText}>{value.subject}</Text>
              <Text style={styles.classVenueText}>
                {value.class} |{" "}
                <Text style={styles.classVenueText}>{value.venue}</Text>
              </Text>
            </View>
          </View>
          <View style={styles.timeDetails}>
            <Text style={styles.startTimeText}>{value.start}</Text>
            <Text style={styles.stopTimeText}>{value.stop}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    // paddingHorizontal: 4,
    backgroundColor: colors.mediumGray,
  },
  timetableListContentContainer: {
    paddingHorizontal: 4,
  },
  cardStyle: {
    flex: 1,
    // borderWidth: 1,
  },
  dayText: {
    ...globalStyles.smallHeaderText,
    paddingVertical: 5,
    paddingHorizontal: 19,
  },
  detailsContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    // borderWidth: 1,
  },
  classSeparator: {
    borderBottomWidth: 0.75,
    borderColor: colors.borderColor,
  },
  icons: {
    flexDirection: "column",
    width: 30,
    alignItems: "flex-end",
    // borderWidth: 1,
  },
  text: {
    // borderWidth: 1,
  },
  classDetails: {
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: 15,
    paddingVertical: 15,
    // borderWidth: 1,
  },

  noClasses: {
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  dateContainer: {
    flexDirection: "row",
    paddingTop: 15,
    paddingHorizontal: 4,
  },
  dateInnerContainer: {
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: 15,
    justifyContent: "space-between",
    // justifyContent: "center",
    alignItems: "center",
  },
  subjectText: {
    ...globalStyles.cardTitleText,
    paddingLeft: 6,
    lineHeight: 20,
    fontSize: 16,
    color: colors.titleText,
  },
  buttonText: {
    ...globalStyles.cardTitleText,
    paddingLeft: 6,
    lineHeight: 20,
    fontSize: 14,
    color: colors.white,
  },
  classVenueText: {
    ...globalStyles.cardDetailsText,
    paddingLeft: 6,
    lineHeight: 20,
    fontSize: 14,
  },
  timeDetails: {
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: 15,
    paddingVertical: 15,
    // borderWidth: 1,
  },
  startTimeText: {
    ...globalStyles.descText,
    // elevation: 6,
    flex: 1,
    // backgroundColor: colors.primary,
    // color: colors.white,
    fontFamily: "Visby-Medium",
    textAlign: "center",
    textAlignVertical: "center",
    paddingHorizontal: 10,
    fontSize: 14,
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
    borderColor: colors.borderColor,
    borderWidth: 1,
  },
  stopTimeText: {
    ...globalStyles.descText,
    // elevation: 6,
    flex: 1,
    // backgroundColor: colors.primary,
    // color: colors.white,
    fontFamily: "Visby-Medium",
    textAlign: "center",
    textAlignVertical: "center",
    paddingHorizontal: 10,
    fontSize: 14,
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
    borderLeftWidth: 1,
    borderColor: colors.borderColor,
    borderWidth: 1,
  },
});

