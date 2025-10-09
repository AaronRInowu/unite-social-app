import { Text, TextInput, View } from "react-native";

export default function InsertName() {
  return (
    <>
      <Text className="text-lg-custom text-main py-6">
        First things first, what&apos;s your name?
      </Text>
      <View style={{ gap: 12 }}>
        <Text className="text-main">First name</Text>
        <TextInput className="border border-input-border bg-input-bg text-main py-input-y px-input-x rounded-custom" />
        <Text className="text-main">Last name</Text>
        <TextInput className="border border-input-border bg-input-bg text-main py-input-y px-input-x rounded-custom" />
      </View>
    </>
  );
}
