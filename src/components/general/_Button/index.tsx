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
  // style?: StyleProp<ViewStyle>;
  // textStyle?: StyleProp<TextStyle>;
  size: "small" | "medium" | "large";
}

const btnSize = {
  small: styles.small,
  medium: styles.medium,
  large: styles.large,
};

const btnText = {
  small: styles.textSmall,
  medium: styles.textMedium,
  large: styles.textLarge,
};

const _Button: FC<_ButtonProps> = (props) => {
  const { color, bgColor, title, onPress, size } = props;
  return (
    <TouchableOpacity
      style={[
        styles.mainContainer,
        btnSize[size],
        { backgroundColor: bgColor },
      ]}
      activeOpacity={0.5}
      onPress={onPress}
    >
      <Text
        style={[
          styles.btnTitle,
          {
            color,
          },
          btnText[size],
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
