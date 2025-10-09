import { Text, View } from "react-native";

export default function InsertPhone() {
 
  return (
    <>
      <View style={{ gap: 12 }}>
        <Text className="text-main text-xl-custom">
          What&#39;s your phone number?
        </Text>
        <Text className="text-main">
         We&#39;ll use your phone number to verify your account.
        </Text>
      </View>
    </>
  );
}
