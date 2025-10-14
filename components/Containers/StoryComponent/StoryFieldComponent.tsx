import { Text, View } from "react-native";

type options = {
  value: string | string[];
  deg: number;
};

export default function StoryFieldComponent({ value, deg }: options) {
  return (
    <View className={`bg-white p-2 rounded-[8px] rotate-[${deg}deg]`}>
      <Text className="text-[16px] font-satoshi-bold">{value}</Text>
    </View>
  );
}
