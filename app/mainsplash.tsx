import { ConnectionScreen } from "@/components/Containers/ConnectionScreen/ConnectionScreen";
import { MyProfileScreen } from "@/components/Containers/MyProfile/MyProfile";
import { ShareApp } from "@/components/Containers/ShareApp/ShareApp";
import GradientButton from "@/components/Inputs/GradientButton";
import PageLayout from "@/components/layout/appBg";
import { NavigationBar } from "@/components/layout/NavigationBar";
import { gradientColors } from "@/global/styles/tailwindClasses";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function MainScreenPage() {
  const [openScreen, setOpenScreen] = useState("");
  const currentlyWorking = ["share", "navbar", "profile", "connections"];
  return (
    <PageLayout style={{ gap: 12, paddingBottom: 0 }}>
      <View className="flex-row items-center gap-3">
        {openScreen !== "" && (
          <TouchableOpacity
            onPress={() => setOpenScreen("")}
            className="w-[40px] rounded-xl overflow-hidden"
          >
            <GradientButton>
              <Text className="text-white">{"<"}</Text>
            </GradientButton>
          </TouchableOpacity>
        )}
        <Text className="text-4xl text-white">{openScreen}</Text>
      </View>
      {!currentlyWorking.includes(openScreen) ? (
        currentlyWorking.map((m) => {
          return (
            <TouchableOpacity onPress={() => setOpenScreen(m)} key={m}>
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
                <Text className="text-main text-xs-custom text-center font-satoshi-medium">
                  {m}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          );
        })
      ) : (
        <>
          {openScreen === "connections" && <ConnectionScreen />}
          {openScreen === "profile" && <MyProfileScreen />}
          {openScreen === "share" && <ShareApp />}
          {openScreen === "navbar" && (
            <>
              <ScrollView contentContainerClassName="gap-6 pb-[140px]">
                {Array.from({ length: 5 }).map((_, i) => {
                  return (
                    <View key={i} className="gap-6 py-6">
                      <View className="rounded-xl h-[240px] bg-neutral-800"></View>
                      <Text className="text-2xl text-white">
                        Lorem ipsum dolor sit amet.
                      </Text>
                      <View className="gap-1">
                        <Text className="text-white">
                          Lorem ipsum dolor sit amet.
                        </Text>
                        <Text className="text-white">
                          Lorem ipsum dolor sit amet.
                        </Text>
                      </View>
                    </View>
                  );
                })}
              </ScrollView>
              <NavigationBar />
            </>
          )}
        </>
      )}
    </PageLayout>
  );
}
