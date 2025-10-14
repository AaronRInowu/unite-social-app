import PageLayout from "@/components/layout/appBg";
import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function ConnectionPage() {
  return (
    <PageLayout>
      <View>
        <Text className="text-main text-lg-custom font-bold">Events</Text>
        <Link
          className="text-main"
          href={{
            pathname: "/(tabs)/events/event/[id]",
            params: { id: "1" },
          }}
        >
          Create event
        </Link>
      </View>
    </PageLayout>
  );
}
