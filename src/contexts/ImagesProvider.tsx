import { StyleSheet, Text, View } from "react-native";
import React, { useState, useContext, createContext } from "react";

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
  images: Array<ImageAssetType>;
  setImages: React.Dispatch<React.SetStateAction<ImageAssetType[]>>;
}>({
  images: [],
  setImages: () => {},
});

const ImagesProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [images, setImages] = useState<Array<ImageAssetType>>([]);
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
