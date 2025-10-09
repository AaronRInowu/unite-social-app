import { LinearGradient } from "expo-linear-gradient";
import { View } from "react-native";
import { IcontainerProps } from "../../global/interfaces/general.interface";
import { colors, gradientColors } from "../../global/styles/tailwindClasses";

export default function PageLayout({ children, style }: IcontainerProps) {
  const styles: object = style ? style : {};
  return (
    <View
      style={{
        backgroundColor: colors.gradientStart,
        flex: 1,
      }}
    >
      <LinearGradient
        colors={gradientColors.background}
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
