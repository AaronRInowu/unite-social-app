import PageLayout from "@/components/layout/appBg";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import { Text, View } from "react-native";
import { colors, gradientColors } from "../global/styles/tailwindClasses";

export default function Index() {
  return (
    <PageLayout
      style={{
        backgroundColor: "#f00",
        justifyContent: "space-between",
        paddingVertical: "25%",
      }}
    >
      <View className="gap-4">
        <Text className="text-main text-unite-title text-center font-satoshi-bold">
          unitē
        </Text>
        <Text className="text-main text-xs-custom text-center font-satoshi-bold">
          Where Human connections Meet{"\n"}Shared Experiences
        </Text>
      </View>
      <View style={{ gap: 12, paddingInline: 10 }}>
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={gradientColors.button}
          style={{
            borderRadius: 12,
            padding: 15,
            width: "100%",
          }}
        >
          <Link
            href={"/onboarding"}
            className="text-main text-xs-custom text-center font-satoshi-medium"
          >
            Join for free
          </Link>
        </LinearGradient>
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={gradientColors.button}
          style={{ padding: 1, borderRadius: 12 }}
        >
          <Link
            href={"/signup"}
            style={{
              backgroundColor: colors.gradientEnd,
              borderRadius: 12,
              padding: 15,
              width: "100%",
              textAlign: "center",
            }}
            className="text-main text-xs-custom font-satoshi-medium"
          >
            Sign in
          </Link>
        </LinearGradient>
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={gradientColors.button}
          style={{ padding: 1, borderRadius: 12 }}
        >
          <Link
            href={"/(tabs)/(home)"}
            style={{
              backgroundColor: colors.gradientEnd,
              borderRadius: 12,
              padding: 15,
              width: "100%",
              textAlign: "center",
            }}
            className="text-main text-xs-custom font-satoshi-medium"
          >
            home
          </Link>
        </LinearGradient>
      </View>
    </PageLayout>
  );
}
