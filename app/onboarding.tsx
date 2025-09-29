import InsertBirth from "@/components/Containers/OnboardingQuestions/OnbDate";
import InsertGender from "@/components/Containers/OnboardingQuestions/OnbGender";
import ChooseMany from "@/components/Containers/OnboardingQuestions/OnbMultipleSelection";
import InsertName from "@/components/Containers/OnboardingQuestions/OnbName";
import InsertGallery from "@/components/Containers/OnboardingQuestions/OnbPhotos";
import InsertSex from "@/components/Containers/OnboardingQuestions/OnbSex";
import ShareComponent from "@/components/Containers/ShareComponent/ShareComponent";
import GradientButton from "@/components/inputs/GradientButton";
import PageLayout from "@/components/layout/appBg";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { btnGradient1, btnGradient2 } from "../globals/styles/colors";
import globalStyles from "../globals/styles/globalStyles";

export default function OnboardingPage() {
  const router = useRouter();
  const [onboardingStep, setOnboardingStep] = useState(1);
  const totalSteps = 10;

  const handleSteps = async (type: "rest" | "add") => {
    try {
      // const res = await axiosInstance.patch("/ ")
      if (type === "add") {
        if (onboardingStep === totalSteps) {
          router.push("/signup");
          return;
        }
      } else {
        if (type === "rest" && onboardingStep === 1) {
          router.back();
          return;
        }
      }
      setOnboardingStep((prev) => {
        const newStep = prev + (type === "add" ? 1 : -1);
        return newStep;
      });
    } catch (error) {}
  };

  const vibes = [
    "Adventurous",
    "Authentic",
    "Bold",
    "Chill",
    "Creative",
    "Curious",
    "Electric",
    "Empathetic",
    "Expressive",
    "Flirty",
    "Free-Spirited",
    "Glow‑Up",
    "Grounded",
    "Guarded",
    "Healing",
    "Inclusive",
    "Independent",
    "Lonely",
    "Loyal",
    "Magnetic",
    "Main‑Character",
    "Open-Minded",
    "Passionate",
    "Playful",
    "Proud",
    "Rebellious",
    "Reflective",
    "Slay",
    "Sober",
    "Soft",
    "Soulful",
    "Spicy",
    "Vibrant",
    "Witty",
  ];

  const returnStep = () => {
    switch (onboardingStep) {
      case 1:
        return <InsertName />;
      case 2:
        return <InsertBirth />;
      case 3:
        return <InsertGender />;
      case 4:
        return <InsertSex />;
      case 5:
        return (
          <ChooseMany
            options={vibes}
            headers={{
              counter: "Select 3 vibes",
              subtitle: "Your vibe attracts your tribe. What's yours today?",
              title: "What's your vibe?",
            }}
          />
        );
      case 6:
        return (
          <ChooseMany
            options={vibes}
            headers={{
              counter: "Select 3 core values",
              subtitle:
                "Your values guide your connections. Pick the ones that feel most like you.",
              title: "What matters the most to you?",
            }}
          />
        );
      case 7:
        return (
          <ChooseMany
            options={vibes}
            headers={{
              counter: "Select 2 types of connections",
              subtitle:
                "What kind of connections are you looking for on the unite platform?",
              title: "Who are you secretly hoping to meet?",
            }}
          />
        );
      case 8:
        return (
          <ChooseMany
            options={vibes}
            headers={{
              counter: "Select 3 types of events ",
              subtitle:
                "Your scene. Your people. Find where the sparks happen.",
              title: "What type of events do you like?",
            }}
          />
        );
      // case 9:
      //   return (
      //     <View>
      //       <Text style={globalStyles.mainTextColor}>Aqui va la historia?</Text>
      //     </View>
      //   );
      case 9:
        return <InsertGallery />;
      case 10:
        return <ShareComponent />;
      default:
        return <></>;
    }
  };

  return (
    <PageLayout>
      <View
        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <TouchableOpacity activeOpacity={1} onPress={() => handleSteps("rest")}>
          <Text
            style={{ ...globalStyles.mainTextColor, ...globalStyles.textXl }}
          >
            {"<"}
          </Text>
        </TouchableOpacity>
        <View
          style={{
            borderRadius: 12,
            width: "70%",
            backgroundColor: "#ffffff10",
            height: 6,
            marginInline: "auto",
          }}
        >
          <LinearGradient
            colors={[btnGradient1, btnGradient2]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{
              width: `${(onboardingStep / totalSteps) * 100}%`,
              height: "100%",
              ...(onboardingStep === totalSteps
                ? { borderRadius: 12 }
                : { borderTopLeftRadius: 12, borderBottomLeftRadius: 12 }),
            }}
          />
        </View>
      </View>
      {returnStep()}
      <TouchableOpacity
        activeOpacity={1}
        style={{ marginTop: "auto" }}
        onPress={() => handleSteps("add")}
      >
        <GradientButton>
          <Text style={{ ...globalStyles.mainTextColor, textAlign: "center" }}>
            Continue
          </Text>
        </GradientButton>
      </TouchableOpacity>
    </PageLayout>
  );
}
