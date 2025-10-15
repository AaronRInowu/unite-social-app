import { ReactNode } from "react";
import { StyleProp, ViewStyle } from "react-native";
import { User } from "./users.interface";

export interface IcontainerProps<T = ViewStyle> {
  children?: ReactNode;
  style?: StyleProp<T>;
  className?: string;
}

export interface IbaseResponse<T = undefined> {
  // sucess: boolean;
  // message: string;
  data: T;
}
export interface IbasePaginatedResponse<T = undefined> {
  sucess: boolean;
  message: string;
  data: T[];
}

export interface ItempUserTry {
  me: User;
}
