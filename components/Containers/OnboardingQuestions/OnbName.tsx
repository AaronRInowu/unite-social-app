import globalStyles from "@/globals/styles/globalStyles";
import { Text, TextInput, View } from "react-native";

export default function InsertName() {
  return (
    <>
      <Text
        style={{
          ...globalStyles.textLg,
          ...globalStyles.mainTextColor,
          paddingVertical: 24,
        }}
      >
        First things first, what's your name?
      </Text>
      <View style={{ gap: 12 }}>
        <Text style={{ ...globalStyles.mainTextColor }}>First name</Text>
        <TextInput style={globalStyles.defaultTextInput} />
        <Text style={{ ...globalStyles.mainTextColor }}>Last name</Text>
        <TextInput style={globalStyles.defaultTextInput} />
      </View>
    </>
  );
}
