import { StyleProp, TouchableOpacity, View, ViewStyle } from "react-native";

export interface IradioDiv {
  style?: StyleProp<ViewStyle>;
  selected?: boolean;
  onPress?: () => void;
}

export default function CheckRadio({ style, onPress, selected }: IradioDiv) {
  const styles: object = style ? style : {};
  return (
    <TouchableOpacity
      activeOpacity={1}
      className={`p-1 border border-white/50 aspect-square max-h-full rounded-full`}
      style={styles}
      onPress={onPress}
    >
      <View
        className={`overflow-hidden aspect-square max-h-full rounded-full ${
          selected ? 'bg-white' : 'bg-transparent'
        }`}
      />
    </TouchableOpacity>
  );
}
