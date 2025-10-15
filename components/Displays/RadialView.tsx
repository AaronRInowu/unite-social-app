import { colors } from "@/global/styles/tailwindClasses";
import React from "react";
import { ColorValue, StyleProp, ViewStyle } from "react-native";
import Svg, { NumberProp, RadialGradient, Rect, Stop } from "react-native-svg";

interface Iradgradcolor {
  color?: ColorValue;
  opacity?: NumberProp;
}

export const RadialView = ({
  start,
  end,
  className = "",
  style = {},
  height = "100%",
  width = "100%",
}: {
  className?: string;
  style?: StyleProp<ViewStyle>;
  start?: Iradgradcolor;
  end?: Iradgradcolor;
  width?: NumberProp;
  height?: NumberProp;
}) => {
  return (
    <Svg style={style} className={className} height={height} width={width}>
      <RadialGradient
        id="grad"
        cx="50%"
        cy="50%"
        rx="50%"
        ry="50%"
        fx="50%"
        fy="50%"
      >
        <Stop
          offset="100%"
          stopColor={start?.color ?? "#24124BCC"}
          stopOpacity={start?.opacity ?? ".3"}
        />
        <Stop
          offset="0%"
          stopColor={end?.color ?? `${colors.btnStart}00`}
          stopOpacity={end?.opacity ?? ".2"}
        />
      </RadialGradient>
      <Rect x="0" y="0" width="100%" height="100%" fill="url(#grad)" />
    </Svg>
  );
};
