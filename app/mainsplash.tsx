import PageLayout from "@/components/layout/appBg";
import { NavigationBar } from "@/components/layout/NavigationBar";
import { Text, View } from "react-native";

export default function MainScreenPage() {
  return (
    <PageLayout>
      <View>
        <Text>Test para navigation bar</Text>
      </View>
      <NavigationBar />
    </PageLayout>
  );
}
