import { LinearGradient } from "expo-linear-gradient";
import { IcontainerProps } from "../../global/interfaces/general.interface";
import { gradientColors } from "../../global/styles/tailwindClasses";

export default function GradientButton({ children, style }: IcontainerProps) {
  const styles: object = style ? style : {};
  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      colors={gradientColors.button}
      className="rounded-custom w-full p-btn"
      style={styles}
    >
      {children}
    </LinearGradient>
  );
}
