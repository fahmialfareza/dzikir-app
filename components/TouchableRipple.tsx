import {
  Platform,
  TouchableHighlight,
  TouchableNativeFeedback,
} from "react-native";

interface Props {
  onPress: () => void;
  style?: any;
  children?: any;
}

const TouchableRipple = ({ onPress, style, children }: Props) => {
  return Platform.OS === "android" ? (
    <TouchableNativeFeedback
      background={TouchableNativeFeedback.Ripple("#fff", false)}
      useForeground={true}
      onPress={onPress}
      {...style}
    >
      {children}
    </TouchableNativeFeedback>
  ) : (
    <TouchableHighlight
      activeOpacity={0.6}
      underlayColor="#fff"
      onPress={onPress}
      {...style}
    >
      {children}
    </TouchableHighlight>
  );
};

export default TouchableRipple;
