import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  ToastAndroid,
} from "react-native";
import React, { useState } from "react";
import { useImagesContext } from "../../contexts";
import { TouchableOpacity } from "react-native-gesture-handler";
import { colors } from "../../theme";
import { Button, IconButton } from "react-native-paper";
import globalStyles from "../../theme/globalStyles";
import { _Button } from "../../components/general";
import { ai, aiImage, api, baseURL, baseURLAI } from "../../helpers";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ChangeStatusCallbackType, TeacherStackScreenProps } from "../../types";
import { useStudentContext } from "../../contexts/StudentListProvider";

const ImageViewer = () => {
  const route = useRoute<TeacherStackScreenProps<"ImageViewer">["route"]>();
  const navigation =
    useNavigation<TeacherStackScreenProps<"ImageViewer">["navigation"]>();
  const { images, setImages } = useImagesContext();
  const [viewImage, setViewImage] = useState({ index: 0, ...images[0] });
  const { students, setStudents } = useStudentContext();
  const [loading, setLoading] = useState<boolean>(false);

  const deleteImage = (delIndex: number) => {
    const filteredImages = images.filter((value, index) => index !== delIndex);
    setImages(filteredImages);
    setViewImage({ index: 0, ...filteredImages[0] });
  };
  if (images.length === 0) {
    return (
      <View style={styles.mainContainer}>
        <Text style={styles.title}>No Images Selected!</Text>
      </View>
    );
  }

  const changeStatus: ChangeStatusCallbackType = (regNo, status) => {
    let arr = [...students];
    const index = students.findIndex((value) => value.regno === regNo);
    const s = students[index];
    s.status = status;
    arr.splice(index, 1, s);
    setStudents(arr);
  };

  const addLectureDetails = async () => {
    setLoading(true);
    console.log("called");

    let formData = new FormData();
    for (let image of images) {
      let localUri = image.uri;
      console.log("uri", localUri);
      let filename = localUri.split("/").pop() || "";
      console.log("filename", filename);
      let match = /\.(\w+)$/.exec(filename);
      console.log("match", match);
      let type = match ? `image/${match[1]}` : `image`;
      console.log("type", type);

      formData.append("files", {
        name: filename,
        type: type,
        uri: image.uri,
      });
    }

    Object.entries(route.params).forEach((value) => {
      if (value[0] !== "attendances") formData.append(value[0], value[1]);
    });
    console.log(JSON.stringify(formData));

    await api
      .post("/lecture/add-lecture-details", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(JSON.stringify(res.data));
        const resData = res.data;
        const attendances: string[] = resData["attendances"];

        for (let student of students) {
          if (attendances.includes(student.regno)) {
            changeStatus(student.regno, "present");
          } else {
            changeStatus(student.regno, "absent");
          }
        }
        let arr = students.sort((a, b) => {
          if (a.status > b.status) return 1;
          else if (a.status < b.status) return -1;
          else return 0;
        });
        console.log("sorted array", arr);
        setStudents(arr);
        ToastAndroid.show("Facial recognition completed.", ToastAndroid.SHORT);
        navigation.goBack();
      })
      .catch((err) => {
        console.error(err.response);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.viewImageContainer}>
        <Image
          source={{ uri: viewImage.uri }}
          defaultSource={require("../../assets/images/png/icons8-picture-250.png")}
          style={styles.viewImageStyle}
          resizeMode="cover"
        />
      </View>
      <FlatList
        data={images}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{
          marginTop: 6,
          paddingHorizontal: 6,
          paddingVertical: 6,
          borderRadius: 15,
          backgroundColor: colors.white,
        }}
        renderItem={({ item, index }) => (
          <View style={styles.imagesContainer}>
            <TouchableOpacity
              onPress={() => {
                setViewImage({ index, ...item });
              }}
            >
              <Image
                source={{ uri: item.uri }}
                style={styles.imageStyle}
                resizeMode="cover"
              />
            </TouchableOpacity>
            <View style={styles.deleteContainer}>
              <IconButton
                onPress={() => deleteImage(index)}
                color={colors.error}
                icon="delete"
                size={20}
                style={{ margin: 0 }}
              />
            </View>
          </View>
        )}
        keyExtractor={(_, index) => index.toString()}
      />
      <View style={styles.buttonContainer}>
        <Button
          loading={loading}
          onPress={addLectureDetails}
          mode="contained"
          color={colors.primary}
          style={styles.buttonStyle}
          labelStyle={styles.labelStyle}
        >
          Run Facial Recognition
        </Button>
      </View>
    </View>
  );
};

export default ImageViewer;

const styles = StyleSheet.create({
  mainContainer: {
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  title: {
    ...globalStyles.cardTitleText,
    textAlign: "center",
    color: colors.titleText,
    fontFamily: "Visby-Medium",
  },
  deleteContainer: {
    paddingHorizontal: 4,
    flexDirection: "row",
    justifyContent: "flex-end",
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    borderColor: colors.borderColor,
    borderWidth: 1,
  },
  viewImageContainer: {
    height: 200,
  },
  viewImageStyle: {
    flex: 1,
    borderRadius: 15,
  },
  imageStyle: {
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    width: 70,
    height: 70,
  },
  imagesContainer: {
    paddingVertical: 4,
    paddingHorizontal: 4,
  },
  buttonContainer: {
    // flex: 1,
    marginTop: 15,
    justifyContent: "center",
    alignItems: "center",
    // borderWidth: 1,
  },
  buttonStyle: {
    width: "100%",
    borderRadius: 15,
    paddingVertical: 15,
  },
  labelStyle: {
    fontSize: 16,
    fontFamily: "Visby-Bold",
  },
});
