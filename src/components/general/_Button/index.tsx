import {
  Text,
  StyleProp,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
} from "react-native";
import React, { FC } from "react";
import { styles } from "./styles";
import { colors } from "../../../theme";

interface _ButtonProps {
  color?: string;
  bgColor?: string;
  title: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

const _Button: FC<_ButtonProps> = ({
  color,
  bgColor,
  title,
  onPress,
  style,
  textStyle,
}) => {
  return (
    <TouchableOpacity
      style={[styles.mainContainer, { backgroundColor: bgColor }, style]}
      activeOpacity={0.5}
      onPress={onPress}
    >
      <Text
        style={[
          styles.btnTitle,
          {
            color,
          },
          textStyle,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

_Button.defaultProps = {
  bgColor: colors.primary,
  color: colors.textOnPrimary,
};

export default _Button;
