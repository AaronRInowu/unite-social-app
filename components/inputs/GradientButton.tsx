import { LinearGradient } from "expo-linear-gradient";
import { IcontainerProps } from "../../globals/interfaces/general.interface";
import { btnGradient1, btnGradient2 } from "../../globals/styles/colors";
import globalStyles from "../../globals/styles/globalStyles";

export default function GradientButton({ children, style }: IcontainerProps) {
  const styles: Object = style ? style : {};
  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      colors={[btnGradient1, btnGradient2]}
      style={{
        ...globalStyles.regularBtnStyle,
        ...styles,
      }}
    >
      {children}
    </LinearGradient>
  );
}
