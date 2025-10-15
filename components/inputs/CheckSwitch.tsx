import { StyleProp, TouchableOpacity, View, ViewStyle } from "react-native";
import GradientButton from "./GradientButton";

export interface IradioDiv {
  style?: StyleProp<ViewStyle>;
  selected?: boolean;
  onPress?: () => void;
}

export const CheckSwitch = ({ style, onPress, selected }: IradioDiv) => {
  const styles: object = style ? style : {};

  return (
    <GradientButton
      colors={selected ? undefined : ["#7f7f7f", "#cacaca"]}
      style={{ width: 50, height: 36, padding: 6, borderRadius: 24 }}
    >
      <TouchableOpacity
        activeOpacity={1}
        className={`max-h-full rounded-3xl w-full`}
        style={styles}
        onPress={onPress}
      >
        <View
          className={`overflow-hidden bg-white aspect-square max-h-full rounded-full ${
            selected ? "translate-x-[14px]" : ""
          }`}
        />
      </TouchableOpacity>
    </GradientButton>
  );
};
