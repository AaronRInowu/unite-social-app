import { StyleProp, TouchableOpacity, View, ViewStyle } from "react-native";
import globalStyles from "../../globals/styles/globalStyles";

export interface IradioDiv {
  style?: StyleProp<ViewStyle>;
  selected?: boolean;
  onPress?: () => void;
}

export default function CheckRadio({ style, onPress, selected }: IradioDiv) {
  const styles: Object = style ? style : {};
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={{
        padding: 3,
        borderWidth: 1,
        borderColor: `${globalStyles.mainTextColor.color}80`,
        aspectRatio: 1,
        maxHeight: "100%",
        borderRadius: "100%",
        ...styles,
      }}
      onPress={onPress}
    >
      <View
        style={{
          backgroundColor: `${globalStyles.mainTextColor.color}${
            selected ? "" : "00"
          }`,
          overflow: "hidden",
          aspectRatio: 1,
          maxHeight: "100%",
          borderRadius: "100%",
        }}
      />
    </TouchableOpacity>
  );
}
