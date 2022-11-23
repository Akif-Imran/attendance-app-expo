import React, { FC } from "react";
import AntDesignIcon from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import EntypoIcon from "@expo/vector-icons/Entypo";
import EvilIconsIcon from "@expo/vector-icons/EvilIcons";
import FeatherIcon from "@expo/vector-icons/Feather";
import FontAwesomeIcon from "@expo/vector-icons/FontAwesome";
import FontAwesome5Icon from "@expo/vector-icons/FontAwesome5";
import FontistoIcon from "@expo/vector-icons/Fontisto";
import MaterialIcon from "@expo/vector-icons/MaterialIcons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import Foundation from "@expo/vector-icons/Foundation";
import Zocial from "@expo/vector-icons/Zocial";
import Octicons from "@expo/vector-icons/Octicons";

interface _VectorIconsProps {
  type: string;
  name: string;
  size: number;
  color: string;
  props: any;
}
const _VectorIcons: FC<_VectorIconsProps> = ({
  type,
  name,
  size,
  color,
  props,
}) => {
  switch (type) {
    case "Octicons":
      return (
        <Octicons
          name={name}
          size={size || 16}
          color={color || "#fff"}
          {...props}
        />
      );
    case "Zocial":
      return (
        <Zocial
          name={name}
          size={size || 16}
          color={color || "#fff"}
          {...props}
        />
      );
    case "Foundation":
      return (
        <Foundation
          name={name}
          size={size || 16}
          color={color || "#fff"}
          {...props}
        />
      );
    case "SimpleLineIcons":
      return (
        <SimpleLineIcons
          name={name}
          size={size || 16}
          color={color || "#fff"}
          {...props}
        />
      );
    case "MaterialCommunityIcons":
      return (
        <MaterialCommunityIcons
          name={name}
          size={size || 16}
          color={color || "#fff"}
          {...props}
        />
      );
    case "AntDesign":
      return (
        <AntDesignIcon
          name={name}
          size={size || 16}
          color={color || "#fff"}
          {...props}
        />
      );
    case "Entypo":
      return (
        <EntypoIcon
          name={name}
          size={size || 16}
          color={color || "#fff"}
          {...props}
        />
      );
    case "EvilIcons":
      return (
        <EvilIconsIcon
          name={name}
          size={size || 16}
          color={color || "#fff"}
          {...props}
        />
      );
    case "Feather":
      return (
        <FeatherIcon
          name={name}
          size={size || 16}
          color={color || "#fff"}
          {...props}
        />
      );
    case "FontAwesome":
      return (
        <FontAwesomeIcon
          name={name}
          size={size || 16}
          color={color || "#fff"}
          {...props}
        />
      );
    case "FontAwesome5":
      return (
        <FontAwesome5Icon
          name={name}
          size={size || 16}
          color={color || "#fff"}
          {...props}
        />
      );
    case "Fontisto":
      return (
        <FontistoIcon name={name} size={size || 16} color={color || "#fff"} />
      );
    case "Material" || "MaterialIcons":
      return (
        <MaterialIcon
          name={name}
          size={size || 16}
          color={color || "#fff"}
          {...props}
        />
      );
    case "Ionicons":
      return (
        <Ionicons
          name={name}
          size={size || 16}
          color={color || "#fff"}
          {...props}
        />
      );
    default:
      return <Ionicons name={name} size={size || 16} color={color || "#fff"} />;
  }
};

export default _VectorIcons;
