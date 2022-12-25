import { StyleSheet, Text, View, FlatList, ToastAndroid } from "react-native";
import React, { useState } from "react";
import { _StudentCard } from "../../components";
import { _Button } from "../../components/general";
import { Button, IconButton } from "react-native-paper";
import { colors } from "../../theme";
import globalStyles from "../../theme/globalStyles";
import * as ImagePicker from "expo-image-picker";
import { useImagesContext } from "../../contexts";
import { useNavigation } from "@react-navigation/native";

const students = [
  {
    regNo: "2019-ARID-0069",
    firstName: "Ikrama",
    lastName: "Arif",
    status: "absent",
    img: require("../../assets/images/ImagesAttendance/Ikrama-Arif.jpg"),
  },
  {
    regNo: "2019-ARID-0070",
    firstName: "Adeel",
    lastName: "Anjum",
    status: "absent",
    img: require("../../assets/images/ImagesAttendance/Adeel-Anjum.jpg"),
  },
  {
    regNo: "2019-ARID-0071",
    firstName: "Ali",
    lastName: "Ahmed",
    status: "absent",
    img: require("../../assets/images/ImagesAttendance/Ali-Ahmed.jpg"),
  },
  {
    regNo: "2019-ARID-0072",
    firstName: "Ahmed",
    lastName: "Faizan",
    status: "absent",
    img: require("../../assets/images/ImagesAttendance/Ahmed-Faizan.jpg"),
  },
  {
    regNo: "2019-ARID-0073",
    firstName: "Raja",
    lastName: "Hamza",
    status: "absent",
    img: require("../../assets/images/ImagesAttendance/Raja-Hamza.jpg"),
  },
  {
    regNo: "2019-ARID-0074",
    firstName: "Amir",
    lastName: "Nawaz",
    status: "absent",
    img: require("../../assets/images/ImagesAttendance/Amir-Nawaz.jpg"),
  },
  {
    regNo: "2019-ARID-0075",
    firstName: "Hamza",
    lastName: "Shabbir",
    status: "absent",
    img: require("../../assets/images/ImagesAttendance/Hamza-Shabbir.jpg"),
  },
  {
    regNo: "2019-ARID-0076",
    firstName: "Usman",
    lastName: "Khan",
    status: "absent",
    img: require("../../assets/images/ImagesAttendance/Usman-Khan.jpg"),
  },
  {
    regNo: "2019-ARID-0077",
    firstName: "Abdul",
    lastName: "Rakeeb",
    status: "absent",
    img: require("../../assets/images/ImagesAttendance/Abdul-Rakeeb.jpg"),
  },
  {
    regNo: "2019-ARID-0186",
    firstName: "Ahsan",
    lastName: "Ali",
    status: "absent",
    img: require("../../assets/images/ImagesAttendance/Ahsan-Ali.jpg"),
  },
];

const StudentList = () => {
  const navigation = useNavigation();
  const { images, setImages } = useImagesContext();
  const [visible, setIsVisible] = useState(false);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        allowsMultipleSelection: true,
        // aspect: [4, 3],
        quality: 1,
      });
      console.log(result);
      if (!result.cancelled) {
        if ("selected" in result) {
          setImages(result.selected);
          ToastAndroid.show(
            "Make sure all Images are selected!",
            ToastAndroid.SHORT
          );
        } else {
          setImages([result]);
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  const captureImage = async () => {
    try {
      // const permission = await ImagePicker.requestCameraPermissionsAsync();
      // if (permission.granted === false) return;
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        allowsMultipleSelection: true,
        quality: 1,
      });
      console.log(result);
      // if (!result.cancelled) {
      //   if ("selected" in result) {
      //     setImages(result.selected);
      //     ToastAndroid.show(
      //       "Make sure all Images are selected!",
      //       ToastAndroid.SHORT
      //     );
      //   } else {
      //     setImages([result]);
      //   }
      // }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <View style={styles.mainContainer}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <IconButton
          onPress={() => {
            navigation.navigate("ImageViewer");
          }}
          color={colors.primary}
          icon="animation"
        />
        <IconButton onPress={pickImage} color={colors.primary} icon="image" />
        <IconButton
          onPress={captureImage}
          color={colors.primary}
          icon="camera"
        />
        <IconButton onPress={pickImage} color={colors.primary} icon="send" />
      </View>
      <View style={styles.cardsContainer}>
        <FlatList
          data={students}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContentContainer}
          renderItem={({ item, index }) => <_StudentCard student={item} />}
          keyExtractor={(_, index) => index.toString()}
        />
      </View>
      {/* <View style={styles.submitButton}>
        <Button
          icon="send"
          mode="contained"
          color={colors.primary}
          onPress={() => {}}
          // style={styles.submitButton}
          labelStyle={styles.buttonText}
        >
          SUBMIT
        </Button>
      </View> */}
    </View>
  );
};

export default StudentList;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    // paddingHorizontal: 4,
    backgroundColor: colors.white,
  },
  listContentContainer: {
    paddingHorizontal: 4,
    paddingBottom: 45,
  },
  cardsContainer: {
    flex: 9.5,
    // paddingHorizontal: 4,
  },
  submitButton: {
    // display: "flex",
    width: "98%",
    position: "absolute",
    bottom: 0,
    marginTop: 4,
    paddingHorizontal: 2,
    paddingBottom: 4,
    justifyContent: "center",
    marginHorizontal: 4,
    borderRadius: 50,
  },
  buttonText: {
    ...globalStyles.descText,
    color: colors.white,
  },
});
