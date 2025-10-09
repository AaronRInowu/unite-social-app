import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      {/* <Stack.Screen
        name="signin"
        options={{
          headerTitle: "",
          headerTransparent: true,
          headerTintColor: "#fff",
          headerBackTitle: "Go back",
        }}
      /> */}
      <Stack.Screen
        name="signup"
        options={{
          headerTitle: "",
          headerTransparent: true,
          headerTintColor: "#fff",
          headerBackTitle: "Go back",
        }}
      />
      <Stack.Screen
        name="onboarding"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="mainsplash"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
