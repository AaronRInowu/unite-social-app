import { ShareApp } from "@/components/Containers/ShareApp/ShareApp";
import GradientButton from "@/components/Inputs/GradientButton";
import PageLayout from "@/components/layout/appBg";
import { NavigationBar } from "@/components/layout/NavigationBar";
import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function MainScreenPage() {
  const [share, setShare] = useState(false);
  return (
    <PageLayout style={{ gap: 12, paddingBottom: 0 }}>
      <View>
        <Text className="text-4xl text-white">Title</Text>
        <TouchableOpacity activeOpacity={1} onPress={() => setShare(!share)}>
          <GradientButton>
            <Text>Cambiar vists</Text>
          </GradientButton>
        </TouchableOpacity>
      </View>
      {share ? (
        <ShareApp />
      ) : (
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
      )}
      <NavigationBar />
    </PageLayout>
  );
}
