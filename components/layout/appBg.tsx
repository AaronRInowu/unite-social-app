import { LinearGradient } from "expo-linear-gradient";
import { View } from "react-native";
import { IcontainerProps } from "../../globals/interfaces/general.interface";
import { bgGradient1, bgGradient2 } from "../../globals/styles/colors";

export default function PageLayout({ children, style }: IcontainerProps) {
  const styles: Object = style ? style : {};
  return (
    <View
      style={{
        backgroundColor: bgGradient1,
        flex: 1,
      }}
    >
      <LinearGradient
        colors={[bgGradient1, bgGradient2]}
        style={{
          flex: 1,
          width: "100%",
          paddingInline: 24,
          paddingVertical: "25%",
          ...styles,
        }}
      >
        {children}
      </LinearGradient>
    </View>
  );
}
