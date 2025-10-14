import { ReactNode } from "react";
import { StyleProp, ViewStyle } from "react-native";

export interface IcontainerProps<T = ViewStyle> {
  children?: ReactNode;
  style?: StyleProp<T>;
  className?: string;
}
