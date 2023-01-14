import { StyleSheet, Text, View } from "react-native";
import React, { useState, useContext, createContext } from "react";
import { ImageInfo } from "expo-image-picker";

type ImageAssetType = {
  assetId: string | null;
  base64: string | null;
  cancelled: boolean;
  exif: Record<string, any> | null;
  height: number;
  type: "image" | "video";
  uri: string;
  width: number;
};
const Images = createContext<{
  images: ImageInfo[];
  setImages: React.Dispatch<React.SetStateAction<ImageInfo[]>>;
}>({
  images: [],
  setImages: () => {},
});

const ImagesProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [images, setImages] = useState<ImageInfo[]>([]);
  return (
    <Images.Provider
      value={{
        images,
        setImages,
      }}
    >
      {children}
    </Images.Provider>
  );
};
export const useImagesContext = () => useContext(Images);
export default ImagesProvider;
