import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="(home)" options={{ title: "Connect" }} />
      <Tabs.Screen name="events" />
    </Tabs>
  );
}
