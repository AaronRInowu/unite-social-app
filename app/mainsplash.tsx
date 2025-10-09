import PageLayout from "@/components/layout/appBg";
import { NavigationBar } from "@/components/layout/NavigationBar";
import globalStyles from "@/globals/styles/globalStyles";
import { Text, View } from "react-native";

export default function MainScreenPage() {
  return (
    <PageLayout>
      <View>
        <Text style={{ ...globalStyles.mainTextColor, ...globalStyles.textXl }}>
          Test para navigation bar
        </Text>
      </View>
      <NavigationBar />
    </PageLayout>
  );
}
