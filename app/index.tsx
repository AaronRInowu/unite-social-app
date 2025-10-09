import PageLayout from "@/components/layout/appBg";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import { Text, View } from "react-native";
import {
  bgGradient2,
  btnGradient1,
  btnGradient2,
} from "../globals/styles/colors";
import globalStyles from "../globals/styles/globalStyles";

export default function Index() {
  return (
    <PageLayout
      style={{
        backgroundColor: "#f00",
        justifyContent: "space-between",
        paddingVertical: "25%",
      }}
    >
      <View>
        <Text
          style={{
            ...globalStyles.mainTextColor,
            ...globalStyles.textXl,
            textAlign: "center",
          }}
        >
          unite
        </Text>
        <Text
          style={{
            ...globalStyles.mainTextColor,
            textAlign: "center",
          }}
        >
          Where Human connections Meet Shared Experiences
        </Text>
      </View>
      <View style={{ gap: 12, paddingInline: 24 }}>
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={[btnGradient1, btnGradient2]}
          style={{
            ...globalStyles.regularBtnStyle,
          }}
        >
          <Link
            href={"/mainsplash"}
            style={{
              ...globalStyles.mainTextColor,
              ...globalStyles.textXs,
              textAlign: "center",
            }}
          >
            Join for free
          </Link>
        </LinearGradient>
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={[btnGradient1, btnGradient2]}
          style={{ padding: 1, borderRadius: 12 }}
        >
          <Link
            href={"/signup"}
            style={{
              backgroundColor: bgGradient2,
              ...globalStyles.regularBtnStyle,
              ...globalStyles.mainTextColor,
              ...globalStyles.textXs,
              textAlign: "center",
            }}
          >
            Sign in
          </Link>
        </LinearGradient>
      </View>
    </PageLayout>
  );
}
