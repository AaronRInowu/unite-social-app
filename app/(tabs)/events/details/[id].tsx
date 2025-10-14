import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function EventScreen() {
  const { id } = useLocalSearchParams();

  return (
    <View>
      <Text>Event details </Text>
    </View>
  );
}
