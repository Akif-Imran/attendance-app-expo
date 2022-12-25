import { StyleSheet, Text, View, FlatList, Image } from "react-native";
import React, { useState } from "react";
import { useImagesContext } from "../../contexts";
import { TouchableOpacity } from "react-native-gesture-handler";
import { colors } from "../../theme";
import { IconButton } from "react-native-paper";
import globalStyles from "../../theme/globalStyles";

const ImageViewer = () => {
  const { images, setImages } = useImagesContext();
  const [viewImage, setViewImage] = useState({ index: 0, ...images[0] });

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
});
