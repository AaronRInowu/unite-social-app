import { Text, View } from "react-native";

export default function StoryComponent() {
  return (
    <View style={{ flexGrow: 1 }} className="flex flex-col gap-[20px]">
      <Text className="text-main font-bold text-[32px] ">
        Let’s start your first story!
      </Text>
      <Text className="font-bold text-[16px] text-main">
        We built your story based on what you{"\n"}
        shared, but you can change it to make it fit{"\n"}
        you better.
      </Text>

      <Text className="text-[#FFF6A3] font-bold text-[16px] py-5">
        Tap each{" "}
        <View className="bg-white p-2 rounded-[8px]">
          <Text className="text-[16px] font-bold">white box</Text>
        </View>{" "}
        to edit your story
      </Text>
    </View>
  );
}
