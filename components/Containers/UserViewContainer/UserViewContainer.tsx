import { User } from "@/global/interfaces/users.interface";
import { ReactNode } from "react";
import { Text, View } from "react-native";

export const UserViewContainer = ({
  user,
  classnames = {},
  children,
}: {
  user?: Partial<User>;
  children?: ReactNode;
  classnames?: {
    container?: string;
    image?: string;
    title?: string;
    subtitle?: string;
  };
}) => {
  const { container, image, subtitle, title } = classnames;
  return (
    <View
      className={`bg-blue-gray rounded-xl p-3 flex-row items-center gap-3 ${container}`}
    >
      <View
        className={`w-[60px] aspect-square bg-neutral-600 rounded-full ${image}`}
      >
        {/* imagen */}
      </View>
      <View className="flex-1">
        <Text
          numberOfLines={1}
          className={`text-white text-xl ${title} flex-1`}
        >
          {user?.firstName || user?.lastName
            ? `${user?.firstName ?? ""} ${user?.lastName}`
            : "User name"}
        </Text>
        <Text className={`text-pale-yellow ${subtitle}`}>Location</Text>
      </View>
      {children}
    </View>
  );
};
