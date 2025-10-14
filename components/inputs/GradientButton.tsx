import { LinearGradient } from "expo-linear-gradient";
import { ColorValue } from "react-native";
import { IcontainerProps } from "../../global/interfaces/general.interface";
import { gradientColors } from "../../global/styles/tailwindClasses";

interface Igrad extends IcontainerProps {
  colors?: [ColorValue, ColorValue];
  toTop?: boolean;
}

export default function GradientButton({
  toTop,
  children,
  style,
  className = "",
  colors,
}: Igrad) {
  const styles: object = style ? style : {};
  return (
    <LinearGradient
      start={{ x: !toTop ? 0 : 1, y: !toTop ? 0 : 1 }}
      end={{ x: 1, y: 0 }}
      colors={colors ?? gradientColors.button}
      className={`rounded-custom w-full p-btn ${className}`}
      style={styles}
    >
      {children}
    </LinearGradient>
  );
}
