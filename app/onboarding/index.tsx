import InsertBirth from "@/components/Containers/OnboardingQuestions/OnbDate";
import InsertGender from "@/components/Containers/OnboardingQuestions/OnbGender";
import ChooseMany from "@/components/Containers/OnboardingQuestions/OnbMultipleSelection";
import InsertName from "@/components/Containers/OnboardingQuestions/OnbName";
import InsertGallery from "@/components/Containers/OnboardingQuestions/OnbPhotos";
import InsertSex from "@/components/Containers/OnboardingQuestions/OnbSex";
import ShareComponent from "@/components/Containers/ShareComponent/ShareComponent";
import GradientButton from "@/components/Inputs/GradientButton";
import PageLayout from "@/components/layout/appBg";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { ArrowLeft2 } from "iconsax-react-nativejs";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { gradientColors } from "../../global/styles/tailwindClasses";
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
      // return <StoryComponent />;
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
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          paddingBottom: 30,
        }}
      >
        <TouchableOpacity activeOpacity={1} onPress={() => handleSteps("rest")}>
          <Text className="text-main text-xl-custom">
            <ArrowLeft2 size="20" color="#ffffffff" />
          </Text>
        </TouchableOpacity>
        <View
          style={{
            borderRadius: 12,
            width: "50%",
            backgroundColor: "#ffffff10",
            height: 8,
            marginInline: "auto",
          }}
        >
          <LinearGradient
            colors={gradientColors.button}
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
        <GradientButton
          style={{
            borderRadius: 12,
            padding: 15,
            width: "100%",
          }}
        >
          <Text className="text-main text-xs-custom text-center font-satoshi-medium">
            Continue
          </Text>
        </GradientButton>
      </TouchableOpacity>
    </PageLayout>
  );
}
