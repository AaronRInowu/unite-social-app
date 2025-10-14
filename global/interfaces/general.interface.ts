import { ReactNode } from "react";
import { StyleProp, ViewStyle } from "react-native";

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

export interface tempuser {
  id: number;
  firstName: string;
  images: [];
  countryCode: string;
  lastName: string;
  birthDate: string;
  userPreferences: number;
  tiles: [];
  skipOnboarding: boolean;
  lastOnboardingStep: number;
  isOnboardingCompleted: boolean;
  emailVerified: boolean;
  phone: string;
  phoneVerified: boolean;
  events: [];
  connections: {
    docs: tempconnection[];
    hasNextPage: boolean;
  };
  attendees: [];
  answers: {
    docs: { id: number }[];
    hasNextPage: boolean;
  };
  roles: string[];
  updatedAt: string;
  createdAt: string;
  email: string;
  sessions: [];
}

export interface tempconnection {
  id: number;
  updatedAt: string;
  createdAt: string;
  friend: number;
  user: number;
}
